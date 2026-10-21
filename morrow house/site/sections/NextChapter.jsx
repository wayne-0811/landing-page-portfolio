'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { nextChapter as c, contact } from '../content/homepage';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = c.errors.name;
  if (!EMAIL.test(v.email.trim())) errors.email = c.errors.email;
  if (v.phone.trim() && v.phone.replace(/\D/g, '').length < 7) errors.phone = c.errors.phone;
  return errors;
}

function Field({ id, type = 'text', field, value, error, onChange, autoComplete, inputRef }) {
  return (
    <div className={['field', error && 'has-error'].filter(Boolean).join(' ')}>
      <label className="field__label micro" htmlFor={id}>{field.label}</label>
      <input
        ref={inputRef}
        id={id}
        className="field__input"
        type={type}
        value={value}
        placeholder={field.placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

// Stand-in for the feasibility flow (a later round): the first question as
// chips, then a short contact form and the "what happens next" tracker.
// Concept page, so nothing is sent.
export function NextChapter() {
  const [role, setRole] = useState(null);
  const [values, setValues] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const nameRef = useRef(null);
  const doneRef = useRef(null);

  useEffect(() => {
    if (role && status === 'idle') nameRef.current?.focus();
  }, [role, status]);

  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus();
  }, [status]);

  const set = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`enq-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  const firstName = values.name.trim().split(/\s+/)[0];

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
            <>
              <fieldset className="chips">
                <legend className="chips__q">{c.question}</legend>
                <div className="chips__list">
                  {c.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      className="chip"
                      aria-pressed={role === o}
                      onClick={() => setRole(o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </fieldset>

              {role && (
                <form className="enquiry" onSubmit={submit} noValidate>
                  <h3 className="enquiry__title">{c.formTitle}</h3>
                  <Field id="enq-name" field={c.fields.name} value={values.name} error={errors.name} onChange={set('name')} autoComplete="name" inputRef={nameRef} />
                  <Field id="enq-email" type="email" field={c.fields.email} value={values.email} error={errors.email} onChange={set('email')} autoComplete="email" />
                  <Field id="enq-phone" type="tel" field={c.fields.phone} value={values.phone} error={errors.phone} onChange={set('phone')} autoComplete="tel" />
                  <div className="enquiry__foot">
                    <Button type="submit" disabled={status === 'sending'} arrow={status === 'sending' ? false : undefined}>
                      {status === 'sending' ? c.sending : c.submit}
                    </Button>
                    <p className="body-s">{c.reassurance}</p>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
