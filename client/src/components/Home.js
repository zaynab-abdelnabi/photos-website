import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
                    isLoading: false,
                    error: err.response.data.message
                });
            });
    }

    like = async (postId) => {
        await axios.put('/api/likes/like/' + postId)
            .then(res => {
                this.fetchPosts();
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    unlike = async (postId) => {
        await axios.put('/api/likes/unlike/' + postId)
            .then(res => {
                this.fetchPosts();
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
    }

    onLikeClick = (post) => {
        let liked = true;
        if (!post.likes.length) {
            this.like(post._id);

        } else {
            post.likes.forEach(like => {
                if (like.author._id === JSON.parse(localStorage.getItem('user'))._id) {
                    this.unlike(post._id);
                    liked = false;
                }
            });
            if (liked) {
                this.like(post._id);
            }
        }
    }

    liked = (post) => {
        let likestatus = true;
        if (!post.likes.length) {
            return likestatus;

        } else {
            post.likes.forEach(like => {
                if (like.author._id === JSON.parse(localStorage.getItem('user'))._id) {
                    likestatus = false;
                    return likestatus;
                }
            });
            if (likestatus) {
                return likestatus;
            }
        }
    }


    renderLike = (post) => {
        if (!localStorage.getItem('user')) {
            return (<Link to={"/login"}>
                <button className='unlike'>
                    <span className="like-num">{post.likes.length}</span>
                    <FontAwesomeIcon icon="heart" className="heart" />
                </button>
            </Link>)
        } else {
            return (
                <div>
                    <button onClick={() => this.onLikeClick(post)} className={`unlike ${this.liked(post) ? '' : 'like'}`}>
                        <span className="like-num">{post.likes.length}</span>
                        <FontAwesomeIcon icon="heart" className="heart" />
                    </button>
                </div>
            )
        }
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
            <div>
                <h4>المنشورات</h4>
                <div className="posts">
                    {this.state.posts.map(post => {
                        return (
                            <div className="container">
                                <div className="card">
                                    <Link to={"/post/view/" + post._id}>
                                        <img src={`uploads/${post.photo}`} alt="" />
                                    </Link>
                                    <div className="details">
                                        <h4 className="cut-text"><b>{post.title}</b></h4>
                                        <p className="cut-text">{post.caption}</p>
                                        {this.renderLike(post)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default Home;