import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Homenav from './Homenav';



const Createpost = () => {
  
  const [comment, setComment] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  return(
    <>
      <div className='container-fluid'>
        <Homenav />
        <div className='row'>

        <div className='col-md-3 bg-light post sidebar'>
          
          <Link to='/' className="navbar-brand d-flex p-2 text-dark ">Home</Link>
          <Link to='/profile' className="navbar-brand d-flex p-2 text-dark ">Profile </Link>
          <Link to='/' className="navbar-brand d-flex p-2 text-dark my-2">Following<span class="badge badge-light">4</span></Link>
          <Link to='/' className="navbar-brand d-flex p-2 text-dark ">Followers</Link>


        </div>

        <div className='col-md-8 bg-light post'>
          <div className='border-bottom p-3'>
            <h3>Create a Post</h3>
          </div>

          
            <div className='border-bottom p-4' style={{display:'grid',justifyContent:'center',padding:'5px'}}>
              <textarea placeholder='Whats on your mind ?' onChange={(event) => {setBody(event.target.value)}} value={body} className='textAreaa my-3 p-3'></textarea>
              
              <div>
            <h4 className='m-2 mb-3'>Select Image</h4>
            <input type="file" name="myImage" onChange={(e)=>{setImage(e.target.files)}} />
          </div>


            </div>
            <div className='p-3 my-2 d-flex justify-content-center'>
              <button type="button" className="btn btn-primary" onClick={()=>{
                console.log(comment);
              }}>Post</button>
            </div>
          

        </div>

        </div>
      </div>

    </>
  )
}


export default Createpost;