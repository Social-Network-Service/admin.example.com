import {Get} from '../decorator/http'

export class System {
    @Get({url: '/mock/sys_login.json'})
    static async login(params: any = {}) {
        return params
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
