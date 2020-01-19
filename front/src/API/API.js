import axios from "axios";

/*const headers = {
    "Content-Type": "application/json"
};*/
const burl = "http://localhost:8080"; //

export default {
    login: function(pseudo, password){
        let v = axios.get(`${burl}/option/classement`,
        {
            pseudo,
            password,
        });
        console.log(v);
        return v;
    }
}