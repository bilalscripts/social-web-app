import React from 'react';
import Navbar from '../Navbar';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';

const FgtPass = () => { 
  
 

  const history = useHistory();
  const cancelAction = () => {
    history.push('/')
  }
  
  return(
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 bg-light rounded-3 shadow'>
            <div className='border-bottom p-3'>
              <h3>Find Your Account</h3>
            </div>
            <div className='border-bottom p-4y' style={{display:'grid',justifyContent:'center',padding:'5px'}}>
              <p className='text-muted'>Please enter your email address to search for your account.</p>
              <TextField id="filled-basic" label="Email" variant="filled" />
            </div>

            <div className='border-bottom p-3 float-end'>
              <button type="button" className="btn btn-secondary m-2" onClick={cancelAction}>Cancel</button>
              <button type="button" className="btn btn-primary">Search</button>
            </div>
            
          </div>
        </div>
      </div>

    </>
  )
}


export default FgtPass;