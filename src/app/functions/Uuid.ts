
 import *  as uuid  from  'uuid';

export const Uuid = {
    id:'',
    generateUuid(version = 'v1'){
        switch(version){
            case 'v1':
                this.id = uuid.v1()
                break;
            case 'v2':
                this.id = uuid.v1()
                break;
            case 'v3':
                this.id = uuid.v3()
                break;  
            case 'v4':
                this.id = uuid.v4()
                break;  
            default:
                this.id = uuid.v5()
                break;              
        }
        sessionStorage.setItem('HashAppSecurytWeb',this.id)
    },
    getUuid:sessionStorage.getItem('HashAppSecurytWeb'),
    checkExistUuid(){
        if(!sessionStorage.getItem('HashAppSecurytWeb')){
            return false;
        }
        return true;
    }

}