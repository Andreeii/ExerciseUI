export interface IPlayer{
    id:number;
    name:string;
    surname:string;
    userName:string;
    email:string;
    registrationDate:number;
}

export interface PlyerForEditTournament{
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