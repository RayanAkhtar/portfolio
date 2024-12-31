import { useState } from 'react'
import './App.css'
import { GiEagleHead } from 'react-icons/gi'  // Import the eagle icon from react-icons/gi

function App() {
  const [isClicked, setIsClicked] = useState(false);  // State to track button click

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setIsClicked(!isClicked)}>
          Hawk
        </button>
        
        {/* Conditionally render the text and icon when the button is clicked */}
        {isClicked && (
          <div>
            <p>Tuah</p>
            <GiEagleHead size={30} /> {/* Render eagle icon */}
          </div>
        )}
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
