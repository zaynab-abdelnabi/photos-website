import React from 'react';
import axios from 'axios';
import Auth from '../Auth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('user')){
            this.props.history.push('/'); 
        }
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value, error: null
    });

    onSubmit = e => {
        e.preventDefault();
        let data = { email: this.state.email, password: this.state.password };
        axios.post('/api/auth/login', data)
            .then(res => {
                Auth.login(res.data);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            });
    }

    renderError = () => {
        return this.state.error ? (<blockquote>{this.state.error}</blockquote>) : "";
    }

    render() {
        return (
            <div className="container container-form">
                <h4>تسجيل دخول</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit} >
                    <label>البريد الألكتروني</label>
                    <input type="email" value={this.state.email} name="email" onChange={this.onChange} />
                    <label>كلمة السر</label>
                    <input type="password" value={this.state.password} name="password" onChange={this.onChange} />
                    <input type="submit" value="دخول" />
                </form>
            </div>
        );
    }
}

export default Login;