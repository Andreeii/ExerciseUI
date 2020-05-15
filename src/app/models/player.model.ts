import { PlayerGameDto } from './tournament-table.model';

export interface IPlayer{
    id:number;
    name:string;
    surname:string;
    userName:string;
    email:string;
    registrationDate:number;
}

export interface PlayerDto{
    name:string;
    surname:string;
    userName:string;
    email:string;
    password?:string;
    role?:string;
    profileImage:string;
}

export interface PlayerRoles{
    name:string;
}

export interface ChangePassword{
    curentPassword:string;
    newPassword:string;
}

export interface  PlayerForDelete{
    id:number;
    userName:string;
    playerGame:PlayerGameDto[];
}