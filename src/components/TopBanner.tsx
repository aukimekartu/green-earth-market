import { Truck, Package, Gift } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="bg-primary text-primary-foreground text-xs md:text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-between gap-4 md:gap-6 py-2 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 shrink-0" />
            Pristatymo laikas 1–2 darbo dienos
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 shrink-0" />
            Siuntimo išlaidos – tik 3,70 €
          </span>
          <span className="hidden md:flex items-center gap-1.5 font-semibold">
            <Gift className="w-3.5 h-3.5 shrink-0" />
            Nuo 60 € nemokamas pristatymas į paštomatą
          </span>
        </div>
      </div>
    </div>
  );
}
