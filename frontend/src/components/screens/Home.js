import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Homenav from './Homenav';
import DisplayImage from './DisplayImage';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = (props) => {

  const [comment, setComment] = useState('');

  return(
    <>
      
      <div className='container-fluid'>
        <Homenav />
        <div className='row'>

        <div className='col-md-3 bg-light post sidebar'>
          
          <Link to='/home' className="navbar-brand d-flex p-2 text-dark ">Home</Link>
          <Link to='/profile' className="navbar-brand d-flex p-2 text-dark ">Profile </Link>
          <Link to='/home' className="navbar-brand d-flex p-2 text-dark my-2">Following<span class="badge badge-light">4</span></Link>
          <Link to='/home' className="navbar-brand d-flex p-2 text-dark ">Followers</Link>


        </div>

        <div className='col-md-8 bg-light post'>
          <div className='border-bottom p-3'>
            <h3>Create a Post</h3>
          </div>

          <form>
            <div className='border-bottom p-4' style={{display:'grid',justifyContent:'center',padding:'5px'}}>
              <textarea placeholder='Whats on your mind ?' onChange={(event) => {setComment(event.target.value)}} className='textAreaa my-3 p-3'></textarea>
              <DisplayImage/>
            </div>
            <div className='p-3 my-2 d-flex justify-content-center'>
              <button type="button" className="btn btn-primary" onClick={()=>{
                console.log(comment);
              }}>Post</button>
            </div>
          </form>

        </div>

        </div>
      </div>
      <Card />
    </>
  )
}

export default Home;