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

    @Get({url: '/mock/template_enable.json', loading: true, successNotice: true, errorNotice: true})
    static async templateEnable(params: any) {
        return params
    }

    @Get({
        url: '/mock/template_disable.json',
        loading: true,
        successNotice: true,
        errorNotice: true,
    })
    static async templateDisable(params: any) {
        return params
    }
}
