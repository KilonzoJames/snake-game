import React,{useState, useRef, useEffect} from 'react'
import backgroundMusic from '../assets/satisfying_melody.mp3'

function Header() {
  const [count, setCount] = useState(0)
  const audioRef = useRef(null); // Create a ref for the audio element
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleMusic = () => {
    if (!musicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setMusicPlaying(!musicPlaying);
  };

  useEffect(() => {
    if (musicPlaying) {
      audioRef.current.play();
    } else {
      // audioRef.current.pause();
    }
  }, [musicPlaying]);

  const handleClick = () => {
    setCount(()=>count + 10)
  }
  return (
    <>
      <div className='text-center text-info fw-bolder fs-2'>
          Rock Dodger
      </div>
      <div 
      className='position-absolute text-white bg-info p-2  top-0 fw-bolder fs-2'
      onClick={toggleMusic}
      >
        {musicPlaying ? 'Pause Music' : 'Play Music'}
      </div>
      <audio ref={audioRef} src={backgroundMusic} loop />
      <div 
      className='position-absolute text-danger bg-info p-2  top-0 end-0 fw-bolder fs-2'
      onClick={handleClick}
      >Game Points: {count}
      </div>
    </>
  )
}

export default Header
