import React from 'react';
import "./HomeImage.css";
import { Link } from "react-router-dom";

const photos = [
    "https://minecraft.wiki/images/Water_Bottle_JE2_BE2.png?acae5",
    "https://minecraft.wiki/images/Written_Book_JE2_BE2.gif?c6510",
    "https://minecraft.wiki/images/Enchanted_Diamond_Sword.gif?f741f",
    "https://minecraft.wiki/images/Enchanted_Golden_Pickaxe.gif?b0b35",
    "https://p.novaskin.me/5893873213.png?class=thumbnail",
    "https://i.imgur.com/RDE5ea1.png",
];

const HomeImage = () => {
    return (
        <div className="homeContainer">
            <div className="dabloonCat">
                <img
                    src="https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945"
                    alt="Dabloons Cat"
                    style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
                />
            </div>

            <div className="homeContent">
                <h1>Greetings, Traveler.</h1>
                <h2 className='welcomeMsg'>Welcome to the Dabloons Marketplace.</h2>
                <h3>
                    Peruse our <Link to="/products">wares</Link> to your heart's content.
                </h3>
                <div className="photoGrid">
                    {photos.map((src, index) => (
                        <div className="photoItem" key={index}>
                        <Link to="/products">
                            <img src={src} alt={`Item ${index + 1}`} />
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        // <div style={{ textAlign: 'center' }}>
        //     <h1>Greetings, Traveler.</h1>
        //     <h2 className='welcomeMsg'>Welcome to the Dabloons Marketplace.</h2>
        //     <img
        //         src="https://preview.redd.it/dabloons-cat-v0-1nujqh9wdlwc1.jpeg?auto=webp&s=7d0ebd2a743325280abc8a5f1c727cc7283ac945"
        //         alt="Dabloons Cat"
        //         style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
        //     />
            
        //     <h3>Peruse our collections to your heart's content.</h3>
            
        //     <div className="photoGrid">
        //         {photos.map((src, index) => (
        //             <div className='photoItem' key={index}>
        //                 <img src={src} alt={'Item ${index + 1}'} />
        //             </div>
        //         ))}
        //     </div>
        //  </div>
    );
  };
  
  export default HomeImage;