import React from 'react';
import axios from 'axios';
import Auth from '../Auth';

class Register extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('user')) {
            this.props.history.push('/');
        }
        this.state = {
            name: '',
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
        let data = {
            name: this.state.name, email: this.state.email, password: this.state.password
        };
        axios.post('/api/auth/register', data)
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
                <h4>إنشاء حساب جديد</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit} >
                    <label>الأسم</label>
                    <input type="text" value={this.state.name} name="name" onChange={this.onChange} />
                    <label>البريد الألكتروني</label>
                    <input type="email" value={this.state.email} name="email" onChange={this.onChange} />
                    <label>كلمة السر</label>
                    <input type="password" value={this.state.password} name="password" onChange={this.onChange} />
                    <label>تأكيد كلمة السر</label>
                    <input type="password" />
                    <input type="submit" value="التسجيل" />
                </form>
            </div>
        );
    }
}

export default Register;