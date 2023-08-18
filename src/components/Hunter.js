import React,{forwardRef} from 'react'

const Hunter = forwardRef((props, ref) => {

  return (
    <div    
     ref={ref} 
     className="moving-div"
     style={{ 
      position: 'absolute',
      width: '80px', 
      height: '30px', 
      backgroundColor: 'red',
      bottom: '0',
      left: '0',
    }}
     >
    </div>       
  )
})

export default Hunter
