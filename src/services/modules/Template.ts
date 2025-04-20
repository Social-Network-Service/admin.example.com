import {Get} from '../decorator/http'

export class Template {
    @Get({url: '/mock/template_list.json'})
    static async templateList(params: any = {}) {
        return params
    }

    @Get({url: '/mock/template_create.json', loading: true, successNotice: true, errorNotice: true})
    static async templateCreate(params: any) {
        return params
    }

    @Get({url: '/mock/template_update.json', loading: true, successNotice: true, errorNotice: true})
    static async templateUpdate(params: any) {
        return params
    }

    @Get({url: '/mock/template_delete.json', loading: true, successNotice: true, errorNotice: true})
    static async templateDelete(params: any) {
        return params
    }

    @Get({url: '/mock/template_change_status.json', loading: true, successNotice: true, errorNotice: true})
    static async templateChangeStatus(params: any) {
        return params
    }
}
