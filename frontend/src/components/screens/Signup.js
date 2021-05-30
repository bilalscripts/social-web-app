import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Navbar";
import M from 'materialize-css'
import '../../index.css';
import {useHistory} from  'react-router-dom'
import validator from 'validator';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



toast.configure();
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const postData = () => {

    if(validator.isEmail(email))
    {
      fetch('http://localhost:3000/signup',{
        method:"post",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
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
    }
    else{
      toast.error('all fields must be filled',{position:toast.POSITION.TOP_RIGHT})
    }    

  }

  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4 bg-light p-3 shadow my-5 newAccBox'>

            <h2 className='acc p-4 heading'>Create Account</h2>

            

              <div className='row'>
                <TextField id="filled-basic" label="Name" variant="filled"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='row'>
                <TextField id="filled-basic" label="Email" variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='row'>
                <TextField type="password" label="Password" variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>

              <br className='text-dark'></br>

              <div className='row' id='accbtn'>
                <button className='btn btn-success' 
                onClick={postData}>Sign Up</button>
              </div>

            
          </div>
        </div>
      </div>
    </>
  );
}


export default Signup;