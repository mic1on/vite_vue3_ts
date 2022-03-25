export interface RouterStateType {
  routes: any[]
  menus: any[]
}
//用户 state
export interface UserStateType {
  status: any
  user: any
  permissions: string[]
}
//手机号及验证码登录
export interface UpcLoginParamType {
  mobile: string
  captcha: string
  captchaId: string
}
export interface SettingStateType {
  layout: 'vertical' | 'mixVertical' | string
  darkTheme: boolean
  darkHeader: boolean
  darkSider: boolean
  siderCollapsed: boolean
  lang: string
  darkFooter: boolean
  primaryColor: string
  infoColor: string
  successColor: string
  warningColor: string
  errorColor: string
  showBanner: boolean
  showFooter: boolean
  showBreadCrumb: boolean
  showHeaderMessage: boolean
  showTabsBar: boolean
  animated: boolean
  siderWidth: number
  siderCollapsedWidth: number
}
