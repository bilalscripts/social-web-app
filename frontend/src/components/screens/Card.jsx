import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../App';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';




const Card = (props) => {

  const [liketoggle, setLikeToggle] = useState(props.isLiked);

  const [commText, setCommText] = useState('');

  const { state, dispatch } = useContext(UserContext);

  const deletePost = (postid) => {
    console.log("delete is called")
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => props.updateHome(result))
  }

  const [comment, setComment] = useState(false);



  const makeComment = (text, postId) => {

    console.log('comment added')
    
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json()).then(result => {
      console.log(result)
      props.updateFunc(result);
    }).catch(err => console.log(err))
  }




  console.log(props.likes.indexOf(localStorage.getItem("user")._id))


  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json()).then(result => {
      props.updateFunc(result);
    })
  }


  const unlikePost = (id) => {

    fetch('/unlike', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json()).then(result => props.updateFunc(result));

  }




  const toggleClick = (id) => {
    if (liketoggle) {
      setLikeToggle(false)
      unlikePost(id);

    }
    else {
      setLikeToggle(true);
      likePost(id);
      console.log(props.id);
    }


  }






  return (
    <>
      <div className=' container-fluid posts'>
        <div className='row'>
          <div className='col-md-8 post' style={{backgroundColor:'#23395b'}}>
            <div className='my-3 p-2'>
              <div className='float-end'>
                {(props.postedById === state._id) && <button className='btn btn-transparent' onClick={() => { deletePost(props.id) }}><DeleteRoundedIcon /></button>}
              </div>
              <Link style={{color:'white', fontSize:'35px'}} to={ (props.postedById !== state._id) ?`profile/${props.postedById}` :`profile` } className="btn">{props.postedBy}</Link>
              <p style={{color:'white',fontSize:'25px'}} className='my-3'>{props.body}</p>
            </div>
            <div className='image p-2'>
              <img src={props.photo} alt='thisImage' />
            </div>
            <h6 style={{color:'white',fontSize:'15px'}}>{props.likes.length} people Liked</h6>
            <h6 style={{color:'white',fontSize:'15px'}}>{props.comments.length} people Commented</h6>

            <div className='p-2 d-flex justify-content-center'>
              {props.isLiked ? (<button className='m-2 btn btn-outline-warning' onClick={() => { toggleClick(props.id) }}><ThumbUpIcon /></button>) : (<button className='m-2 btn btn-outline-light' onClick={() => { toggleClick(props.id) }}><ThumbUpAltOutlinedIcon /></button>)}


              {
                (<>
                  
                    <div className='d-flex'>
                    <button className='m-2 btn btn-outline-light' onClick={() => { setComment(!comment)}}><CommentOutlinedIcon /></button>
                      <input type='text' value={commText} style={{ marginLeft: '100px' }} placeholder='comment here' onKeyPress={
                        (e) => {
                          e.key === 'Enter' ? makeComment(commText,props.id) : console.log('enter not pressed')
                        }
                      } onChange={(event) => { setCommText(event.target.value) }} className='form-control' />
                    
                    </div>
                  
                  
                  </>

                )
              }

            </div>
          </div>
        </div>


        {
          comment ? (
            <button className='m-2 btn btn-outline-primary' onClick={() => { setComment(!comment) }}><CommentOutlinedIcon /></button>,
            <div className='row' data-aos="fade-down">
              <div className='col-md-4 post' style={{backgroundColor:'#23395b'}}>
                {
                  props.comments.map(record => {
                    return (
                      <>
                        <h4 className=''>{record.postedBy.name}</h4>
                        <h6 className=''> <span style={{ fontWeight: "500"}} className='border-bottom comment'></span>{record.text}</h6>
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