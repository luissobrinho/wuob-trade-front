
export class User{
    
    login:string
    email:string
    name:string
    photo:string
    phoneNumber:string
    provider:string
    private pass:string 
    private token:string 

    public setToken(token:string){
        this.token
    }

    public getToken(){
        return this.token
    }

    public setPass(pass:string){
        this.pass
    }

    public getPass(){
        return this.pass;
    }
        
}