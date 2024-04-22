import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
	const [username, setUsername] = useState<string>('');
	const [matchedUsers, setMatchedUsers] = useState<{ user1: string; user2: string } | null>(null);

	const handleRegister = async () => {
		try {
			await axios.post('/api/users', { username });
			setUsername('');
		} catch (error) {
			console.error('Error registering user', error);
		}
	};

	const handleMatch = async () => {
		try {
			const response = await axios.get('/api/match');
			setMatchedUsers(response.data);
		} catch (error) {
			console.error('Error matching users', error);
		}
	};

	return (
		<div>
			<h1>'랜덤 채팅 앱'</h1>
			<div>
				<input
					type='text'
					placeholder='사용자명'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button onClick={handleRegister}>등록</button>
			</div>
			<div>
				<button onClick={handleMatch}>랜덤 매칭</button>
			</div>
			{matchedUsers && (
				<div>
					<h2>매칭된 사용자:</h2>
					<p>사용자1: {matchedUsers.user1}</p>
					<p>사용자2: {matchedUsers.user2}</p>
				</div>
			)}
		</div>
	);
}

export default App;
