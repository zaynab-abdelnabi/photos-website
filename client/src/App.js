import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Auth from './Auth';
import { Header, Profile, Home, Register, Login, CreatePost, ViewPost } from './components';


class App extends React.Component {
  constructor(props) {
    super(props);
    Auth.init();
  }
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <div>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/new/post" component={CreatePost}/>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/post/view/:id" component={ViewPost} />

              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
