// 获取用户信息
import { getRequest } from '@/utils/request'

export function getUserInfo() {
  return getRequest({
    url: '/user/info',
  })
}
