import React, { useState } from 'react';
import Homenav from  './Homenav';
import {Link} from 'react-router-dom'


const Individualprfle = () => {

  const [follow,setFollow] = useState(true)

  const clickedStatus = () => {
    setFollow(!follow);
  }



  return(
    <>
    <Homenav />
    <div className='container-fluid'>
      <div className='row'>
        
        
        <div className='col-md-4 picture'>
          <img style={{borderRadius:'50%'}} src='https://source.unsplash.com/250x250/?water' alt='imaheHere'></img>
        </div>

        <div className='col-md-8 d-block my-5'>
            <div className='d-flex'>
              <h3 className='m-4'>Noumanjaffar</h3>
              <Link className='m-4 fixed'> 
              {
                follow ? <button onClick={clickedStatus} className='btn btn-primary text-center justify-content-center'><strong><h5>Follow</h5></strong></button> : 
                <button onClick={clickedStatus} className='btn btn-primary text-center justify-content-center'><strong><h5>Unfollow</h5></strong></button> 
              }
              </Link> 
            <div/>
          </div>
          <div className='d-flex'>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>postsCount</strong> posts</p>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>followersCount</strong> followers</p>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>followingCount</strong> following</p>
          </div>
            
          <div>
            <p style={{marginLeft:'20px'}}>someBioIfAnny</p>
            <p style={{marginLeft:'20px'}}>someBioIfAnny</p>
          </div>
        </div>
        <div className='border-light border-bottom my-4'></div>
      </div>

      <div className='row'>
        <div className='col-md-4 m-1' style={{width:'250px', height:'200px'}}>
          <img src='https://source.unsplash.com/250x250/?water' alt='thisImage'/>
        </div>
        <div className='col-md-4 m-1' style={{width:'250px', height:'200px'}}>
          <img src='https://source.unsplash.com/250x250/?water' alt='thisImage'/>
        </div>
        <div className='col-md-4 m-1' style={{width:'250px', height:'200px'}}>
          <img src='https://source.unsplash.com/250x250/?water' alt='thisImage'/>
        </div>
      </div>

      

      

    </div>
    
    


    </>
  )
}


export default Individualprfle;
