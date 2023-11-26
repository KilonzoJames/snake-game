import React, { useState } from "react";

function RandomDiv() {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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
          onClick={handleClick}
          className="bg-info"
          style={{
            width: "40px",
            height: "40px",
            top: "300px",
            left: "200px",
            cursor: "pointer",
          }}
        ></div>
      )}
    </div>
  );
}

export default RandomDiv;
