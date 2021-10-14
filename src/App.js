import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Users from './components/Users';
import "antd/dist/antd.css";
import '../src/styles/common.css'
import NewUser from './components/NewUser';
import Login from './components/Login';
import Register from './components/Register';
import NotFoundComponent from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

function Application() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path='/'>
              <Redirect to="/users" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/users/add" component={NewUser} />
            <Route path="*" exact component={NotFoundComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default Application;
