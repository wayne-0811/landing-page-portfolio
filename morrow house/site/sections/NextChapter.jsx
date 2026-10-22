'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { nextChapter as c, contact } from '../content/homepage';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const { steps, labels } = c;
const REVIEW = steps.length;

const fieldsOf = (step) => step.questions.flatMap((q) => q.fields);

// Only the contact step has rules: a name, a valid email, and a phone number
// long enough to dial if one is given.
function validate(stepIndex, a) {
  const errors = {};
  if (stepIndex !== 0) return errors;
  if (!(a.fullname || '').trim()) errors.fullname = c.errors.fullname;
  if (!EMAIL.test((a.email || '').trim())) errors.email = c.errors.email;
  const phone = (a.phone || '').trim();
  if (phone && phone.replace(/\D/g, '').length < 7) errors.phone = c.errors.phone;
  return errors;
}

// Option buttons are real radios and checkboxes, drawn as chips.
function Options({ field, value, onChange }) {
  const multiple = field.type === 'check';
  const chosen = multiple ? value || [] : value;
  const toggle = (o) => onChange(multiple ? (chosen.includes(o) ? chosen.filter((x) => x !== o) : [...chosen, o]) : o);
  const list = (
    <div className="opts">
      {field.options.map((o, i) => (
        <label key={o} className="opt">
          <input
            className="sr-only"
            type={multiple ? 'checkbox' : 'radio'}
            name={`intake-${field.name}`}
            id={`intake-${field.name}-${i}`}
            value={o}
            checked={multiple ? chosen.includes(o) : chosen === o}
            onChange={() => toggle(o)}
          />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
  if (!field.label) return list;
  return (
    <fieldset className="intake__sub">
      <legend className="micro intake__sublabel">{field.label}</legend>
      {list}
    </fieldset>
  );
}

function Input({ field, value, error, onChange }) {
  const id = `intake-${field.name}`;
  const common = {
    id,
    className: 'field__input',
    value: value || '',
    onChange: (e) => onChange(e.target.value),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    'aria-required': field.required || undefined,
  };
  return (
    <div className={['field', error && 'has-error'].filter(Boolean).join(' ')}>
      <label className="field__label micro" htmlFor={id}>
        {field.label}
        {field.required && <span className="field__req">{labels.required}</span>}
      </label>
      {field.type === 'area' ? (
        <textarea {...common} rows={3} placeholder={field.placeholder} />
      ) : field.type === 'select' ? (
        <select {...common}>
          <option value="">{labels.select}</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input {...common} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} />
      )}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

function Field(props) {
  return props.field.type === 'radio' || props.field.type === 'check' ? <Options {...props} /> : <Input {...props} />;
}

// One line per field on the review screen.
function reviewRows(step, answers) {
  return step.questions.flatMap((q) => q.fields.map((f) => {
    const v = answers[f.name];
    const text = Array.isArray(v) ? v.join(', ') : (v || '').trim();
    return { key: f.name, label: f.sum || f.label || q.title, text };
  }));
}

// The Client Intake Brief as a four-step wizard: about you, the project, the
// home, working together. Then a review of every answer, and the "what
// happens next" tracker. Concept page, so nothing is sent.
export function NextChapter() {
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const headRef = useRef(null);
  const doneRef = useRef(null);
  const moved = useRef(false);

  // After moving between steps, put focus (and the view) on the new heading.
  useEffect(() => {
    if (moved.current) headRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus();
  }, [status]);

  const go = (to) => {
    moved.current = true;
    setStep(to);
    setSeen((s) => Math.max(s, to));
  };

  const set = (name) => (value) => {
    setAnswers((a) => ({ ...a, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const next = (e) => {
    e.preventDefault();
    const found = validate(step, answers);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`intake-${first}`)?.focus();
      return;
    }
    go(step + 1);
  };

  const send = () => {
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  const firstName = (answers.fullname || '').trim().split(/\s+/)[0];
  const current = steps[step];

  return (
    <section className="section section--sand chapter" id="next-chapter" aria-labelledby="chapter-title">
      <div className="wrap chapter__grid">
        <div className="chapter__intro">
          <SectionHeading id="chapter-title" eyebrow={c.eyebrow} title={c.title} />
          <p className="body">{c.body}</p>
        </div>

        <div className="chapter__panel">
          {status === 'sent' ? (
            <div className="received" aria-live="polite">
              <Eyebrow>{c.received.eyebrow}</Eyebrow>
              <h3 className="received__title" tabIndex={-1} ref={doneRef}>{c.received.title(firstName)}</h3>
              <ol className="tracker">
                {c.received.steps.map((s) => (
                  <li key={s.title} className={`tracker__step tracker__step--${s.state}`}>
                    <span className="tracker__dot" aria-hidden="true">
                      {s.state === 'done' && <Icon name="check" size={12} strokeWidth={2} />}
                    </span>
                    <div>
                      <p className="tracker__title">
                        {s.title}
                        <span className="sr-only">{s.state === 'done' ? ' (done)' : s.state === 'active' ? ' (in progress)' : ' (coming up)'}</span>
                      </p>
                      <p className="micro tracker__when">{s.when}</p>
                      <p className="body-s">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="body-s received__contact">
                {c.received.contact}{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> · <a href="tel:+18285550146">{contact.phone}</a>
              </p>
              <p className="micro received__note">{c.received.note}</p>
            </div>
          ) : (
            <div className="intake">
              <ol className="intake__parts" aria-label="Steps">
                {steps.map((s, i) => {
                  const state = step === REVIEW || i < step ? 'done' : i === step ? 'current' : 'todo';
                  return (
                    <li key={s.title}>
                      <button
                        type="button"
                        className={`intake__part is-${state}`}
                        onClick={() => go(i)}
                        disabled={i > seen}
                        aria-current={i === step ? 'step' : undefined}
                      >
                        <span className="intake__bar" aria-hidden="true" />
                        <span className="intake__part-name">{s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {step === REVIEW ? (
                <div className="intake__review">
                  <header className="intake__head">
                    <p className="micro intake__step">{labels.reviewEyebrow}</p>
                    <h3 className="intake__title" tabIndex={-1} ref={headRef}>{labels.reviewTitle}</h3>
                    <p className="body-s intake__intro">{labels.reviewIntro}</p>
                  </header>
                  {steps.map((s, i) => (
                    <section key={s.title} className="intake__summary" aria-labelledby={`intake-sum-${i}`}>
                      <div className="intake__summary-head">
                        <h4 className="micro" id={`intake-sum-${i}`}>{s.title}</h4>
                        <button type="button" className="intake__edit" onClick={() => go(i)}>
                          {labels.edit}<span className="sr-only"> {s.title}</span>
                        </button>
                      </div>
                      <dl>
                        {reviewRows(s, answers).map((r) => (
                          <div key={r.key}>
                            <dt>{r.label}</dt>
                            <dd className={r.text ? undefined : 'is-empty'}>{r.text || labels.empty}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                  <div className="intake__actions">
                    <Button variant="ghost" arrow={false} onClick={() => go(REVIEW - 1)}>{labels.back}</Button>
                    <Button onClick={send} disabled={status === 'sending'} arrow={status === 'sending' ? false : undefined}>
                      {status === 'sending' ? c.sending : c.submit}
                    </Button>
                    <p className="body-s intake__note">{c.reassurance}</p>
                  </div>
                </div>
              ) : (
                <form className="intake__step-form" onSubmit={next} noValidate>
                  <header className="intake__head">
                    <p className="micro intake__step">{labels.step(step + 1, steps.length)}</p>
                    <h3 className="intake__title" tabIndex={-1} ref={headRef}>{current.title}</h3>
                    <p className="body-s intake__intro">{current.intro}</p>
                  </header>
                  {current.questions.map((q, qi) => {
                    const body = (
                      <>
                        {q.help && <p className="body-s intake__help">{q.help}</p>}
                        {q.fields.map((f) => (
                          <Field key={f.name} field={f} value={answers[f.name]} error={errors[f.name]} onChange={set(f.name)} />
                        ))}
                      </>
                    );
                    return q.title ? (
                      <div key={q.title} className="intake__q" role="group" aria-labelledby={`intake-q-${step}-${qi}`}>
                        <h4 className="intake__qtitle" id={`intake-q-${step}-${qi}`}>{q.title}</h4>
                        {body}
                      </div>
                    ) : (
                      <div key={qi} className="intake__q">{body}</div>
                    );
                  })}
                  <div className="intake__actions">
                    {step > 0 && <Button variant="ghost" arrow={false} onClick={() => go(step - 1)}>{labels.back}</Button>}
                    <Button type="submit" arrow="→">{step === REVIEW - 1 ? labels.review : labels.next}</Button>
                    {current.note && <p className="body-s intake__note">{current.note}</p>}
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
