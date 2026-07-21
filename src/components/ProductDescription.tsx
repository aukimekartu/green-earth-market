import { parseProductDescription } from '@/lib/productDescription';
import { cn } from '@/lib/utils';

interface Props {
  description: string;
  className?: string;
  compact?: boolean;
  /**
   * 'intro'   - only the marketing intro paragraph (fallback to full text if no sections detected)
   * 'details' - nutrition table + titled sections only (no intro)
   * 'full'    - everything (default)
   */
  mode?: 'intro' | 'details' | 'full';
}

export function ProductDescription({ description, className, compact = false, mode = 'full' }: Props) {
  const parsed = parseProductDescription(description);

  if (!parsed.intro && !parsed.nutrition && parsed.sections.length === 0) {
    if (mode === 'details') return null;
    return (
      <p className={cn('text-foreground font-sans whitespace-pre-line', className)}>
        {description}
      </p>
    );
  }

  const showIntro = mode === 'full' || mode === 'intro';
  const showDetails = mode === 'full' || mode === 'details';

  // If intro mode requested but no intro parsed, fall back to full description text.
  if (mode === 'intro' && !parsed.intro) {
    return (
      <p className={cn('text-foreground font-sans whitespace-pre-line', className)}>
        {description}
      </p>
    );
  }

  if (mode === 'details' && !parsed.nutrition && parsed.sections.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-5 font-sans text-foreground', className)}>
      {showIntro && parsed.intro && (
        <p className="whitespace-pre-line leading-relaxed">{parsed.intro}</p>
      )}

      {showDetails && parsed.nutrition && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-2.5 bg-secondary/60 border-b border-border">
            <h4 className="font-semibold text-sm text-foreground">
              Maistingumo deklaracija
              <span className="ml-2 text-muted-foreground font-normal">/ {parsed.nutrition.per}</span>
            </h4>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {parsed.nutrition.rows.map((row, i) => (
                <tr
                  key={`${row.label}-${i}`}
                  className={cn(
                    'border-b border-border last:border-0',
                    i % 2 === 1 ? 'bg-secondary/20' : ''
                  )}
                >
                  <td
                    className={cn(
                      'py-2 px-4 text-foreground',
                      row.indent && 'pl-8 text-muted-foreground'
                    )}
                  >
                    {row.label}
                  </td>
                  <td className="py-2 px-4 text-right font-medium text-foreground whitespace-nowrap">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDetails && parsed.sections.length > 0 && (
        <dl className={cn('space-y-3', compact && 'text-sm')}>
          {parsed.sections.map((s, i) => (
            <div key={`${s.title}-${i}`}>
              <dt className="font-semibold text-foreground">{s.title}</dt>
              <dd className="text-foreground/90 whitespace-pre-line leading-relaxed mt-0.5">
                {s.body}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
