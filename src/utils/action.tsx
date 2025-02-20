export enum ActionType {
    CREATE = 'create',
    DELETE = 'delete',
    UPDATE = 'update',
    DETAIL = 'detail',

    PREVIEW = 'preview',
    CONFIG = 'config',
    CHECK = 'check',
    COPY = 'copy',

    ENABLE = 'enable',
    DISABLE = 'disable',

    CANCEL = 'cancel',
    CONFIRM = 'confirm',
}

export type ActionFunType = (action: string, data?: any) => void

export function createActionFun(obj: any, setAction?: any, debug: boolean = true): ActionFunType {
    const onAction: ActionFunType = (type, data) => {
        const fun = obj[type]
        if (fun && typeof fun === 'function') {
            if (process.env.NODE_ENV === 'development' && debug) {
                console.log({type, data})
            }
            setAction && setAction(type)
            fun(data)
        } else {
            console.warn(`Unknown action type: ${type}`)
        }
    }

    return onAction
}