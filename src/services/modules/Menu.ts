import {Get} from '../decorator/http'

export class Menu {
    @Get({url: '/mock/menu_list.json'})
    static async getMenuList(params: any = {}) {
        return params
    }

    @Get({url: '/mock/menu_action_list.json'})
    static async getMenuActionList(params: any = {}) {
        return params
    }
}
