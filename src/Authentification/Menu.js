import React from 'react';
import {Link} from 'react-router-dom'
import './CSS/bootstrap.css'
import './CSS/style.css'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
        };
    }
    
    //creer une fonction pour lier le back et front au bouttons
    render(){
        return(
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                    <div class="card card-body">
                        <h1 class="text-center mb-3">
                            <i class="fas fa-user-plus"></i> Menu
                        </h1>
                        <form /*action="/users/register" method="POST"*/>
                            <Link to="/initalisation">
                            <button type="submit" class="btn btn-primary btn-block" style={{marginTop: "10%", width: "20%", marginLeft: "40%"}}>
                                Rejoindre Salon
                            </button>
                            </Link>
                            {/*<Link to="/compte">*/}
                            <button type="submit" class="btn btn-primary btn-block" style={{marginTop: "10%", width: "20%", marginLeft: "40%"}}>
                                Creer Salon
                            </button>
                            {/*</Link>*/}
                            {/*<Link to="/compte">*/}
                            <button type="submit" class="btn btn-primary btn-block" style={{marginTop: "10%", width: "20%", marginLeft: "40%"}}>
                                Voir Classement
                            </button>
                            {/*</Link>*/}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Menu;