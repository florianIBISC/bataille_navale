import axios from "axios";

/*const headers = {
    "Content-Type": "application/json"
};*/
const burl = "http://192.168.194.198:8080"; //

export default {
    login: function(pseudo, password){
        return axios.post(`${burl}/users/login`,
        {
            pseudo,
            password,
        });
    }
}