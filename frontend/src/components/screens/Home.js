import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom';
import Homenav from './Homenav';
import {UserContext} from '../../App';
import {InputGroup,FormControl} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';



const Home = (props) => {
  const history = useHistory();
  const [data,setData] = useState([]);
  const {state,dispatch} = React.useContext(UserContext)
  const [user,setUser] = useState('')
  const [searching, setSearching] = useState([]);
  const [searchBar, setSearchBar] = useState(false);

    useEffect(()=>{


      

      fetch('/allpost',{
        method:"get",
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt"),
        }
      }).then(res=>res.json()).then(result=>{
        setData(result.posts)
      });
    },[])
    
    const updateHome = (result) =>{
      const newData = data.filter(item=>{
        return item._id !== result._id;
      })
      setData(newData);
    }

    const updateData = (result) =>{
      const newData = data.map((item)=>{
        if(item._id===result._id)
        {
          return result;
        }
        else{
          return item;
        }
      })
      setData(newData);
    }

const searched = (query) =>{
  setUser(query)

  fetch('/search-users',{
    method:'post',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      query,
    })
  }).then(res=>res.json()).then(results=>setSearching(results.user))
}







  const createPost = () => {
    history.push('/create')
  }
  return (
    <>
    <div className='container-fluid'>
        <Homenav />
        
        <div className='row'>

        <div className='col-md-6 post' style={{backgroundColor:'#23395b'}}>
         
          <div>
          <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Search' 
              
              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => {
               
                e.target.placeholder = 'Search'
              }}
              onChange = {(e) => {
                
                searched(e.target.value)
                setSearchBar(true);
              }}

              />
              
            <Button className='text-light' onClick={searched} variant="primary"><SearchIcon/></Button>
          </InputGroup>

          {
            searchBar ? (
              <div className='d-grid text-light rounded-3' style={{background:'#161925'}} data-aos="fade-down">
              
                {
                  searching.map((item) => {
                    return <h5><Link to={`profile/${item._id}`}>{item.name}</Link></h5>
                  })
                }
                
              </div>
            ) : (
              <>
              </>
            )
          }
            
          </div>
          <div className='p-3 text-center'>
            <button onClick={createPost} className='btn btn-warning' style={{width:'200px'}}>Create Post </button>
          </div>
        </div>

        </div>
    </div>

    {
      data.length===0? ( <div className="d-flex justify-content-center mt-5" > 
     <div className="spinner-grow text-warning" style={{width: "10rem", height: "10rem"}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>) :
      data.map(item=>{
        return (
          <Card body={item.body} postedBy={item.postedBy.name} photo={item.photo} key={item._id} 
          id={item._id}  likes={item.likes} isLiked={item.likes.includes(state._id)} 
          comments={item.comments} postedById={item.postedBy._id} updateFunc={updateData}
          updateHome={updateHome}
          />
        )
      })
    }
      

    </>
  )
}

export default Home;