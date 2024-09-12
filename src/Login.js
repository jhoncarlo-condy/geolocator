import React, { useState } from 'react';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!email || !password) {
			setError('Please enter both email and password.');
			return;
		}

		setLoading(true);
		setError('');

		// Create the request body
		const loginData = {
			email: email,
			password: password,
		};

		try {
			const response = await fetch('http://127.0.0.1:8000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});

			const data = await response.json();

			if(response.ok) {
        if (data.success) {
          alert('Login successful!');
          // If successful, store token or navigate
          localStorage.setItem('token', data.token); // Store the token
          window.location.replace("/home");
        } else {
          // If there's an error, show the error message
          setError(data.message || 'Login failed');
          
        }
      }else{
        setError(data.message || 'Login failed');
      }
		} catch (error) {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};



	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
				<h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
					Login
				</h2>
				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-gray-700 text-sm font-bold mb-2'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type='submit'
						className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ${
							loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
						}`}
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
