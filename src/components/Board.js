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
    style={{ position: 'relative', width: '1000px', height: '900px'}}
    className='bg-black d-flex overflow-hidden text-white'
    id='board'
    tabIndex="0"
    onKeyDown={moveDodger}>
     <Hunter ref={divRef}/>
     <RandomDiv/>
    </div>
  )
}

export default Board
