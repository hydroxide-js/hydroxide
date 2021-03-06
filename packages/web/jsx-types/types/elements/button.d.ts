import { HTMLAttributes } from '../attributes/html-attributes'

interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  /** Specifies that a button should automatically get focus when the page loads */
  autofocus?: boolean

  /** Specifies that a button should be disabled */
  disabled?: boolean

  /** Specifies the id of form the button belongs to */
  form?: string

  /** Specifies where to send the form-data when a form is submitted. Only for type="submit" */
  formaction?: string

  /** Specifies how form-data should be encoded before sending it to a server. Only for type="submit" */
  formenctype?: string

  /** Specifies HTTP method to send form-data. Only for type="submit" */
  formmethod?: string

  /** Specifies that the form-data should not be validated on submission. Only for type="submit" */
  formnovalidate?: boolean

  /** Specifies where to display the response after submitting the form. Only for type="submit" */
  formtarget?: string

  /** Specifies a name for the button */
  name?: string

  /** Specifies the type of button */
  type?: 'submit' | 'reset' | 'button'

  /** Specifies an initial value for the button */
  value?: string | ReadonlyArray<string> | number
}
