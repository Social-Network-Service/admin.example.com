export interface MenuData {
    id: number;
    name: string;
    uni: string;
    path: string;
    icon?: string;
    hide: number;
    order: number;
    status: number;
    routes?: MenuData[];
}

export interface MenuActionData {
    id: number;
    name: string;
    code: string;
    menuId: number;
    createTime: string;
}

export interface MenuTreeNode {
    data?: MenuData;
    id?: number;
    key: number;
    icon?: React.ReactNode;
    title: string;
    disabled: boolean;
    children?: MenuTreeNode[];
}
