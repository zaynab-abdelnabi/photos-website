import React from 'react';
import axios from 'axios';
import addPhoto from '../assets/add-photo.png';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('user')) {
            this.props.history.push('/login');
        }
        this.state = {
            selectedFile: null,
            photoUrl: '',
            title: '',
            caption: '',
            error: ''
        };
        this.fileUpload = React.createRef();
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value, error: null
    });

    showFileUpload = e => this.fileUpload.current.click();

    onImageChange = e => {
        if (e.target.files[0]) {
            this.setState({
                photoUrl: URL.createObjectURL(e.target.files[0]),
                selectedFile: e.target.files[0]
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', this.state.title);
        data.append('caption', this.state.caption);
        if (this.state.selectedFile) data.append('photo', this.state.selectedFile)
        console.log(this.state.selectedFile);
        axios.post('/api/posts', data)
            .then(res => {
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

    src = () => {
        if (this.state.selectedFile) {
            return this.state.photoUrl;
        } else {
            return addPhoto;
        }
    }

    render() {
        return (
            <div className="container container-form">
                <h4>إضافة صورة جديدة</h4>
                <hr />
                {this.renderError()}
                <form onSubmit={this.onSubmit} >
                    <div onClick={this.showFileUpload}>
                        <img src={this.src()} className="photo" alt="" />
                    </div>
                    <input type="file" ref={this.fileUpload} onChange={this.onImageChange} className="d-none" />
                    <label>العنوان</label>
                    <input type="text" value={this.state.title} name="title" onChange={this.onChange} />
                    <label>الوصف</label>
                    <textarea value={this.state.caption} name="caption" onChange={this.onChange} ></textarea>
                    <input type="submit" value="إضافة الصورة" />
                </form>
            </div>
        );
    }
}

export default CreatePost;