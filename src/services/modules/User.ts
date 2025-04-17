import {Delete, Get, Post, Put} from '../decorator/http'

export class User {
    @Get({url: 'http://localhost:8081/social/user/all', formatResponseTime: true})
    static async list(params: any) {
        return params
    }

    @Post({url: 'http://localhost:8081/social/user', errorNotice: true})
    static async create(data: any) {
        return data
    }

    @Put({url: 'http://localhost:8081/social/user/:id'})
    static async update(id: any, data: any = {}) {
        return data
    }

    @Delete({url: 'http://localhost:8081/social/user/:id'})
    static async delete(id: any) {
        return;
    }

    @Post({url: 'http://localhost:8081/social/user/status'})
    static async status(data: any) {
        return data
    }
}
