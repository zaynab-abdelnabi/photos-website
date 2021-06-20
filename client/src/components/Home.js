import React from 'react';
import axios from 'axios';
import addPhoto from '../assets/add-photo.png';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            error: ''
        }
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = () => {
        axios.get('/api/posts')
            .then(res => {
                this.setState({
                    posts: res.data,
                    error: '',
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    isLoading: false
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (<h4>الرجاء الإنتظار</h4>)
        }
        if (this.state.error) {
            return (<blockquote>{this.state.error}</blockquote>)
        }
        if (this.state.posts.length < 1) {
            return (<h4>لا يوجد صور لعرضها</h4>);
        }
        return (
            <div className="posts">
                {this.state.posts.map(post => {
                    return (
                        <div className="container">
                            <div className="card">
                                <img src={`uploads/${post.photo}`} alt="" className="w-100" />
                                <div className="details">
                                    <h4><b>{post.title}</b></h4>
                                    <p className="cut-text">{post.caption}</p>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default Home;