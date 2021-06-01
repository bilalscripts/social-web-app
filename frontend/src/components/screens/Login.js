import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import validator from 'validator';
import M from 'materialize-css'
import {UserContext} from '../../App';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
const Login = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

 

  const postData = () => {

    if (validator.isEmail(email)) {
      fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password,
          email
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.error) {
            toast.error(data.error,{position:toast.POSITION.TOP_RIGHT})
          }
          else {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            toast.success("Login successfully" ,{position:toast.POSITION.TOP_RIGHT})
            history.push('/');
          }
        }).catch(err => {
          console.log(err)
        })


    }
    else {
      toast.error('all fields mult be fille' , {position:toast.POSITION.TOP_RIGHT});
    }

  }








  const createNewAcc = () => {
    history.push('newaccount')
  }


  return (

    <>

      <div className='container-fluid box'>
        <div className='row'>
          <div className='col-md-5 p-3 textArea'>
            <h1 className='text-primary'>Chaos 🔥</h1>
            <h3>Bat bat py Treat 😆</h3>
          </div>
          <div className='col-md-5 bg-light p-3 bg-secondary box shadow'>

            <div className='row'>
              <h1 className=''>Login</h1>
            </div>

            <div className='row my-5'>
              <TextField id="filled-basic" label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="filled" />
            </div>

            <div className='row'>
              <TextField type="password" label="Password" variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>

            <div className='andchor'>
              <Link to="/forgot"> Forgot Password </Link>
            </div>


            <div className='row'>
              <button className='btn btn-primary' onClick={postData} >Login</button>
            </div>

            <br className='text-dark'></br>

            <div className='row' id='accbtn'>
              <button className='btn btn-success' onClick={createNewAcc} >Create New Account</button>
            </div>




          </div>
        </div>
      </div>


    </>

  )
}

export default Login;
