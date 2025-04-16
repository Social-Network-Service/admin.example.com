import {Get, Post, Put} from '../decorator/http'

export class User {
    @Get({url: 'http://localhost:8081/social/user/all', formatResponseTime: true})
    static async list(params: any) {
        return params
    }

    @Post({url: 'http://localhost:8081/social/user', errorNotice: true})
    static async create(params: any) {
        return params
    }

    @Put({url: 'http://localhost:8081/social/user/:id'})
    static async update(id: any, data: any = {}) {
        return data
    }

    @Get({url: 'http://localhost:8081/social/user/all'})
    static async changeStatus(params: any) {
        return params
    }
}
