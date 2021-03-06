import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comment: '',
            commentError: '',
            error: ''
        }
    }



    componentDidMount() {
        this.fetchPost();
    }

    fetchPost = () => {
        let postId = this.props.match.params.id;
        axios.get('/api/posts/' + postId)
            .then(res => {
                this.setState({
                    post: res.data,
                    error: ''
                });
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message
                })
            });
    }

    onChangeComment = (e) => {
        this.setState({
            comment: e.target.value,
            commentError: ''
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            content: this.state.comment
        };
        axios.post('/api/comments/' + this.props.match.params.id, data)
            .then(res => {
                let post = this.state.post;
                post.comments.push({
                    _id: res.data._id,
                    content: res.data.content,
                    author: {
                        _id: JSON.parse(localStorage.getItem('user'))._id
                    }
                });
                this.setState({
                    post: post,
                    commentError: '',
                    comment: ''
                })
                this.fetchPost();
            })
            .catch(err => {
                this.setState({
                    commentError: <blockquote>{err.response.data.message}</blockquote>
                });
            });
    }

    deletePost = () => {
        axios.delete('/api/posts/' + this.state.post._id)
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                });
            });
    }

    renderAction() {
        if (localStorage.getItem('user')) {
            let userDetails = JSON.parse(localStorage.getItem('user'));
            if (userDetails.token && userDetails._id === this.state.post.author._id) {
                return (
                    <span>
                        <Link to={'/post/edit/' + this.state.post._id}>
                            <button className='edit'>??????????</button>
                        </Link>
                        <button className='delete' onClick={this.deletePost}>??????</button>
                    </span>
                );
            }
        }
    }

    renderComments() {
        let comments = <p>???? ???????? ??????????????</p>
        if (this.state.post.comments.length) {
            comments = this.state.post.comments.map(comment => {
                return (
                    <p key={comment._id} className="comment">
                        <strong className='comment-author'>{comment.author.name}</strong>
                        {comment.content}
                    </p>
                )
            });
        }
        return comments;
    }

    renderCommentForm = () => {
        if (!localStorage.getItem('user')) {
            return (<p>???????????? ?????????? ???????????? ?????????????? ?????? ?????? ????????????</p>)
        }
        return (
            <div>
                <h4>?????????? ??????????</h4>
                {this.state.commentError}
                <form onSubmit={this.onSubmit}>
                    <textarea value={this.state.comment} onChange={this.onChangeComment}></textarea>
                    <input type="submit" value="?????????? ??????????????" />
                </form>
            </div>
        )
    }



    render() {
        if (this.state.error) {
            return (<blockquote>{this.state.error}</blockquote>)
        }
        if (!this.state.post.title) {
            return (<h4>???????????? ????????????????</h4>)
        }
        return (
            <div className="container">
                <h4><b>{this.state.post.title}</b></h4>
                <img src={`/uploads/${this.state.post.photo}`} alt="" className="show-photo" />
                <div className="details">
                    <p>{this.state.post.caption}</p>
                    {this.renderAction()}
                    <hr />
                    <h4>??????????????????<span className="comment-num">({this.state.post.comments.length})</span></h4>
                    {this.renderComments()}
                    {this.renderCommentForm()}
                </div>
            </div>
        );
    }

}

export default ViewPost;