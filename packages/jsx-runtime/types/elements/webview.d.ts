import { HTMLAttributes } from '../attributes'

interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
  allowFullScreen?: boolean | undefined
  allowpopups?: boolean | undefined
  autoFocus?: boolean | undefined
  autosize?: boolean | undefined
  blinkfeatures?: string | undefined
  disableblinkfeatures?: string | undefined
  disableguestresize?: boolean | undefined
  disablewebsecurity?: boolean | undefined
  guestinstance?: string | undefined
  httpreferrer?: string | undefined
  nodeintegration?: boolean | undefined
  partition?: string | undefined
  plugins?: boolean | undefined
  preload?: string | undefined
  src?: string | undefined
  useragent?: string | undefined
  webpreferences?: string | undefined
}

// @ts-ignore
export type JSXWebviewElement = WebViewHTMLAttributes<HTMLWebViewElement>
