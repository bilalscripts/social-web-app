import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import validator from 'validator';
import {UserContext} from '../../App';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {InputGroup,FormControl} from "react-bootstrap";

toast.configure();
const Login = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [disbale,setDisable] = useState(false);

 

  const postData = () => {
    
    if (validator.isEmail(email)) {
      setDisable(!disbale);
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
      setDisable(disbale);
    }

  }








  const createNewAcc = () => {
    history.push('newaccount')
  }


  return (

    <>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 p-3 textArea'>
            <h1 className='text-white'>Chaos 🔥</h1>
            <h3 className='text-white'>Bat bat py Treat 😆</h3>
          </div>
          <div className='col-md-5 p-3 box shadow' style={{height:'650px'}}>

            <div className='row'>
              <h1 className='text-light'>Login</h1>
            </div>

            <div className='row my-5'>
            <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Email' 

              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => e.target.placeholder = 'Email'}
              onChange = {(e) => {
                setEmail(e.target.value)
              }}
            />
            
          </InputGroup>
            </div>

            <div className='row'>
            <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Password' 
              type='password'
              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => e.target.placeholder = 'Password'}
              onChange = {(e) => {
                setPassword(e.target.value)
              }}
            />
            
          </InputGroup>
              
            </div>

            <div>
              <Link className=' andchor text-muted' to="/forgot"> Forgot Password </Link>
            </div>


            <div className='row'>
              <button className='btn btn-warning' disabled={disbale} onClick={postData} >Login</button>
            </div>

            <br className='text-dark'></br>

            <div className='row' id='accbtn'>
              <button className=' btn btn-outline-warning' onClick={createNewAcc} >Create New Account</button>
            </div>
          </div>
        </div>
      </div>


    </>

  )
}

export default Login;
