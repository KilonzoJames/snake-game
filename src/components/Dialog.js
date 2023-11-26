import React from 'react'

function Dialog() {
  return (
    <div className='wrapper'>
        <div className='dialog'>
            <div className='content'>
                <p>Do you want to continue?</p>
            </div>
            <div className='buttons'>
                <button type='button' className='confirm'>Confirm</button>
                <button type='button' className='cancel'>Cancel</button>
            </div>
            
        </div>
      
    </div>
  )
}

export default Dialog
