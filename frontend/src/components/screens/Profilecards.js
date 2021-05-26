import React from 'react';





const Profilecards = (props) => {
  return(
    <>
      <div className='row'>
        <div className='col-md-4 m-1' style={{width:'400px', height:'400px'}}>
            <img src={props.url} alt='thisImage'/>
        </div>
      </div>
    </>
  )
}

export default Profilecards;