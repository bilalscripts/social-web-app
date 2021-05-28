import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SendIcon from '@material-ui/icons/Send';
import 'bootstrap/dist/css/bootstrap.min.css';
import Threedotmenu from './Threedotmenu';


const Card = (props) => {

  const [liketoggle,setLikeToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [commText,setCommText] = useState('');


  const toggleClick = () => {
    setLikeToggle(!liketoggle)
  }

  const toggleComtClick = () => {
    setCommentToggle(!commentToggle);
  }

  


  return(
    <>
      <div className=' container-fluid posts'>
        <div className='row'>
          <div className='col-md-8 bg-light post'>
            <div className='border-bottom my-3 p-2'>
              <div className='float-end'> 
                <Threedotmenu />
              </div>
              <Link to='/indiv' className="btn">{props.postedBy}</Link>
              <p className='my-3'>{props.body}</p>
            </div>
            <div className='image border-bottom p-2'>
              <img src={props.photo} alt='thisImage'/>
            </div>

            <div className='p-2 d-flex justify-content-center'>
              {liketoggle ? (<button className='m-2 btn btn-outline-primary' onClick={toggleClick}><ThumbUpIcon/></button>) : (<button className='m-2 btn btn-outline-secondary' onClick={toggleClick}><ThumbUpAltOutlinedIcon/></button>) }
              

              {commentToggle ? 
              (
                <form>
                  <div className='d-flex'> 
                    <button className='m-2 btn btn-outline-primary' onClick={toggleComtClick}><CommentOutlinedIcon/></button>
                    <input type='text' style={{marginLeft:'100px'}} placeholder='comment here' onChange={(event)=>{setCommText(event.target.value)}} className='form-control'/>
                    <button className='m-2 btn btn-outline-primary' onClick={()=>{
                      console.log(commText);
                    }}><SendIcon/></button>
                  </div>
                </form>
              ) : 
              (
                <div> 
                  <button className=' m-2 btn btn-outline-primary' onClick={toggleComtClick}><CommentOutlinedIcon/></button> 
                </div>
              )
              }
                
              </div>
            </div>

          </div>
        </div>

    </>
  );
}

export default Card;