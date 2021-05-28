import React from 'react';





const Profilecards = (props) => {
  return(
    <>
      
        <div className='col-md-1 m-1' style={{width:'250px', height:'200px'}}>
            <img src={props.url} alt='thisImage'/>
        </div>
      
    </>
  )
}

export default Profilecards;