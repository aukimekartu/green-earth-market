import { useState, useMemo } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { lpExpressTerminals, type Terminal } from '@/data/lpExpressTerminals';
import { useLanguage } from '@/i18n/LanguageContext';

interface TerminalPickerProps {
  selectedTerminal: Terminal | null;
  onSelect: (terminal: Terminal) => void;
}

const TerminalPicker = ({ selectedTerminal, onSelect }: TerminalPickerProps) => {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return lpExpressTerminals;
    const q = search.toLowerCase();
    return lpExpressTerminals.filter(
      t => t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.address.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedByCity = useMemo(() => {
    const map = new Map<string, Terminal[]>();
    for (const t of filtered) {
      const arr = map.get(t.city) || [];
      arr.push(t);
      map.set(t.city, arr);
    }
    return map;
  }, [filtered]);

  const placeholder = lang === 'lt' ? 'Pasirinkite paštomatą...' : lang === 'en' ? 'Select parcel locker...' : 'Izvēlieties pakomātu...';
  const searchPlaceholder = lang === 'lt' ? 'Ieškoti pagal miestą ar adresą...' : lang === 'en' ? 'Search by city or address...' : 'Meklēt pēc pilsētas vai adreses...';

  return (
    <div className="relative mt-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-colors ${
          open ? 'border-primary bg-secondary/50' : selectedTerminal ? 'border-primary/50 bg-secondary/30' : 'border-border hover:border-primary/30'
        }`}
      >
        <MapPin className="w-5 h-5 text-primary shrink-0" />
        <span className={`flex-1 text-sm font-sans ${selectedTerminal ? 'text-foreground' : 'text-muted-foreground'}`}>
          {selectedTerminal ? selectedTerminal.address : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg max-h-72 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8 h-9 text-sm"
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground text-center font-sans">
                {lang === 'lt' ? 'Paštomatų nerasta' : lang === 'en' ? 'No terminals found' : 'Nav atrasts'}
              </p>
            ) : (
              Array.from(groupedByCity.entries()).map(([city, terminals]) => (
                <div key={city}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                    {city}
                  </div>
                  {terminals.map(terminal => (
                    <button
                      key={terminal.id}
                      type="button"
                      onClick={() => {
                        onSelect(terminal);
                        setOpen(false);
                        setSearch('');
                      }}
                      className={`w-full text-left px-3 py-2.5 text-sm font-sans hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 ${
                        selectedTerminal?.id === terminal.id ? 'bg-primary/10 text-primary font-medium' : ''
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                      {terminal.address}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalPicker;
