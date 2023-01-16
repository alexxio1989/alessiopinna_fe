export class TokenResponse{
    id:number;
    accessToken:string;
    tokenType:string;
    expiresInSeconds:number;
    refreshToken:string;
    scope:string;
    dateCreation:Date;
    dateExiration:Date;
    provider:string;
}