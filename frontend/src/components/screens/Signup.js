import React from 'react';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Navbar";




const Signup = () => {
  

  return(
    <>
      <Navbar/>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4 bg-light p-3 shadow my-5 newAccBox'>

          <h2 className='acc p-4 heading'>Create Account</h2>

          <form>

            <div className='row'>
              <TextField id="filled-basic" label="Name" variant="filled" />
            </div>

            <div className='row'>
              <TextField id="filled-basic" label="Email" variant="filled" />
            </div>

            <div className='row'>
              <TextField label="Password" variant="filled" />
            </div>
          
            <br className='text-dark'></br>    

            <div className='row' id='accbtn'>
              <button className='btn btn-success' >Sign Up</button>
            </div>

          </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default Signup;