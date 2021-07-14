import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import Login from './Login';
import './App.css';
import Hero from './Hero.js';

const App = () => {
	const [ user, setUser ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ emailEroor, setEmailError ] = useState('');
	const [ passwordError, setPasswordError ] = useState('');
	const [ hasAccount, setHasAccount ] = useState(false);

	const clearInputs = () => {
		setEmail('');
		setPassword('');
	};

	const clearErrors = () => {
		setEmailError('');
		setPasswordError('');
	};

	const handleLogin = () => {
		clearErrors();
		fire.auth().signInWithEmailAndPassword(email, password).catch((err) => {
			switch (err.code) {
				case 'auth/invalid-email':
				case 'auth/user-disabled':
				case 'auth/user-not found':
					setEmailError(err.message);
					break;
				case 'auth/wrong-password':
					setPasswordError(err.message);
					break;
			}
		});
	};

	const handleSignup = () => {
		clearErrors();
		fire.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
			switch (err.code) {
				case 'auth/email-already-in-use':
				case 'auth/uinvalid-email':
					setEmailError(err.message);
					break;
				case 'auth/wrong-password':
					setPasswordError(err.message);
					break;
			}
		});
	};

	const handleLogout = () => {
		fire.auth().signOut();
	};

	const authlistener = () => {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				clearInputs();
				setUser(user);
			} else {
				setUser('');
			}
		});
	};

	useEffect(() => {
		authlistener();
	}, []);

	return (
		<div className="App">
			<Login
				email={email}
				setEmail={setEmail}
				password={password}
				setPasssword={setPassword}
				handleLogin={handleLogin}
				handleSignup={handleSignup}
				hasAccount={hasAccount}
				setHasAccount={setHasAccount}
				emailEroor={emailEroor}
				passwordError={passwordError}
			/>
			<Hero handleLogout />
		</div>
	);
};

export default App;
