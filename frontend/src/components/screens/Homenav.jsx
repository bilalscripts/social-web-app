import React,{useContext} from 'react';
import { Link, useHistory } from 'react-router-dom'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {UserContext} from '../../App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container , Nav} from "react-bootstrap";


const Homenav = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory();
  return(
    <>
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor:'#23395b'}}>
      <Container className='text-center'>
        <Navbar.Brand><Link to='/' className="navbar-brand anchor text-warning">Chaos 🔥</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end"> 
        
          
          
          

        <Nav className=''>
            <Nav.Link href="#deets"><Link to='/' className="navbar-brand d-flex p-2 text-warning " style={{fontFamily:'"Roboto", sans-serif'}}> Explore <LibraryBooksIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link></Nav.Link>
            <Nav.Link eventKey={2} href="#memes"><Link to='/subscribedposts' className="navbar-brand d-flex p-2 text-warning " style={{fontFamily:'"Roboto", sans-serif'}}> Home <HomeOutlinedIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link></Nav.Link>
            <Nav.Link eventKey={2} href="#memes"><Link to='/profile' className="navbar-brand d-flex p-2 text-warning " style={{fontFamily:'"Roboto", sans-serif'}}>Profile<PersonOutlineSharpIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link></Nav.Link>
            <Nav.Link eventKey={2} href="#memes"><Link  onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/login')
              }} className="navbar-brand d-flex p-2 text-warning " style={{fontFamily:'"Roboto", sans-serif'}}>Logout<ExitToAppOutlinedIcon style={{marginTop:'3px',marginLeft:'2px'}} /></Link></Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </>
  )
}


export default Homenav;