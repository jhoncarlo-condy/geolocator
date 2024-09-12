import Home from './Home';
import Login from './Login';
import React, { useState, useEffect } from 'react';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true); // Use the setter function to update the state
		}
	}, []);

	return <div>{isLoggedIn ? <Home /> : <Login />}</div>;
}

export default App;
