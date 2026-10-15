'use client'

import { useRef, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, UserRound, ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import { useLocaleStore } from '@/store/localeStore'
import { identity } from '@/core/registries/identity'
import { contactText, opportunities } from '@/core/registries/contact'
import { useContactDraftStore } from '@/store/contactDraftStore'
import styles from './ContactApp.module.css'

export function ContactApp() {
  const locale = useLocaleStore((s) => s.locale)
  const text = contactText[locale]
  const {
    kind,
    setKind,
    status: state,
    setStatus: setState,
    error,
    setError,
    values,
    setField,
    clear,
  } = useContactDraftStore()
  const formRef = useRef<HTMLFormElement>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (useContactDraftStore.getState().status === 'sending') return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setError('')
    setState('sending')
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, kind, locale }),
        signal: AbortSignal.timeout(30000),
      })
      if (!response.ok) {
        setError(
          response.status === 503
            ? 'unavailable'
            : response.status === 429
              ? 'limited'
              : response.status === 400
                ? 'invalid'
                : 'error'
        )
        setState('idle')
        return
      }
      form.reset()
      clear()
      setState('sent')
    } catch {
      setError('error')
      setState('idle')
    }
  }

  return (
    <div className={styles.contact}>
      <AnimatePresence mode="wait" initial={false}>
        {state === 'sent' ? (
          <motion.div
            key="sent"
            className={styles.success}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
          >
            <span className={styles.successIcon}>
              <Check size={28} />
            </span>
            <h2>{text.success}</h2>
            <p>{text.successBody}</p>
            <button className={styles.send} onClick={() => setState('idle')}>
              {text.again}
            </button>
          </motion.div>
        ) : (
          <motion.div key="compose" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className={styles.intro}>
              <span>
                {locale === 'it' ? 'A' : 'To'}: {identity.name}
              </span>
              <h2>{text.title}</h2>
              <p>{text.intro}</p>
            </header>
            <div
              className={styles.segment}
              role="group"
              aria-label={locale === 'it' ? 'Chi sei?' : 'Who are you?'}
            >
              {(['company', 'professional'] as const).map((id) => (
                <button
                  type="button"
                  key={id}
                  disabled={state === 'sending'}
                  aria-pressed={kind === id}
                  onClick={() => {
                    setKind(id)
                    setError('')
                  }}
                >
                  {kind === id && (
                    <motion.span
                      layoutId="contact-segment"
                      className={styles.selection}
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                    />
                  )}
                  {id === 'company' ? <Building2 size={17} /> : <UserRound size={17} />}
                  <span>{text[id]}</span>
                </button>
              ))}
            </div>
            <form
              ref={formRef}
              onSubmit={submit}
              onChange={(event) => {
                const field = event.target
                if (
                  (field instanceof HTMLInputElement ||
                    field instanceof HTMLSelectElement ||
                    field instanceof HTMLTextAreaElement) &&
                  field.name &&
                  field.name !== 'website'
                )
                  setField(field.name, field.value)
              }}
              className={styles.form}
              aria-label={
                locale === 'it'
                  ? 'Proposta di lavoro o collaborazione'
                  : 'Work or collaboration proposal'
              }
            >
              <fieldset disabled={state === 'sending'}>
                <div className={styles.row}>
                  <label>
                    {text.name}
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      defaultValue={values.name ?? ''}
                    />
                  </label>
                  <label>
                    {text.email}
                    <input
                      name="email"
                      defaultValue={values.email ?? ''}
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                    />
                  </label>
                </div>
                <div className={styles.row}>
                  <label hidden={kind !== 'company'}>
                    {text.organization}
                    <input
                      name="organization"
                      defaultValue={values.organization ?? ''}
                      autoComplete="organization"
                      required={kind === 'company'}
                      disabled={kind !== 'company'}
                      maxLength={160}
                    />
                  </label>
                  <label hidden={kind !== 'professional'}>
                    {text.profession} <small>{text.optional}</small>
                    <input
                      name="profession"
                      defaultValue={values.profession ?? ''}
                      autoComplete="organization-title"
                      disabled={kind !== 'professional'}
                      maxLength={160}
                    />
                  </label>
                  <label>
                    {text.opportunity}
                    <select
                      key={kind}
                      name="opportunity"
                      required
                      defaultValue={values.opportunity ?? ''}
                    >
                      <option value="" disabled>
                        —
                      </option>
                      {opportunities[kind].map((option) => (
                        <option key={option.id} value={option.id}>
                          {option[locale]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={styles.row}>
                  <label>
                    {text.timing} <small>{text.optional}</small>
                    <select name="timing" defaultValue={values.timing ?? ''}>
                      <option value="">—</option>
                      {text.timingOptions.map((label, i) => (
                        <option key={i} value={String(i)}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label hidden={kind !== 'company'}>
                    {text.budget} <small>{text.optional}</small>
                    <input
                      name="budget"
                      defaultValue={values.budget ?? ''}
                      disabled={kind !== 'company'}
                      maxLength={120}
                    />
                  </label>
                  <label hidden={kind !== 'professional'}>
                    {text.portfolio} <small>{text.optional}</small>
                    <input
                      name="portfolio"
                      defaultValue={values.portfolio ?? ''}
                      type="url"
                      placeholder="https://"
                      disabled={kind !== 'professional'}
                      maxLength={500}
                    />
                  </label>
                </div>
                <label>
                  {text.message}
                  <textarea
                    name="message"
                    defaultValue={values.message ?? ''}
                    required
                    minLength={20}
                    maxLength={5000}
                    rows={5}
                    placeholder={kind === 'company' ? text.companyHint : text.professionalHint}
                  />
                </label>
                <div className={styles.honey} aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
              </fieldset>
              {error && (
                <div className={styles.error} role="alert">
                  {text[error as 'error']} <a href={`mailto:${identity.email}`}>{identity.email}</a>
                </div>
              )}
              <footer className={styles.footer}>
                <p>{text.privacy}</p>
                <button className={styles.send} type="submit" disabled={state === 'sending'}>
                  {state === 'sending' ? (
                    <LoaderCircle size={17} className={styles.spin} />
                  ) : (
                    <ArrowUpRight size={17} />
                  )}
                  {state === 'sending' ? text.sending : text.submit}
                </button>
              </footer>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
