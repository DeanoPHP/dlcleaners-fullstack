import React, { useState } from 'react';

function CircleComponent({ title, image, borderColor, content }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="therapy-type">
      <div
        className={`circle ${isHovered ? 'hover-effect' : ''}`}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{
          backgroundImage: `url(${image})`, 
          backgroundSize: isHovered ? '150% 150%' : '100% 100%',
          backgroundPosition: isHovered ? 'center center' : 'botton center',
          border: `4px solid ${borderColor}`
        }}>
        {/* <img src={image} alt="Therapy" /> */}
      </div>
      <h4 className="text-center mt-2">{title}</h4>
      <p className="text-center" style={{color: 'gray', fontWeight: '400', fontSize: '18px'}}>
        {content}
      </p>
    </div>
  );
}

export default CircleComponent;
