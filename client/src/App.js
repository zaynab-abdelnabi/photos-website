import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Header, Profile, Home, Register, Login } from './components';

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <div className="container">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
