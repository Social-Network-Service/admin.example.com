import {Get} from '../decorator/http'

export class User {
    // @Get({url: '/mock/sys_user_list.json'})
    // @Get({url: 'http://localhost:8081/social/user/all', formatResponseTime: true})
    @Get({url: 'http://localhost:8081/social/user/all'})
    static async list(params: any) {
        return params
    }
    @Get({url: 'http://localhost:8081/social/user/all'})
    static async changeStatus(params: any) {
        return params
    }
}
