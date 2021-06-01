import React from 'react';
import Card from "react-bootstrap/Card";





const Profilecards = (props) => {
  return(
    
      // <Card style={{ width: '18rem',margin:'10px'}}>
      //   <Card.Img variant="top" src={props.url} style={{marginTop:'10px'}} />
      //     <Card.Body>
      //     <Card.Text>
      //       {props.body}
      //     </Card.Text>
      //   </Card.Body>
      // </Card>
    
        <div className='col-md-2 m-3 ' style={{width:'320px', height:'400px', borderRadius:'10px',backgroundColor:'#23395b'}}>
            <div className='text-center'>
            <img src={props.url} alt='thisImage' className='my-3' width='250px' height='250px'/>
            </div>
            
            <p className='paragraph'>{props.body}</p>
        </div> 
  )
}

export default Profilecards;