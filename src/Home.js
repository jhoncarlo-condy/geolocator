import React, { useState } from 'react';

function Home() {
	const [ip_address, setIpAddress] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [logoutLoading, setLogoutLoading] = useState(false);
	const [geolocationData, setGeolocationData] = useState('');

	const logoutUser = (e) => {
		setLogoutLoading(true);
		setTimeout(() => {
			localStorage.removeItem('token');
			window.location.replace('/login');
		}, 1000);
	};

	const handleSearch = async (e) => {
		e.preventDefault();

		setLoading(true);
		setError('');

		const token = localStorage.getItem('token');

		const geoInfoData = {
			ip: ip_address,
		};

		try {
			const response = await fetch('http://127.0.0.1:8000/api/geo-info', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(geoInfoData),
			});

			const data = await response.json();

			if (response.ok) {
				setGeolocationData(data);
				console.log(geolocationData);
			} else {
				setError(data.message || 'Geolocation Information not found');
			}
		} catch (error) {
			setError('Geolocation Information not found');
			setGeolocationData(null);
		} finally {
			setLoading(false);
		}
	};

	fetch('https://api.ipify.org?format=json')
		.then((response) => response.json())
		.then((data) => {
			setIpAddress(data.ip);
      // handleSearch();
		})
		.catch((error) => {
      setIpAddress("");
    });

	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			<div className='flex justify-end p-4 bg-gray-100'>
				<button
					type='submit'
					// className='bg-red-600 text-white px-4 py-2 rounded-lg'
					className={`bg-red-600 text-white px-4 py-2 rounded-lg ${
						logoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
					}`}
					onClick={(e) => logoutUser()}
					disabled={logoutLoading}
				>
					{logoutLoading ? 'Logging out..' : 'Logout'}
				</button>
			</div>
			<div className='flex flex-1 items-center justify-center'>
				<div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
						Geolocator
					</h2>
					<form className='flex flex-col items-center' onSubmit={handleSearch}>
						<div className='mb-4 w-full'>
							<label
								htmlFor='ip_address'
								className='block text-gray-700 text-sm font-bold mb-2'
							>
								IP Address
							</label>
							<input
								type='text'
								id='ip_address'
								value={ip_address}
								onChange={(e) => setIpAddress(e.target.value)}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
								required
							/>
						</div>
						{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
						{geolocationData && (
							<div className='max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md'>
								<h2 className='text-2xl font-bold text-gray-800 mb-4'>
									Result
								</h2>
								<ul className='space-y-2'>
									{Object.entries(geolocationData).map(([key, value]) => (
										<li
											key={key}
											className='flex justify-between p-2 border-b border-gray-200'
										>
											<span className='font-semibold text-gray-700'>
												{key.charAt(0).toUpperCase() +
													key.slice(1).replace(/_/g, ' ')}
												:
											</span>
											<span className='text-gray-600'>{value}</span>
										</li>
									))}
								</ul>
							</div>
						)}

						<button
							type='submit'
							className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ${
								loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
							}`}
							disabled={loading}
						>
							Search
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Home;
