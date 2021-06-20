import React from 'react';
import axios from 'axios';

class ViewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            error: ''
        }
    }

    componentDidMount() {
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
                    error: err.response.data.message,
                });
            });
    }

    render() {
        if (this.state.error) {
            return (<blockquote>{this.state.error}</blockquote>)
        }
        if (!this.state.post.title) {
            return (<h4>الرجاء الأنتظار</h4>)
        }
        return (
            <div className="container">
                <img src={`/uploads/${this.state.post.photo}`} alt="" className="show-photo" />

                <div className="details">
                    <h4><b>{this.state.post.title}</b></h4>
                    <p>{this.state.post.caption}</p>
                </div>
            </div>
        );
    }

}

export default ViewPost;