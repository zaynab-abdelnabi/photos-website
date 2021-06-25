import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            username: '',
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
                let posts = []
                res.data.map(post => {
                    if (post.author._id === JSON.parse(localStorage.getItem('user'))._id) {
                        posts.push(post);
                    }
                });
                this.setState({
                    posts: posts,
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
        return (
            <div>
                <button onClick={() => this.onLikeClick(post)} className={`unlike ${this.liked(post) ? '' : 'like'}`}>
                    <span className="like-num">{post.likes.length}</span>
                    <FontAwesomeIcon icon="heart" className="heart" />
                </button>
            </div>
        )

    }

    deletePost = (postId) => {
        axios.delete('/api/posts/' + postId)
            .then(res => {
                this.fetchPosts();
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
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
            return (
                <div>
                    <h4>الصفحة الشخصية</h4>
                    <hr />
                    <h5>لم تقم بنشر أي صور بعد</h5>
                </div>
            )
        }
        return (
            <div>
                <h4>الصفحة الشخصية</h4>
                <hr />
                <div className="posts">
                    {this.state.posts.map(post => {
                        return (
                            <div className="container" key={post._id}>
                                <div className="card">
                                    <Link to={"/post/view/" + post._id}>
                                        <img src={`uploads/${post.photo}`} alt="" />
                                    </Link>
                                    <div className="details">
                                        <h4 className="cut-text"><b>{post.title}</b></h4>
                                        <p className="cut-text">{post.caption}</p>
                                        {this.renderLike(post)}
                                        <span className="delete-edit">
                                            <Link to={'/post/edit/' + post._id}>
                                                <FontAwesomeIcon icon="edit" className="edit-icon" />
                                            </Link>
                                            <FontAwesomeIcon icon="trash" className="delete-icon" onClick={() => this.deletePost(post._id)} />
                                        </span>
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

export default Profile;