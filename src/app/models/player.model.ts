export interface IPlayer{
    id:number;
    userName:string;
    mail?:string;
    registrationDate?:string;
    role?:string;
}

export interface PlayerDto{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
}