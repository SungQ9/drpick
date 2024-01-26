import React, { useState, useEffect } from 'react';

import img1 from '../../img/panel-chat.png';
import img2 from '../../img/panel-pill.png';
import img3 from '../../img/panel-hospital.png';

const Carousel = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <td
      id='panel'
      className='slider-container'
      style={{
        width: '600px',
        height: '200px',
        overflow: 'hidden',
        padding: '0px',
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          style={{
            width: '600px',
            height: '200px',
            display: currentIndex === index ? 'block' : 'none',
            objectFit: 'cover',
          }}
        />
      ))}
    </td>
  );
};

export default Carousel;
