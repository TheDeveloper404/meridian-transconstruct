// Ani întregi de activitate de la data înființării. Paginile sunt generate la build, deci valoarea
// se actualizează la fiecare build (ex. la actualizarea conținutului); în rest rămâne cea din build.
export function fullYearsSince(isoDate: string, now: Date = new Date()): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  let years = now.getFullYear() - year;
  const beforeAnniversary =
    now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day);
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}

/** „1 an”, „7 ani”, „20 de ani” — acordul numeralului în română (de la 20 în sus: „de”). */
export function formatYears(years: number): string {
  if (years === 1) return "1 an";
  const rest = years % 100;
  return rest === 0 || rest >= 20 ? `${years} de ani` : `${years} ani`;
}
