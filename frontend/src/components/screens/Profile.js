import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Homenav from './Homenav';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import PopUpDailoge from './PopUpDailoge';
import Profilecards from './Profilecards';


let count = 4;


const Profile = () => {

  const [isOpen,setIsOpen] = useState(false);
  const [mypics,setPics] = useState([])

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



  return(
    <>
    <Homenav />
    <div className='container-fluid'>
      <div className='row'>
        
        
        <div className='col-md-4 picture'>
          <img style={{borderRadius:'50%'}} src='https://source.unsplash.com/250x250/?water' alt='imaheHere'></img>
        </div>

        <div className='col-md-8 d-block'>
          
          <div className='d-flex'>
            <h3 className='m-4'>Noumanjaffar</h3>
            <Link className='m-4 fixed'><Button variant="contained" onClick={togglePopus}>Edit Profile</Button></Link> 
            {isOpen && <PopUpDailoge
              content={<>
                <form>
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
      </div>
      <div className='row'>
            {
              
              mypics.map((item)=>{
                
                return  <Profilecards url={item.photo}/> ;

              })
            }
            </div>
      
    </div>
    </>
  )
}

export default Profile;