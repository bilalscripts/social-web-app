import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Homenav from './Homenav';
import M from 'materialize-css';
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();




const Createpost = () => {

  const [body, setBody] = useState('');
  const [image, setImage] = useState();
  const [url, setUrl] = useState('');
  const history = useHistory();
  const [img, setImg] = useState({
    compressedLink:
      "",
    originalImage: "",
    originalLink: "",
    uploadImage: false
  })


  const postDetails = (x) => {
    
    const data = new FormData()
    data.append("file", x)
    data.append("upload_preset", "social-web-app")
    data.append("cloud_name", "doidlafka")

    fetch("https://api.cloudinary.com/v1_1/doidlafka/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).then((data) => {
      console.log(data.url)
// sending data to the database
      fetch('/createpost', {
        method: "post",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          photo: data.url
        })
      }).then(res => res.json()).then(data => {
        if (data.error) {
          toast.warn(data.error , {position:toast.POSITION.TOP_RIGHT})
        }
        else {

          history.push('/');
        }
      }).catch((err) => {
        console.log(err)
      });


    }).catch(err => console.log(err))

    

  }


  const selectImage = e => {
    const imageFile = e.target.files[0];
    //console.log(imageFile);
    if (imageFile.size / 1024 / 1024 <= 50) {
      setImg({
        originalLink: URL.createObjectURL(imageFile),
        originalImage: imageFile,
        outputFileName: imageFile.name,
        uploadImage: true
      });
    } else {
      alert('Select Image upto 5 Mb');
      return 0;
    }

  };


  const compressUpload = () => {

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 200,
      useWebWorker: true
    };
    imageCompression(img.originalImage, options).then(x => {
      const link = URL.createObjectURL(x);
      postDetails(x)
      console.log('image after compression: ',x);
      setImg({
        compressedLink: link
      });


    });
    //console.log(output);

    setImg({ clicked: true });
    return 1;
  };


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
                <input
                  type="file"
                  accept="image/*"
                  className="btn btn-secondary"
                  onChange={e => selectImage(e)}
                />
                {
                  img.originalLink ? (
                    <div className="col-md-4 offset-3 my-4">
                      <Card.Img variant="top" src={img.originalLink} style={{ width: '300px', height: '300px'}}></Card.Img>
                    </div>) :
                    (
                      <></>
                    )
                }
              </div>


            </div>
            <div className='p-3 my-2 d-flex justify-content-center'>
              <button type="button" className="btn btn-primary" onClick={() => {
                compressUpload();
              }}>Post</button>
            </div>


          </div>

        </div>
      </div>

    </>
  )
}


export default Createpost;