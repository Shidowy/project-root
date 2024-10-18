import { useEffect, useState } from 'react';
import Home from './pages/Pages/home';

function App() {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(response => response.text())
            .then(setMessage);
    }, []);

    return (
        <div>
          <Home /> {/* Display Home component regardless of the message */}
          <div>
            {message 
              ? message 
              : 'Currently loading the necessary content. Please wait while we retrieve the data...'}
          </div>
        </div>
      );
}

export default App;
