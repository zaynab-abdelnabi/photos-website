import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
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

export default Header;