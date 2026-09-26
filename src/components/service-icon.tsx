import { Building, Construction, House, PaintRoller, Warehouse, type LucideProps } from "lucide-react";

// Iconița fiecărui serviciu (id-urile din src/content/services.ts); folosită în hero și pe /servicii.
const ICONS: Record<string, typeof Construction> = {
  "constructii-civile": Construction,
  cladiri: Building,
  renovari: PaintRoller,
  "constructii-case": House,
  "hale-industriale": Warehouse,
};

export function ServiceIcon({ id, ...props }: { id: string } & LucideProps) {
  const Icon = ICONS[id] ?? Construction;
  return <Icon aria-hidden="true" {...props} />;
}
