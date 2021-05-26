import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Homenav from './Homenav';
import M from 'materialize-css';



const Createpost = () => {

  
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const history = useHistory();


  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "social-web-app")
    data.append("cloud_name", "doidlafka")

    fetch("https://api.cloudinary.com/v1_1/doidlafka/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).then((data) =>{ 
      
      setUrl(data.url)
      console.log(data.url)
      console.log(body)
      postToDb();
    }).catch(err => console.log(err))

  }

  const postToDb = ()=>{

    fetch('/createpost',{
      method:"post",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt"),
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        body,
        photo:url
      })
    }).then(res=>res.json()).then(data=>{
      if(data.error){
        M.toast({html: data.error})
      }
      else{
  
        history.push('/');
      }
    }).catch((err)=>{
      console.log(err)
    });
  
  }



  return (
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


            <div className='border-bottom p-4' style={{ display: 'grid', justifyContent: 'center', padding: '5px' }}>
              <textarea placeholder='Whats on your mind ?' onChange={(event) => { setBody(event.target.value) }} value={body} className='textAreaa my-3 p-3'></textarea>

              <div>
                <h4 className='m-2 mb-3'>Select Image</h4>
                <input type="file" name="myImage" onChange={(e) => { setImage(e.target.files[0]) }} />
              </div>


            </div>
            <div className='p-3 my-2 d-flex justify-content-center'>
              <button type="button" className="btn btn-primary" onClick={postDetails}>Post</button>
            </div>


          </div>

        </div>
      </div>

    </>
  )
}


export default Createpost;