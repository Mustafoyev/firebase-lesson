import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../firebase.config';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
export const Auth = () => {
	const [user, setUser] = useState();
	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});
	const handleRegister = async (evt) => {
		evt.preventDefault();
		try {
			const data = await createUserWithEmailAndPassword(
				auth,
				evt.target.children[0].value,
				evt.target.children[1].value,
			);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleLogin = async (evt) => {
		evt.preventDefault();
		try {
			const data = await signInWithEmailAndPassword(
				auth,
				evt.target.children[0].value,
				evt.target.children[1].value,
			);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div>
			<h1>Auth</h1>
			<button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
			<br />
			<br />
			<form onSubmit={handleRegister}>
				<input type='email' placeholder='Email' />
				<input type='password' placeholder='Password' />
				<button type='submit'>REGISTER</button>
			</form>
			<br />
			<form onSubmit={handleLogin}>
				<input type='email' placeholder='Email' />
				<input type='password' placeholder='Password' />
				<button type='submit'>LOGIN</button>
			</form>
			<br />
			<div>
				<h2>USER EMAIL : {user?.email}</h2>
				<h2>USER NAME: {user?.displayName}</h2>
				<div>
					<img src={user?.photoURL} alt='' />
				</div>
				<button onClick={() => signOut(auth)}>LOG OUT</button>
			</div>
		</div>
	);
};
