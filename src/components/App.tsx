import { useState } from 'react';
import netlifyLogo from '../assets/netlify.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
        <div className="justify-center text-center space-y-8">
          <div className="flex justify-center">
            <img src={netlifyLogo} alt="Netlify logo" />
          </div>
          <h1 className="text-4xl font-extrabold text-white">Welcome to Netlify Compose!</h1>
          <p className="text-xl text-white">
            Start your first composable project with TypeScript, React, Vite, Tailwind, and Netlify.
          </p>
          <button
            className="px-6 py-3 bg-white font-semibold rounded-full shadow-md hover:bg-gray-100"
            onClick={() => setCount(count => count + 1)}
          >
            This button has been clicked {count} time{count === 1 ? '' : 's'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
