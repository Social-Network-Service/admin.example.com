import {Delete, Get, Post, Put} from '../decorator/http'

export class Video {
    @Get({url: 'http://localhost:8081/social-api/api/video/list', formatResponseTime: true})
    static async getVideoList(params: any = {}) {
        return params
    }

    @Get({url: 'http://localhost:8081/social-api/api/video/all'})
    static async getVideoAll(params: any = {}) {
        return params
    }

    @Get({url: 'http://localhost:8081/social-api/api/video/:id'})
    static async findVideo(id: any) {
    }

    @Post({url: 'http://localhost:8081/social-api/api/video'})
    static async insertVideo(data: any = {}) {
        return data
    }

    @Put({url: 'http://localhost:8081/social-api/api/video/:id'})
    static async updateVideo(id: any, data: any = {}) {
        console.log(id, data)
        return data
    }

    @Delete({url: 'http://localhost:8081/social-api/api/video/:id'})
    static async deleteVideo(id: any) {
        console.log({id})
    }
}
