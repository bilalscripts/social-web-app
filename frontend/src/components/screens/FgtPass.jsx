import React from 'react';
import Navbar from '../Navbar';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import {InputGroup,FormControl} from "react-bootstrap";

const FgtPass = () => { 
  
 

  const history = useHistory();
  const cancelAction = () => {
    history.push('/login')
  }
  
  return(
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 rounded-3 shadow' style={{backgroundColor:'#23395b'}}>
            <div className='p-3'>
              <h3 className='text-light'>Find Your Account</h3>
            </div>
            <div className='p-4y' style={{display:'grid',justifyContent:'center',padding:'5px'}}>
              <p className='text-light'>Please enter your email address to search for your account.</p>
              <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Password' 

              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => e.target.placeholder = 'Password'}
              onChange = {(e) => {
                
              }}
            />
            
          </InputGroup>
            </div>

            <div className='p-3 float-end'>
              <button type="button" className="btn btn-outline-warning m-2" onClick={cancelAction}>Cancel</button>
              <button type="button" className="btn btn-warning">Search</button>
            </div>
            
          </div>
        </div>
      </div>

    </>
  )
}


export default FgtPass;