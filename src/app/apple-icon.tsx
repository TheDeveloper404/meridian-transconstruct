import { ImageResponse } from "next/og";
import { Monogram } from "@/components/monogram";

// Iconița pentru ecranul principal iOS (180 px). Provizorie până la logo (B-018).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<Monogram size={size.width} />, size);
}
