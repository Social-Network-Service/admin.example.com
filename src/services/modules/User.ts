import {Delete, Get, Post, Put} from '../decorator/http'

export class User {
  @Get({url: 'http://localhost:8081/social/user/all', formatResponseTime: true})
  static async list(params: any) {
    return params
  }

  @Post({url: 'http://localhost:8081/social/user', errorNotice: true, successNotice: true})
  static async create(data: any) {
    return data
  }

  @Put({url: 'http://localhost:8081/social/user/:id', errorNotice: true, successNotice: true})
  static async update(id: any, data: any = {}) {
    return data
  }

  @Delete({url: 'http://localhost:8081/social/user/:id', errorNotice: true, successNotice: true})
  static async delete(id: any) {
    return;
  }

  @Post({url: 'http://localhost:8081/social/user/status', errorNotice: true, successNotice: true})
  static async status(data: any) {
    return data
  }
}
