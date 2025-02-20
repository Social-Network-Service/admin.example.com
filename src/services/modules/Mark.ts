import {Get} from '../decorator/http'

export class Mark {
    @Get({url: '/mock/mark_image_list.json'})
    static async getImageList(params: any = {}) {
        return params
    }
}
