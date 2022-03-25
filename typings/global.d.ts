///自己定义的
declare interface Window {
  $loadingBar: any
  $message: any
  $notify: any
  $dialog: any
}
declare type TargetContext = '_self' | '_blank'
declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null

declare type LabelValueOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]

declare type EmitType = (event: string, ...args: any[]) => void

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
/*
 * env 环境参数格式定义
 */
declare interface EnvConfigType {
  VITE_PORT: number
  VITE_APP_NAME: string
  VITE_SERVER_ROUTE: boolean
  VITE_RECORD_LAST_ROUTE: boolean
  VITE_API_BASE_URL: string
  VITE_BUILD_COMPRESS_STRATEGY: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_DELETE_ORIGIN_FILE: boolean
}
