import {Get, Post} from '../decorator/http'

export class System {
  @Post({url: 'http://localhost:8081/social/sys/login', errorNotice: true, successNotice: true})
  static async login(data: any) {
    return data
  }

  @Get({url: '/mock/sys_user_info.json'})
  static async getUserInfo(params: any = {}) {
    return params
  }

  @Get({url: '/mock/sys_user_menus.json'})
  static async getUserMenus(params: any = {}) {
    return params
  }
}