import React, { useState, useEffect } from 'react';
import Homenav from  './Homenav';
import {Link, useParams} from 'react-router-dom'


const Individualprfle = () => {

  const [follow,setFollow] = useState(true)
  const {userid} = useParams();
  const [userProfile,setUserProfile] = useState(null)
  console.log(userid)

  const clickedStatus = () => {
    setFollow(!follow);
  }


  useEffect(()=>{

    fetch(`/user/${userid}`,{
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>res.json())
    .then(result=>setUserProfile(result))
  },[])









  



  return(
    <>
    <Homenav />
    {
      userProfile ? 
      <>
      
    <div className='container-fluid'>
      <div className='row'>
        
        
        <div className='col-md-4 picture'>
          <img style={{borderRadius:'50%'}} src='https://source.unsplash.com/250x250/?water' alt='imaheHere'></img>
        </div>

        <div className='col-md-8 d-block my-5'>
            <div className='d-flex'>
              <h3 className='m-4'>{userProfile.user.name}</h3>
              <h3 className='m-4'>{userProfile.user.email}</h3>
              <Link className='m-4 fixed'> 
              {
                follow ? <button onClick={clickedStatus} className='btn btn-primary text-center justify-content-center'><strong><h5>Follow</h5></strong></button> : 
                <button onClick={clickedStatus} className='btn btn-primary text-center justify-content-center'><strong><h5>Unfollow</h5></strong></button> 
              }
              </Link> 
            <div/>
          </div>
          <div className='d-flex'>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>postsCount</strong> posts:{userProfile.posts.length}</p>
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
        
        {
          userProfile.posts.map(item=>{
            return (
              <div className='col-md-4 m-1' style={{width:'250px', height:'200px'}}>
               <img src={item.photo} key={item._id} alt='thisImage'/>
             </div>
            )
          })
        }
      </div>
    </div>
      </>
      
      : <h1>Loading</h1>}
    
    
    


    </>
  )
}


export default Individualprfle;
