export interface UserRecord {
    userId:number ;
    userName:string ;
    password:string ;
    email:string ;
    phone:string ;
    status:number ;
    createdAt:number ;
    updatedAt:number ;
}

export interface UserSearchParams {
    account?: string;
}

export enum UserStatus {
    Disabled = 0,
    Enabled = 1
}
