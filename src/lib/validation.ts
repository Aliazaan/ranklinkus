export interface EnquiryValues {
  name: string
  company: string
  email: string
  phone: string
  area: string
  message: string
  /** Honeypot — real visitors never see or fill this field. */
  website: string
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

export const emptyEnquiry: EnquiryValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  area: '',
  message: '',
  website: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?\d{7,15}$/

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {}

  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'

  const phone = values.phone.replace(/[\s\-().]/g, '')
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number, including the country code if outside Pakistan.'
  }

  if (!values.area) errors.area = 'Please choose the business area your enquiry relates to.'

  if (values.message.trim().length < 10) errors.message = 'Please tell us a little about your requirement (at least 10 characters).'

  return errors
}
