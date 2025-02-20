import {Get} from '../decorator/http'

export class User {
    @Get({url: '/mock/sys_user_list.json'})
    static async getUserList(params: any = {}) {
        return params
    }
}
