import React from 'react';





const Profilecards = () => {
  return(
    <>
      <div className='row'>
        <div className='col-md-4 m-1' style={{width:'400px', height:'400px'}}>
            <img src='https://source.unsplash.com/collection/190727/400x400' alt='thisImage'/>
        </div>
        <div className='col-md-4 m-1' style={{width:'400px', height:'400px'}}>
            <img src='https://source.unsplash.com/collection/190727/400x400' alt='thisImage'/>
        </div>
        <div className='col-md-4 m-1' style={{width:'400px', height:'400px'}}>
            <img src='https://source.unsplash.com/collection/190727/400x400' alt='thisImage'/>
        </div>
      </div>
    </>
  )
}

export default Profilecards;