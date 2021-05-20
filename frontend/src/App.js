import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './components/screens/Login';
import {Route, Switch} from 'react-router-dom' 
import FgtPass from './components/screens/FgtPass';
import Signup from './components/screens/Signup';
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Createpost from './components/screens/CreatePost';




const App = () => {
  return(
   <>
    <Switch>
      
      <Route exact path='/' component={Home} />
      <Route exact path='/forgot' component={FgtPass} />
      <Route exact path='/newaccount' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/create' component={Createpost} />
      

    </Switch>

    
   </>
  );
}


export default App;


