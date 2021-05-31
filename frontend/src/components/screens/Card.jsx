import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SendIcon from '@material-ui/icons/Send';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContext} from '../../App';




const Card = (props) => {

  const [liketoggle, setLikeToggle] = useState(props.isLiked);
  
  const [commText, setCommText] = useState('');

  const {state, dispatch} = useContext(UserContext);

  const deletePost = (postid) =>{
    fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>console.log(result))
  }

  const [comment, setComment] = useState(false);



  const makeComment = (text, postId) =>{
    fetch('/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId,
        text
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result)
      props.updateFunc(result);
    }).catch(err=>console.log(err))
  }
  



  console.log(props.likes.indexOf(localStorage.getItem("user")._id))
 
  
  const likePost = (id) =>{
    fetch('/like',{
      method:'put',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id,
      })
    }).then(res=>res.json()).then(result=>{
      props.updateFunc(result);
    })
  }


  const unlikePost = (id) =>{

    fetch('/unlike',{
      method:'put',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id,
      })
    }).then(res=>res.json()).then(result=> props.updateFunc(result));

  }




  const toggleClick = (id) => {
    if(liketoggle){
      setLikeToggle(false)
      unlikePost(id);

    }
    else{
      setLikeToggle(true);
      likePost(id);
      console.log(props.id);
    }

    
  }

 




  return (
    <>
      <div className=' container-fluid posts'>
        <div className='row'>
          <div className='col-md-8 bg-light post'>
            <div className='border-bottom my-3 p-2'>
              <div className='float-end'>
                {(props.postedById === state._id) && <button onClick={deletePost(props.id)}>delete</button> }
              </div>
              <Link to='/indiv' className="btn">{props.postedBy}</Link>
              <p className='my-3'>{props.body}</p>
            </div>
            <div className='image border-bottom p-2'>
              <img src={props.photo} alt='thisImage' />
            </div>
            <h6>Likes: {props.likes.length}</h6>

            <div className='p-2 d-flex justify-content-center'>
              {props.isLiked ? (<button className='m-2 btn btn-outline-primary' onClick={()=>{toggleClick(props.id)}}><ThumbUpIcon /></button>) : (<button className='m-2 btn btn-outline-secondary' onClick={()=>{toggleClick(props.id)}}><ThumbUpAltOutlinedIcon /></button>)}


              {
                (
                  <form onSubmit={(e)=>{e.preventDefault()
                  makeComment(e.target[0].value,props.id)
                  
                  }}>
                    <div className='d-flex'>
                    <button className='m-2 btn btn-outline-primary' onClick={() => {setComment(!comment) }}><CommentOutlinedIcon /></button>
                      <input type='text' style={{ marginLeft: '100px' }} placeholder='comment here' onChange={(event) => { setCommText(event.target.value) }} className='form-control' />
                      
                    </div>
                  </form>
                )
              }
              
            </div>
          </div>
        </div>


                      {
                        comment ? (
                          <button className='m-2 btn btn-outline-primary' onClick={() => {setComment(!comment) }}><CommentOutlinedIcon /></button>,
                          <div className='row' data-aos="fade-down">
                            <div className='col-md-4 bg-light post'>
                                {
                                  props.comments.map(record=>{
                                    return (
                                      <>
                                        <h4>personNameHere</h4>
                                        <h6> <span style={{fontWeight:"500",width:''}} className='border-bottom comment'>{record.postedBy.name}</span>{record.text}</h6>
                                      </>
                                    )
                                    })
                                }
                          </div>
                          </div>
                        ) : (
                          <>
                          </>
                        ) 
                      }

      </div>

            

    </>
  );
}

export default Card;