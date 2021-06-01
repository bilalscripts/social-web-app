import React, { useState, useEffect, useContext } from 'react';
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
import {UserContext} from '../../App';

let count = 4;

const Profile = () => {
  
  const [isOpen,setIsOpen] = useState(false);
  const [mypics,setPics] = useState([])
  const {state, dispatch} = useContext(UserContext);
  

  const [img, setImg] = useState({
    compressedLink : "",
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
    console.log(imageFile.size/1024/1024);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 200,
      useWebWorker: true
    };
    

    if (imageFile.size / 1024 / 1024 <= 10) {
      imageCompression(imageFile, options).then(x => {
        console.log(x.size/1024/1024);
        setImg({
          compressedLink : URL.createObjectURL(x),
          compressedBlob : x,
        });
      })
    } else {
      toast.error('Select Image upto 10 Mb',{position:toast.POSITION.TOP_RIGHT});
      return 0;
    }

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
            <h3 className='m-4'>{state ? state.name : "wait.." }</h3>
            <Link className='m-4 fixed'><Button variant="contained" onClick={togglePopus}>Edit Profile</Button></Link> 
            {isOpen && <PopUpDailoge
              content={<>
                <form>
                <div className='text-center popupitems'>
                
                {
                  img.compressedLink ? (
                    <img src = {img.compressedLink} alt='imgaeHere' height="200px" width="200px" id='openImage'/>
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
            <p className='my-5 p-3'><strong>{mypics ? mypics.length : "wait.." }</strong> posts</p>
            <p className='my-5 p-3'><strong>{state ? state.followers.length : "0"}</strong> followers</p>
            <p className='my-5 p-3'><strong>{state ? state.following.length : "0"}</strong> following</p>
          </div>
            
          <div>
            <p className='m-3'>someBioIfAnny</p>
            <p className='m-3'>someBioIfAnny</p>
          </div>
          
        </div>
        <div className='border-light border-bottom my-4'></div>
      </div>
      <div className='row'>
            {
              
              mypics.map((item)=>{
                
                return <Profilecards url={item.photo} body={item.body}/> ;

              })
            }
            </div>
      
    </div>
    </>
  )
}

export default Profile;