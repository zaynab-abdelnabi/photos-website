import axios from 'axios';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class Header extends React.Component {
    logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('_id');
        axios.defaults.headers.common = { 'Authorization': '' };
        this.props.history.push('/');
    }
    render() {
        if (localStorage.getItem('user')) {
            return (
                <div className="navbar">
                    <ul>
                        <li><Link to="/profile">الصفحة الشخصية</Link></li>
                        <li><Link to="/">الرئيسة</Link></li>
                        <li>
                            <ul>
                                <li><a href="#logout" onClick={this.logout}>تسجيل الخروج</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        }
        return (
            <div className="navbar">
                <ul>
                    <li><Link to="/profile">الصفحة الشخصية</Link></li>
                    <li><Link to="/">الرئيسة</Link></li>
                    <li>
                        <ul>
                            <li><Link to="/register">إنشاء حساب جديد</Link></li>
                            <li><Link to="/login">تسجيل دخول</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Header);