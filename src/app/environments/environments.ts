
export const environment = {
    urlApi:function(production=false){
        if(production){
            return 'http://api.wuob.trade/api/v1/'
        }else{
            return 'http://127.0.0.1:8000/api/v1/'
        }
    },
    firebaseConfig : {
        apiKey: "AIzaSyC-gsIybRxDiDOmUGFJheHDEOSgHG-6qs4",
        authDomain: "trade-dbbf3.firebaseapp.com",
        databaseURL: "https://trade-dbbf3.firebaseio.com",
        projectId: "trade-dbbf3",
        storageBucket: "",
        messagingSenderId: "615076606227",
        appId: "1:615076606227:web:b2dd9ae3a71f8149e3eae6"
    }

}