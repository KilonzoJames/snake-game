import React, { useRef, useEffect}  from 'react'
import RandomDiv from './RandomDiv';
import Hunter from './Hunter';

function Board() {
  const divRef = useRef(null);  

  // const [isMoving, setIsMoving] = useState(false);

  // const startMoving = () => {
  //   setIsMoving(true);
  // };

  // const stopMoving = () => {
  //   setIsMoving(false);
  // };

  function moveDodger(event){
    const dodger = divRef.current;
    // const leftspace= dodger.style.left.replace('px','')
    const left= parseInt(dodger.style.left || '0', 10);
    const top=parseInt(dodger.style.top || '0', 10);

    if(event.key==='ArrowRight' && left<window.innerWidth-dodger.offsetWidth){
        dodger.style.left=`${left+5}px`   
    }else if(event.key==='ArrowLeft' && left>0){
        dodger.style.left=`${left-5}px`
    }else if(event.key==='ArrowDown' && top<window.innerWidth- dodger.offsetHeight){
      dodger.style.top=`${top+5}px`
    }else if(event.key==='ArrowUp' && top>0){
      dodger.style.top=`${top-5}px`
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', moveDodger);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', moveDodger);
    };
  }, []);

  return (
    <div 
    className='board'
    onKeyDown={moveDodger}>
     <Hunter ref={divRef}/>
     {/* <RandomDiv/> */}
    </div>
  )
}

export default Board
