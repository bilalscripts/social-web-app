import React from 'react';
import { Link } from 'react-router-dom'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';

const Navbar = () => {
  return(
    <>
      <nav className='navbar navbar-expand-lg navbar-transparent' style={{backgroundColor:'#23395b'}}>
        <Link to='/' className="navbar-brand anchor text-light m-2">Chaos 🔥</Link>
        <Link to='/login' className="navbar-brand d-flex p-2 text-light">Login <PersonOutlineSharpIcon style={{marginTop:'3px'}} /></Link>
      </nav>
    </>
  )
}


export default Navbar;