import {Delete, Get, Post, Put} from '../decorator/http'

export class Video {
  @Get({url: 'http://localhost:8081/social/video/list', formatResponseTime: true})
  static async getVideoList(params: any = {}) {
    return params
  }

  @Get({url: 'http://localhost:8081/social/video/:id'})
  static async detail(id: any) {
  }

  @Post({url: 'http://localhost:8081/social/video', errorNotice: true, successNotice: true})
  static async create(data: any) {
    return data
  }

  @Put({url: 'http://localhost:8081/social/video/:id', errorNotice: true, successNotice: true})
  static async update(id: any, data: any) {
    return data
  }

  @Delete({url: 'http://localhost:8081/social/video/:id', errorNotice: true, successNotice: true})
  static async delete(id: any) {
  }
}
