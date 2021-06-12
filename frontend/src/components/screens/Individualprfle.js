import React, { useState, useEffect, useContext } from 'react';
import Homenav from  './Homenav';
import {Link, useParams} from 'react-router-dom'
import {UserContext} from '../../App';


const Individualprfle = () => {

  const {userid} = useParams();
  const [userProfile,setUserProfile] = useState(null)
  const {state, dispatch} = useContext(UserContext);
  console.log(userid)
  
  
  const [follow,setFollow] = useState(state ? !state.following.includes(userid) : true)


  


  useEffect(()=>{

    fetch(`/user/${userid}`,{
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>res.json())
    .then(result=>setUserProfile(result)
    )
  },[])


  const followUser = () =>{
    fetch('/follow',{
      method:"put",
      headers:{
        "content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followid:userid,

      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      dispatch({type:"UPDATE",payload:{
        following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setUserProfile((preVal)=>{
          return {
            ...preVal,
            user:{
              ...preVal.user,
              followers: [...preVal.user.followers,data._id]
            }
          }
        })
        setFollow(!follow)
    })
  }





  const unfollowUser = () =>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        "content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowid:userid,

      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      dispatch({type:"UPDATE",payload:{
        following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        
        setUserProfile((preVal)=>{
          const newFollower = preVal.user.followers.filter(item=>item !==data._id)
          return {
            ...preVal,
            user:{
              ...preVal.user,
              followers: newFollower
            }
          }
        })
        setFollow(!follow)
    })
  }



  

  return(
    <>
    <Homenav />
    {
      userProfile ? 
      <>
      
    <div className='container-fluid'>
      <div className='row'>
        
        
        <div className='col-md-4 picture'>
          <img height='300px' width='300px' src={userProfile.user.pic} alt='imaheHere'></img>
        </div>

        <div className='col-md-8 d-block my-5'>
            <div className='d-flex'>
              <h3 className='m-4'>{userProfile.user.name}</h3>
              <h3 className='m-4'>{userProfile.user.email}</h3>
              <Link className='m-4 fixed'> 
              {
                follow ? <button onClick={()=>{
                  followUser()
                }
                } className='btn btn-outline-warning text-center justify-content-center'><strong><h5>Follow</h5></strong></button> : 
                
                
                <button onClick={()=>{
                  unfollowUser()
                }} className='btn btn-warning text-center justify-content-center'><strong><h5>Unfollow</h5></strong></button> 
              }
              </Link> 
            <div/>
          </div>
          <div className='d-flex'>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>{userProfile.posts.length}</strong> posts</p>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>{userProfile.user.followers.length}</strong> followers</p>
            <p style={{marginLeft:'50px',marginTop:'10px'}}><strong>{userProfile.user.following.length}</strong> following</p>
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
              <div className='col-md-2 m-3 ' style={{width:'320px', height:'400px', borderRadius:'10px',backgroundColor:'#23395b'}}>
            <div className='text-center'>
            <img src={item.photo} alt='thisImage' className='my-3' width='250px' height='250px'/>
            </div>
            
            <p className='paragraph'>{item.body}</p>
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
