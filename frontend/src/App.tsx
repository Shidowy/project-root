import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(response => response.text())
            .then(setMessage);
    }, []);

    return <div>{message || 'Loading...'}</div>;
}

export default App;