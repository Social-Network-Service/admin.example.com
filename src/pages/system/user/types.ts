export interface UserData {
    id: number;
    name: string;
    phone: string;
    email: string;
    products: Array<{ id: string; name: string }>;
    skill_groups: Array<{ id: string; name: string }>;
    roles: Array<{ id: string; name: string }>;
    last_login: string;
    status: number; // 0: 禁用, 1: 启用
    create_time: string;
}

export interface UserSearchParams {
    account?: string;
}

export enum UserStatus {
    Disabled = 0,
    Enabled = 1
}
