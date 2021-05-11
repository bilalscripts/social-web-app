import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './components/screens/Login';
import {Route, Switch} from 'react-router-dom' 
import FgtPass from './components/screens/FgtPass';
import Signup from './components/screens/Signup';
import Home from './components/screens/Home'


const App = () => {
  return(
   <>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/forgot' component={FgtPass} />
      <Route exact path='/newaccount' component={Signup} />
      <Route exact path='/home' component={Home} />
      

    </Switch>
    
   </>
  );
}


export default App;