import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Homenav from './Homenav';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import PopUpDailoge from './PopUpDailoge';
import Profilecards from './Profilecards';
import Img from '../images/dp.png';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import imageCompression from "browser-image-compression";
import {toast} from 'react-toastify';

let count = 4;

const Profile = () => {
  
  const [isOpen,setIsOpen] = useState(false);
  const [mypics,setPics] = useState([])
  const [img, setImg] = useState({
    compressedLink:
      "",
    originalImage: "",
    originalLink: "",
    uploadImage: false
  })
  
  
  

  useEffect(()=>{

    fetch('/mypost',{
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>res.json())
    .then(result=>setPics(result))
  },[])

  
  const togglePopus = () => {
    setIsOpen(!isOpen);
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
    
    img.originalImage? (
      imageCompression(img.originalImage, options).then(x => {
        const link = URL.createObjectURL(x);
        console.log('image after compression: ',x);
      })
    ) : (
      toast.error('image or title is missing ')
    )
    return 1;
  };






  return(
    <>
    <Homenav />
    <div className='container-fluid'>
      <div className='row'>
        
        
        <div className='col-md-4 picture'>
          <img style={{borderRadius:'50%'}}  src='https://source.unsplash.com/250x250/?water' alt='imaheHere'></img>
        </div>

        <div className='col-md-8 d-block'>
          
          <div className='d-flex'>
            <h3 className='m-4'>Noumanjaffar</h3>
            <Link className='m-4 fixed'><Button variant="contained" onClick={togglePopus}>Edit Profile</Button></Link> 
            {isOpen && <PopUpDailoge
              content={<>
                <form>
                <div className='text-center popupitems'>
                
                {
                  img.originalLink ? (
                    <img src = {img.originalLink} alt='imgaeHere' height="200px" width="200px" id='openImage'/>
                  ) : (
                    <img src = {Img} alt='imgaeHere' height="200px" width="200px" id='openImage'/>
                  )
                
                }

                
                <input accept="image/*" id="icon-button-file"
                  type="file" style={{ display: 'none' }} 
                  onChange={e => selectImage(e)}
                  />
                  <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" 
                  component="span">
                    <PhotoCameraIcon color="primary" style={{ fontSize: 40 }}/>
                  </IconButton>
                </label>
                  
                </div>
                <div className='row'>
                  <TextField id="filled-basic" label="New name" variant="filled" />
                </div>

                <div className='row'>
                  <TextField id="filled-basic" label="New Email" variant="filled" />
                </div>

                <div className='row'>
                  <TextField label="New Password" variant="filled" />
                </div>
              
                <br className='text-dark'></br>    

                <div className='row' id='accbtn'>
                  <button className='btn btn-success' >Edit</button>
                </div>
                </form>
              </>}
              handleClose={togglePopus}
            />}
          </div>

          <div className='d-flex'>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>{count}</strong> posts</p>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>{count}</strong> followers</p>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>{count}</strong> following</p>
          </div>
            
          <div>
            <p style={{marginLeft:'20px'}}>someBioIfAnny</p>
            <p style={{marginLeft:'20px'}}>someBioIfAnny</p>
          </div>
          
        </div>
        <div className='border-light border-bottom my-4'></div>
      </div>
      <div className='row'>
            {
              
              mypics.map((item)=>{
                
                return <Profilecards url={item.photo}/> ;

              })
            }
            </div>
      
    </div>
    </>
  )
}

export default Profile;