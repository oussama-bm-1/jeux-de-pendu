import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';
import image5 from './images/image5.png';
import image6 from './images/image6.png';
import image7 from './images/image7.png';
import image8 from './images/image8.png';
import image9 from './images/image9.png';
import image10 from './images/image10.png';

const Hangman = () => {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [tries, setTries] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const maxTries = 9;

  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

  const getRandomWord = useCallback(() => {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'laptop', 'code', 'tv', 'ship', 'chair', 'table', 'zebra', 'elephant', 'giraffe', 'lion', 'tiger', 'penguin', 'parrot', 'ostrich', 'dolphin', 'whale', 'mountain', 'forest', 'ocean', 'desert', 'island', 'piano', 'guitar', 'violin', 'trumpet', 'drum', 'sunflower', 'rose', 'daisy', 'tulip', 'lily', 'computer', 'internet', 'software', 'hardware', 'network', 'astronomy', 'biology', 'chemistry', 'physics', 'geology', 'history', 'literature', 'mathematics', 'philosophy', 'psychology', 'baseball', 'football', 'basketball', 'tennis', 'soccer', 'pizza', 'burger', 'pasta', 'sushi', 'icecream', 'backpack', 'trekking', 'mountaineering', 'wildlife', 'biodiversity', 'symmetry', 'photography', 'architecture', 'innovation', 'sustainability', 'watercolor', 'skyscraper', 'futuristic', 'astronaut', 'constellation', 'keyboard', 'programming', 'algorithm', 'debugging', 'opensource', 'cryptography', 'cybersecurity', 'biotechnology', 'nanotechnology', 'genetics', 'neuroscience', 'psychiatry', 'phenomenon', 'philosophy', 'existential', 'boulevard', 'cappuccino', 'macchiato', 'croissant', 'brunch', 'sunrise', 'sunset', 'horizon', 'serenity', 'tranquility', 'kaleidoscope', 'wanderlust', 'ethereal', 'nostalgia', 'melancholy', 'effervescent', 'soothing', 'resilience', 'harmony', 'gratitude', 'crystal', 'quasar', 'stardust', 'alchemy', 'transcendence', 'serendipity', 'verdant', 'labyrinth', 'cascade', 'silhouette', 'innovation', 'serenity', 'stellar', 'luminous', 'astral', 'grandeur', 'panorama', 'phenomenon', 'labyrinth', 'infinitesimal', 'nourishment', 'lullaby', 'velvet', 'effulgence', 'lustrous', 'mellifluous', 'plumage', 'evanescent', 'sonorous', 'effervescence', 'effulgent', 'luminescent', 'veracious', 'ephemeral', 'opulent', 'umbrella', 'apricot', 'gazelle', 'pomegranate', 'coral', 'tangerine', 'turquoise', 'amethyst', 'sapphire', 'jasmine', 'cinnamon', 'radiance', 'silhouette', 'aurora', 'gossamer', 'enchantment', 'resplendent', 'idyllic', 'astral', 'luminosity'];
    return words[Math.floor(Math.random() * words.length)];
  }, []);
  useEffect(() => {
    console.log('word to guess:',{word});
   }, [word]);
   useEffect(() => {
    document.title = "hangman game";
  }, []);

  useEffect(() => {
    setWord(getRandomWord());
  }, [getRandomWord]);

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuess('');
    setTries(0);
    setGuessed([]);
    setIsGameOver(false);
    setMistakes(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guessed.includes(guess)) {
      if (word.includes(guess)) {
        setGuessed((prevGuessed) => [...prevGuessed, guess]);
      } else {
        setMistakes((prevMistakes) => Math.min(9, prevMistakes + 1));
        setTries((prevTries) => prevTries + 1);
      }
    }

    if (tries >= maxTries || guessed.length === word.length) {
      setIsGameOver(true);
    }
  };

  return (
    <>
    
      <div className="Hangman">
        <h1 className="hangman-title">Hangman Game</h1>
        <img className="images" src={images[mistakes]} alt={`img`} />
        <form onSubmit={handleSubmit}>
          <label className="label-1" htmlFor="guess"> Guess a letter : </label>
          <input
            className="input-1" type="text" id="guess" value={guess} onChange={handleInputChange} maxLength="1" required/>
          <button type="submit">Submit</button>
        </form>
        <h2 className="guess">Word :</h2>
        <p className="line">
          {word ? word.split('').map((letter) => guessed.includes(letter) ? letter : '_').join(' '): ''}
        </p>
        <p className="guess">Tries left : {Math.max(0, maxTries - tries)}</p>{isGameOver && (
          <h2 className="guess">
            {guessed.length === word.length ? 'Congratulations, you won!': 'Game Over'}
          </h2>
        )}
        
        <button className="hang" onClick={resetGame}>
          Restart Game
        </button>
        
      </div>
    </>
  );
};

export default Hangman;
