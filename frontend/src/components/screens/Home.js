import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Homenav from '../Navbar';


const Home = (props) => {
  const history = useHistory();

  const createPost = () => {
    history.push('/create')
  }
  return (
    <>
    <div className='container-fluid'>
        <Homenav />
        <div className='row'>

        <div className='col-md-3 bg-light post sidebar'>
          
          <Link to='/' className="navbar-brand d-flex p-2 text-dark ">Home</Link>
          <Link to='/profile' className="navbar-brand d-flex p-2 text-dark ">Profile </Link>
          <Link to='/home' className="navbar-brand d-flex p-2 text-dark my-2">Following<span class="badge badge-light">4</span></Link>
          <Link to='/home' className="navbar-brand d-flex p-2 text-dark ">Followers</Link>


        </div>

        <div className='col-md-8 bg-light post'>
          <div className='border-bottom p-3'>
          <button onClick={createPost}>Create Post </button>
          </div>

          

        </div>

        </div>
      </div>





      

      <Card />
    </>
  )
}

export default Home;