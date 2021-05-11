import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';


const Login = () => {
  
  const history = useHistory();


  const loginHome= () => {
    history.push('home')
  }

  const createNewAcc = () => {
    history.push('newaccount')
  }


  return(
      
      <>

      <div className='container-fluid box'>
        <div className='row'>
          <div className='col-md-5 p-3 textArea'>
            <h1 className='text-primary'>Chaos 🔥</h1>
            <h3>Bat bat py Treat 😆</h3>
          </div>
          <div className='col-md-5 bg-light p-3 bg-secondary box shadow'>
          
          <form>
            <div className='row'>
            <TextField id="filled-basic" label="Email" variant="filled" />
            </div>

            <div className='row'>
            <TextField label="Password" variant="filled" />
            </div>

            <div className='andchor'>
              <a href="/forgot"> Forgot Password </a>
            </div>
            

            <div className='row'>
            <button className='btn btn-primary' onClick={loginHome} >Login</button>
            </div>

            <br className='text-dark'></br>    

            <div className='row' id='accbtn'>
              <button className='btn btn-success' onClick={createNewAcc} >Create New Account</button>
            </div>

          </form>


          </div>
        </div>
      </div>
        
    
    </>

  )
}

export default Login;
