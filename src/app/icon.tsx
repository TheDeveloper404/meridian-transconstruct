import { ImageResponse } from "next/og";
import { Monogram } from "@/components/monogram";

// Iconiță PROVIZORIE (monogramă „M” în culorile site-ului) până la primirea logo-ului (B-004, B-018).
// Generată la build în trei dimensiuni: 32 px pentru tab-ul browserului, 192/512 px pentru manifest.

export const contentType = "image/png";

const sizes = [32, 192, 512] as const;

export function generateImageMetadata() {
  return sizes.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType,
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const size = Number(await id);
  return new ImageResponse(<Monogram size={size} />, { width: size, height: size });
}
