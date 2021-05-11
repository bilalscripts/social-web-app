import React from 'react';
import { Link } from 'react-router-dom'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';

const Navbar = () => {
  return(
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className="navbar-brand anchor text-primary">Chaos 🔥</Link>
        <Link to='/' className="navbar-brand d-flex p-2 text-muted">Login <PersonOutlineSharpIcon style={{marginTop:'3px'}} /></Link>
        
      </nav>
    </>
  )
}


export default Navbar;