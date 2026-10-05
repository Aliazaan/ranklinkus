import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { site } from '../config/site'
import { businessAreas, type BusinessAreaValue } from '../data/areas'
import { submitEnquiry } from '../lib/enquiry'
import { emptyEnquiry, validateEnquiry, type EnquiryErrors, type EnquiryValues } from '../lib/validation'
import { Button, ButtonLink } from './Button'
import { Icon } from './Icon'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Field = keyof EnquiryValues

const FIELD_ORDER: Field[] = ['name', 'company', 'email', 'phone', 'area', 'message']

interface ContactFormProps {
  /** Pre-selects the business area (from ?area= on the contact URL). */
  initialArea?: BusinessAreaValue
}

export function ContactForm({ initialArea }: ContactFormProps) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [mode, setMode] = useState<'sent' | 'mailto'>('sent')
  const [mailto, setMailto] = useState<string>()
  const [serverError, setServerError] = useState<string>()
  const formRef = useRef<HTMLFormElement>(null)

  // Applied after mount (not during render) so server and client markup match.
  useEffect(() => {
    if (initialArea) setValues((current) => (current.area ? current : { ...current, area: initialArea }))
  }, [initialArea])

  const validateField = (field: Field, next: EnquiryValues) => {
    const message = validateEnquiry(next)[field]
    setErrors((current) => ({ ...current, [field]: message }))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.target.name as Field
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (touched[field]) validateField(field, next)
  }

  const handleBlur = (field: Field) => {
    setTouched((current) => ({ ...current, [field]: true }))
    validateField(field, values)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading') return

    const found = validateEnquiry(values)
    setErrors(found)
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])))

    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      setStatus('idle')
      return
    }

    setStatus('loading')
    setServerError(undefined)
    const result = await submitEnquiry(values)
    if (result.ok) {
      setMode(result.mode)
      setMailto(result.mailto)
      setStatus('success')
    } else {
      setServerError(result.error)
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setTouched({})
    setErrors({})
  }

  if (status === 'success') {
    return (
      <div className="form-result" role="status" tabIndex={-1} ref={(node) => node?.focus()}>
        <span className="form-result__icon">
          <Icon name="check" size={22} />
        </span>
        {mode === 'mailto' ? (
          <>
            <h3 className="display form-result__title">Your enquiry is ready to send</h3>
            <p>
              Your email app should now be open with your message prepared. This website does not send enquiries by itself yet, so please press send in your email app.
            </p>
            <p>
              If nothing opened, email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phone.href}>{site.phone.display}</a>.
            </p>
            <div className="form-result__actions">
              {mailto && (
                <ButtonLink href={mailto} variant="primary">
                  Open email again
                </ButtonLink>
              )}
              <Button variant="outline-dark" onClick={reset}>
                Edit enquiry
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="display form-result__title">Thank you — enquiry sent</h3>
            <p>Your enquiry has been sent to the Dada Sons Group team.</p>
            <div className="form-result__actions">
              <Button variant="outline-dark" onClick={reset}>
                Send another enquiry
              </Button>
            </div>
          </>
        )}
      </div>
    )
  }

  const hasErrors = Object.values(errors).some(Boolean)

  const describe = (field: Field) => (errors[field] ? `enq-${field}-error` : undefined)

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate aria-describedby="enq-status">
      <div className="form__grid">
        <div className="field">
          <label htmlFor="enq-name">
            Name <span aria-hidden="true">*</span>
          </label>
          <input id="enq-name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange} onBlur={() => handleBlur('name')} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={describe('name')} />
          {errors.name && (
            <p id="enq-name-error" className="field__error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="enq-company">Company</label>
          <input id="enq-company" name="company" type="text" autoComplete="organization" value={values.company} onChange={handleChange} />
        </div>

        <div className="field">
          <label htmlFor="enq-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input id="enq-email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={handleChange} onBlur={() => handleBlur('email')} aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={describe('email')} />
          {errors.email && (
            <p id="enq-email-error" className="field__error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="enq-phone">Phone</label>
          <input id="enq-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={handleChange} onBlur={() => handleBlur('phone')} aria-invalid={Boolean(errors.phone)} aria-describedby={describe('phone')} />
          {errors.phone && (
            <p id="enq-phone-error" className="field__error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="field field--wide">
          <label htmlFor="enq-area">
            Business area <span aria-hidden="true">*</span>
          </label>
          <div className="field__select">
            <select id="enq-area" name="area" value={values.area} onChange={handleChange} onBlur={() => handleBlur('area')} aria-required="true" aria-invalid={Boolean(errors.area)} aria-describedby={describe('area')}>
              <option value="">Select a business area</option>
              {businessAreas.map((area) => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </select>
          </div>
          {errors.area && (
            <p id="enq-area-error" className="field__error">
              {errors.area}
            </p>
          )}
        </div>

        <div className="field field--wide">
          <label htmlFor="enq-message">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea id="enq-message" name="message" rows={6} value={values.message} onChange={handleChange} onBlur={() => handleBlur('message')} aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={describe('message')} />
          {errors.message && (
            <p id="enq-message-error" className="field__error">
              {errors.message}
            </p>
          )}
        </div>

        <div className="field--trap" aria-hidden="true">
          <label htmlFor="enq-website">Leave this field empty</label>
          <input id="enq-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
        </div>
      </div>

      <div id="enq-status" className="form__status" aria-live="polite">
        {status === 'error' && (
          <p className="form__alert">
            <Icon name="alert" size={18} /> {serverError}
          </p>
        )}
        {status !== 'error' && hasErrors && (
          <p className="form__alert">
            <Icon name="alert" size={18} /> Please check the highlighted fields.
          </p>
        )}
      </div>

      <div className="form__footer">
        <Button type="submit" variant="primary" arrow disabled={status === 'loading'} aria-busy={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="form__note">Fields marked * are required.</p>
      </div>
    </form>
  )
}
