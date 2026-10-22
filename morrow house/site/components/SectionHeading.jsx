import { Eyebrow } from './Eyebrow';

// Eyebrow over a headline; each array item is set on its own line.
export function SectionHeading({ eyebrow, title, aside, tone, id, as: Tag = 'h2', className }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={['shead', className].filter(Boolean).join(' ')}>
      <div className="shead__main">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Tag className="h2" id={id}>
          {lines.map((l) => <span key={l} className="line">{l}</span>)}
        </Tag>
      </div>
      {aside && <div className="shead__aside">{aside}</div>}
    </div>
  );
}
