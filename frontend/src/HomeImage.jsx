import React from 'react';
import "./HomeImage.css";

const HomeImage = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Greetings, Traveler.</h1>
            <h2>Peruse as you wish.</h2>
            <img
                src="https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945"
                alt="Dabloons Cat"
                style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
            />
         </div>
    );
  };
  
  export default HomeImage;