import React,{useContext} from 'react';
import { Link, useHistory } from 'react-router-dom'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {UserContext} from '../../App'
import 'bootstrap/dist/css/bootstrap.min.css';

const Homenav = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory();
  return(
    <>
    <div className='container-fluid'>
      <div className='row'>
      <div className='navbar-expand-lg navvbar'>
        <Link to='/' className="navbar-brand anchor text-primary">Chaos 🔥</Link>
        <div className='navdiv'>
          <Link to='/' className="navbar-brand d-flex p-2 text-dark "> Home <HomeOutlinedIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link>
          <Link to='/profile' className="navbar-brand d-flex p-2 text-dark ">Profile<PersonOutlineSharpIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link>
          <Link  onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/login')
          }} className="navbar-brand d-flex p-2 text-dark ">Logout<ExitToAppOutlinedIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link>
        </div>
      </div>
      </div>
    </div>
      
    </>
  )
}


export default Homenav;