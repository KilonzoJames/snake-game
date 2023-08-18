import React,{useState} from 'react'

function RandomDiv() {
const [isVisible, setIsVisible] = useState(true);
const [position, setPosition] = useState({ top: 0, left: 0  });

const handleClick = () => {
    if (isVisible) {
      const randomTop = Math.floor(Math.random() * window.innerHeight);
      const randomLeft = Math.floor(Math.random() * window.innerWidth);
      setPosition({ top: randomTop, left: randomLeft });
    }
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible && (
        <div
          className="point"
          onClick={handleClick}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'green',
            // position: 'fixed', // Add this to ensure the positioning works correctly
            top: position.top, // Use the 'top' property
            left: position.left, // Use the 'left' property
            cursor: 'pointer', // Add a pointer cursor for better UX
          }}
        ></div>
      )}
    </div>
  )
}

export default RandomDiv
