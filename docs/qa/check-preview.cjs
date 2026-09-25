const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL, fileURLToPath } = require('node:url');

const root = path.resolve(__dirname, '..');
const pages = [
  ['home-preview.html', 'Acasă'], ['contact.html', 'Contact'],
];
function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
async function main() {
  const output = path.join(root, 'previews');
  fs.mkdirSync(output, { recursive: true });
  const errors = [], external = [];
  for (const removed of ['servicii.html', 'proiecte.html', 'despre.html']) assert.equal(fs.existsSync(path.join(root, removed)), false);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (/^https?:/.test(request.url())) external.push(request.url()); });
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const [filename, name] of pages) {
        await page.goto(pathToFileURL(path.join(root, filename)).href);
        assert.equal(await page.locator('html').getAttribute('lang'), 'ro');
        assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1, filename);
        assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow ${filename} ${width}px`);
        assert.equal(await page.locator('header a[href^="tel:"]').count(), 0, 'No phone in header');
        const nav = page.locator(width < 1024 ? '.mobile-nav nav' : '.desktop-nav');
        assert.equal(await nav.locator('[aria-current="page"]').textContent(), name);
        const localUrls = await page.locator('a[href],img[src],link[rel="stylesheet"]').evaluateAll(elements => elements
          .map(element => element.href || element.src).filter(url => url.startsWith('file:')));
        for (const url of localUrls) {
          const target = new URL(url);
          const targetPath = fileURLToPath(target);
          assert.ok(fs.existsSync(targetPath), `Missing file ${url}`);
          if (target.hash) assert.ok(fs.readFileSync(targetPath, 'utf8').includes(`id="${target.hash.slice(1)}"`), `Missing anchor ${url}`);
        }
        assert.equal(await page.locator('.mobile-call').isVisible(), width < 768);
        assert.equal(await page.locator('.mobile-call').getAttribute('href'), 'tel:+40723400646');
        if (filename === 'home-preview.html') {
          assert.equal(await page.locator('.service').nth(2).getByRole('heading').innerText(), 'Construcții civile');
          assert.equal(await page.locator('main a[href^="tel:"]').count(), 0, 'Home contact block replaced with CTA');
          assert.equal(await page.locator('.hero-bg').evaluate(image => image.complete && image.naturalWidth > 0), true);
          assert.ok((await page.locator('.image-credit').innerText()).includes('nu reprezintă o lucrare'));
          await page.locator('.hero').getByRole('link', { name: 'Cere o ofertă', exact: false }).click();
          assert.equal(path.basename(fileURLToPath(page.url())), 'contact.html');
          await page.goto(pathToFileURL(path.join(root, filename)).href);
          if ([375, 1440].includes(width)) {
            const screen = width === 375 ? 'mobile' : 'desktop';
            await page.screenshot({ path: path.join(output, `home-${screen}.png`), fullPage: true });
            await page.screenshot({ path: path.join(output, `hero-${screen}.png`) });
          }
        }
        if (filename === 'contact.html') {
          assert.equal(await page.locator('.contact-links a[href="mailto:marta70fil@yahoo.com"]').count(), 1);
          assert.equal(await page.locator('.contact-links a[href^="tel:"]').count(), 2);
          assert.ok(await page.getByRole('button', { name: 'Trimite cererea' }).isDisabled());
          assert.ok(await page.getByLabel('E-mail', { exact: true }).isDisabled());
          if (width === 375) await page.screenshot({ path: path.join(output, 'contact-mobile.png'), fullPage: true });
        }
      }
      // Contact -> Home sections -> Contact, including closing the mobile menu.
      const destinations = [
        ['Acasă', 'home-preview.html', ''], ['Servicii', 'home-preview.html', '#servicii'],
        ['Proiecte', 'home-preview.html', '#proiecte'], ['Despre', 'home-preview.html', '#despre'],
        ['Contact', 'contact.html', ''],
      ];
      for (const [name, filename, hash] of destinations) {
        if (width < 1024) {
          await page.locator('.mobile-nav summary').focus();
          await page.keyboard.press('Enter');
          assert.ok(await page.locator('.mobile-nav').evaluate(element => element.open));
        }
        const nav = page.getByRole('navigation', { name: width < 1024 ? 'Navigare mobilă' : 'Navigare principală' });
        await nav.getByRole('link', { name, exact: true }).click();
        assert.equal(path.basename(fileURLToPath(page.url())), filename);
        assert.equal(new URL(page.url()).hash, hash);
        const stateNav = page.locator(width < 1024 ? '.mobile-nav nav' : '.desktop-nav');
        await page.waitForFunction(expected => document.querySelector('.desktop-nav [aria-current]')?.textContent === expected, name);
        assert.equal(await stateNav.locator('[aria-current]').textContent(), name);
        if (width < 1024) assert.equal(await page.locator('.mobile-nav').evaluate(element => element.open), false);
      }
      await page.goto(pathToFileURL(path.join(root, 'home-preview.html')).href);
      assert.equal(await page.locator('.contact-teaser').evaluate(el => getComputedStyle(el).textAlign), 'center');
      assert.ok(await page.locator('.button').first().evaluate(el => parseFloat(getComputedStyle(el).borderRadius) >= 26));
      // Links in all four footer columns point to existing sections or Contact.
      assert.equal(await page.locator('.footer-grid > *').count(), 4);
      await page.locator('.footer-legal summary').click();
      assert.ok(await page.locator('.footer-legal').evaluate(el => el.open));
      if (width >= 1024) {
        const navLink = page.locator('.desktop-nav a').nth(1);
        assert.ok(await navLink.evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 18));
        await navLink.hover();
        await page.waitForFunction(() => getComputedStyle(document.querySelector('.desktop-nav a:nth-child(2)')).transform !== 'none');
        const cta = page.locator('.header-cta');
        await cta.hover();
        await page.waitForFunction(() => getComputedStyle(document.querySelector('.header-cta')).transform !== 'none');
        await page.keyboard.press('Tab');
        await cta.focus();
        assert.equal(await cta.evaluate(el => el.matches(':focus-visible')), true);
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(await page.locator('.button').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      if (width === 1440 || width === 375) {
        await page.goto(pathToFileURL(path.join(root, 'home-preview.html')).href);
        const screen = width === 1440 ? 'desktop' : 'mobile';
        for (const [selector, name] of [['#servicii','services'],['#despre','about'],['.contact-teaser','cta'],['.site-footer','footer']]) {
          await page.locator(selector).screenshot({path:path.join(output, `${name}-${screen}.png`)});
        }
      }
      console.log(`PASS ${width}px: 2 pages, section navigation, mobile dismissal, footer, CTA states, no overflow`);
    }
    const pairs = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return [['--ink', '--paper'], ['--ink', '--accent'], ['--muted', '--paper'], ['--inverse', '--ink']]
        .map(([fg, bg]) => [fg, styles.getPropertyValue(fg).trim(), styles.getPropertyValue(bg).trim()]);
    });
    for (const [label, fg, bg] of pairs) {
      const levels = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
      const ratio = (levels[0] + .05) / (levels[1] + .05);
      assert.ok(ratio >= 4.5, `Contrast ${label} ${ratio}`);
      console.log(`PASS text contrast ${label}: ${ratio.toFixed(2)}:1`);
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    console.log('PASS prototype: no runtime errors or external requests. No email or calls initiated.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
