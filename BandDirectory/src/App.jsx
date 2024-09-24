import React, { useEffect, useState } from 'react';
import './App.css'; // Assuming you have some basic styles for the cards

// Functional component for individual band
function Bands({ band }) {
  return (
    <div className="card">
      <img src={band.logo} alt={band.name} />
      <h2>{band.name}</h2>
      <p>{band.genre}</p>
      <div className="social_links">
        {Object.entries(band.social_media).map(([platform, url], index) => (
          <div className='social_link' key={index}>
            <a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App component
const App = () => {

  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const response = await fetch("/bands.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBands(data);
      } catch (error) {
        console.error('Error fetching bands:', error);
      }
    };

    fetchBands();
  }, []);

  return (
    
    <div className="App">
      <div className='Background'></div>
      <div className='Title'>
        <h1> Band Directory </h1>
      </div>
      <div className='cards_container'>
        {bands.length > 0 ? (
          bands.map((band) => (
            <Bands key={band.id} band={band} />
          ))
        ) : (
          <p>Loading bands...</p> // Optional loading message
        )}
      </div>
    </div>
  );
};

export default App;
