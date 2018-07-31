import React, {Component} from 'react';
import './adminLogin.scss';
import {Meteor} from 'meteor/meteor';

class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLoginClick() {
        const {email, password} = this.state;
        Meteor.loginWithPassword(email, password, err => {
           if(!err) {

           } else {
               console.log(err)
           }
        });
    }

    render() {
        return (
            <div id='adminLogin'>
                <div id='loginForm'>
                    <div className='login-input-wrap'>
                        <label className='login-label'>email</label>
                        <input className='login-input'
                               name='email'
                               value={this.state.email}
                               onChange={this.onInputChange}
                               type='email'
                        />
                    </div>
                    <div className='login-input-wrap'>
                        <label className='login-label'>haslo</label>
                        <input className='login-input'
                               name='password'
                               value={this.state.password}
                               onChange={this.onInputChange}
                               type='password'
                        />
                    </div>
                    <div id='loginBtn'
                         onClick={this.onLoginClick}
                    >
                        zaloguj sie
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;