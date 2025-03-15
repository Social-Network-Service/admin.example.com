import {Delete, Get, Post, Put} from '../decorator/http'

export class Video {
    @Get({url: '//localhost:8090/api/video'})
    static async getVideoAll(params: any = {}) {
        return params
    }

    @Get({url: '//localhost:8090/api/video/:id'})
    static async findVideo(id: any) {
    }

    @Post({url: '//localhost:8090/api/video'})
    static async insertVideo(data: any = {}) {
        return data
    }

    @Put({url: '//localhost:8090/api/video/:id'})
    static async updateVideo(id: any, data: any = {}) {
        console.log(id, data)
        return data
    }

    @Delete({url: '//localhost:8090/api/video/:id'})
    static async deleteVideo(id: any) {
    }
}
