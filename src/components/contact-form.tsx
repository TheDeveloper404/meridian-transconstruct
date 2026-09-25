"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactForm } from "@/content/contact";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact/validation";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const FALLBACK_ERROR =
  "Cererea nu a putut fi trimisă. Verifică conexiunea și încearcă din nou sau sună-ne direct.";

const FIELD_ORDER: ContactField[] = ["name", "email", "phone", "message"];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  function focusFirstError(fieldErrors: FieldErrors) {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    // Feedback imediat; validarea care contează rulează pe server.
    const local = validateContact(payload);
    if (!local.ok) {
      setErrors(local.errors);
      setStatus({ kind: "idle" });
      focusFirstError(local.errors);
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setStatus({ kind: "success" });
        return;
      }

      const body = (await response.json().catch(() => null)) as {
        error?: { message?: string; details?: { fields?: FieldErrors } };
      } | null;
      const fieldErrors = body?.error?.details?.fields;
      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        focusFirstError(fieldErrors);
      }
      // Datele rămân în formular; mesajul serverului include alternativa telefonică.
      setStatus({ kind: "error", message: body?.error?.message ?? FALLBACK_ERROR });
    } catch {
      setStatus({ kind: "error", message: FALLBACK_ERROR });
    }
  }

  const submitting = status.kind === "submitting";
  const describedBy = (field: ContactField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className="w-full max-w-140 bg-surface p-6 md:p-8">
      <h2 className="mb-4 text-[28px]">{contactForm.title}</h2>
      <p id="form-privacy" className="note mb-6">
        {contactForm.privacy}
      </p>

      <noscript>
        <p className="mb-6 font-bold text-error">
          Formularul are nevoie de JavaScript. Ne poți contacta direct prin telefon sau e-mail.
        </p>
      </noscript>

      <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-privacy">
        <Field
          field="name"
          label={contactForm.labels.name}
          error={errors.name}
          input={
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={CONTACT_LIMITS.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              className="field"
            />
          }
        />
        <Field
          field="email"
          label={contactForm.labels.email}
          error={errors.email}
          input={
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={CONTACT_LIMITS.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className="field"
            />
          }
        />
        <Field
          field="phone"
          label={contactForm.labels.phone}
          optional={contactForm.optional}
          error={errors.phone}
          input={
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={CONTACT_LIMITS.phone}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone")}
              className="field"
            />
          }
        />
        <Field
          field="message"
          label={contactForm.labels.message}
          hint={contactForm.messageHint}
          error={errors.message}
          input={
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={CONTACT_LIMITS.message}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message", "message-hint")}
              className="field resize-y"
            />
          }
        />

        {/* Honeypot: ascuns vizual și pentru tehnologii asistive; un om nu îl completează. */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={HONEYPOT_FIELD}>Nu completa acest câmp</label>
          <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className="button" disabled={submitting} aria-busy={submitting}>
          {submitting ? contactForm.submitting : contactForm.submit}
        </button>

        <div aria-live="polite" role="status" className="mt-6 empty:hidden">
          {status.kind === "success" && (
            <p className="border-l-3 border-success pl-4 font-bold text-success">{contactForm.success}</p>
          )}
        </div>
        <div aria-live="assertive" role="alert" className="mt-6 empty:hidden">
          {status.kind === "error" && (
            <p className="border-l-3 border-error pl-4 font-bold text-error">{status.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  field: ContactField;
  label: string;
  optional?: string;
  hint?: string;
  error?: string;
  input: ReactNode;
};

function Field({ field, label, optional, hint, error, input }: FieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={field} className="mb-2 block font-bold">
        {label} {optional && <span className="font-normal">{optional}</span>}
      </label>
      {hint && (
        <p id={`${field}-hint`} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {input}
      {error && (
        <p id={`${field}-error`} className="mt-2 text-sm font-bold text-error">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  );
}
