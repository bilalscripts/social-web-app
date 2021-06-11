import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Navbar";
import '../../index.css';
import {useHistory} from  'react-router-dom'
import validator from 'validator';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Img from '../images/dp.png';
import imageCompression from "browser-image-compression";
import {InputGroup,FormControl} from "react-bootstrap";


toast.configure();
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState({
    compressedLink : "",
  })
  const [disbale,setDisable] = useState(false);

  const postData = () => {

    if(validator.isEmail(email))
    {
    setDisable(!disbale);
    const data = new FormData()
    data.append("file", img.compressedBlob)
    data.append("upload_preset", "social-web-app")
    data.append("cloud_name", "doidlafka")

    fetch("https://api.cloudinary.com/v1_1/doidlafka/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).then((data) => {


      console.log(data.url)
    // sending data to the database
    fetch('/signup',{
      method:"post",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        pic:data.url
      })
    }).then(res=>res.json()).then(data=>{
      if(data.error){
        toast.error(data.error,{position:toast.POSITION.TOP_RIGHT})
      }
      else{
        history.push('/login');
      }
    }).catch((err)=>{
      console.log(err)
    });

    }).catch(err => console.log(err))
    }
    else{
      toast.error('all fields mult be fille' , {position:toast.POSITION.TOP_RIGHT});
      setDisable(disbale);
    }  

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


  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 p-3 shadow newAccBox' style={{backgroundColor:'#23395b'}}>

            <h2 className='acc p-4 heading text-light'>Create Account</h2>

            <div className='text-center popupitems'>
                
                {
                  img.compressedLink ? (
                    <img src = {img.compressedLink} alt='compressed' height="400px" width="400px" id='openImage'/>
                  ) : (
                    <img src = {Img} alt='imgaeHere' height="300px" width="300px" id='openImage'/>
                  )
                
                }

                
                <input accept="image/*" id="icon-button-file"
                  type="file" style={{ display: 'none' }} 
                  onChange={e => selectImage(e)}
                  />
                  <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" 
                  component="span">
                    <PhotoCameraIcon className='btn-outline-light' style={{ fontSize: 40 }}/>
                  </IconButton>
                </label>

              </div>


              <div className='row'>
              <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Name' 

              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => e.target.placeholder = 'Name'}
              onChange = {(e) => {
                setName(e.target.value)
              }}
            />
            
          </InputGroup>
                
            </div>

              <div className='row'>
              <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Email'
              type='email' 

              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => e.target.placeholder = 'Email'}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </InputGroup>
                
              </div>

              <div className='row'>
              <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Password' 
              type='password'

              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => e.target.placeholder = 'Password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </InputGroup>
              </div>

              <br className='text-dark'></br>

              <div className='row' id='accbtn'>
                <button className='btn btn-warning' 
                onClick={postData} disabled={disbale}>Sign Up</button>
              </div>

            
          </div>
        </div>
      </div>
    </>
  );
}


export default Signup;