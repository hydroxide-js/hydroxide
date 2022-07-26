import { HTMLAttributes } from '../attributes/html-attributes'

interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
  allowfullscreen?: boolean
  allowpopups?: boolean
  autofocus?: boolean
  autosize?: boolean
  blinkfeatures?: string
  disableblinkfeatures?: string
  disableguestresize?: boolean
  disablewebsecurity?: boolean
  guestinstance?: string
  httpreferrer?: string
  nodeintegration?: boolean
  partition?: string
  plugins?: boolean
  preload?: string
  src?: string
  useragent?: string
  webpreferences?: string
}

// @ts-ignore
export type JSXWebviewElement = WebViewHTMLAttributes<HTMLWebViewElement>
