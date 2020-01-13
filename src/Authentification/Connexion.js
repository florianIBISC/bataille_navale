import React from 'react';
import {Link} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './CSS/bootstrap.css'
import './CSS/style.css'

class Connection extends React.Component {
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
        const handleChange = prop => event => {
            this.setState({ ...this.state, [prop]: event.target.value });
        };

        const handleClickShowPassword = () => {
            this.setState({ ...this.state, showPassword: !this.state.showPassword });
        };

        const handleMouseDownPassword = event => {
            event.preventDefault();
        };
        
        return(
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                    <div class="card card-body">
                        <h1 class="text-center mb-3">
                            <i class="fas fa-user-plus"></i> Se Connecter
                        </h1>
                        <form /*action="/users/register" method="POST"*/>
                            <div class="form-group">
                                <TextField
                                    label="Login "
                                    id="simple-start-adornment"
                                    className={clsx(useStyles.margin, useStyles.textField)}
                                />
                            </div>
                            <div class="form-group">
                                <FormControl className={clsx(useStyles.margin, useStyles.textField)}>
                                    <InputLabel htmlFor="adornment-password">Mot de passe</InputLabel>
                                    <Input
                                        id="adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <Link to="/initalisation">
                            <button type="submit" class="btn btn-primary btn-block" style={{display: "inline-block", width: "50%"}}>
                                Connexion
                            </button>
                            </Link>
                            <Link to="/compte">
                            <button type="submit" class="btn btn-primary btn-block" style={{display:"inline-block", width: "50%"}}>
                                Creer un compte
                            </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Connection;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor:'blue',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      flexBasis: 200,
    },
}));