export interface IPlayer{
    id:number;
    userName:string;
}

export interface PlayerDto{
    name:string;
    surname:string;
    userName:string;
    email:string;
    password?:string;
    role?:string;
}

export interface PlayerRoles{
    name:string;
}

export interface ChangePassword{
    curentPassword:string;
    newPassword:string;
}