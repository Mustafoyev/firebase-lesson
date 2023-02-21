import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase.config';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';

export const Superheroes = () => {
	const nameRef = useRef();
	const actorRef = useRef();
	const [superheroes, setSuperheroes] = useState([]);
	const superheroesCollectionRef = collection(db, 'superheroes');

	const getSuperheroes = async () => {
		const data = await getDocs(superheroesCollectionRef);
		setSuperheroes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getSuperheroes();
	}, []);

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		await addDoc(superheroesCollectionRef, {
			name: nameRef.current.value,
			actor_name: actorRef.current.value,
		});
		getSuperheroes();
	};

	const updateSuperhero = async (id, actor_name) => {
		const updatedCollectionRef = doc(db, 'superheroes', id);
		const newValue = prompt("Yangi ma'lumot kiriting", actor_name);
		const newData = { actor_name: newValue };
		await updateDoc(updatedCollectionRef, newData);
		getSuperheroes();
	};

	const deleteSuperhero = async (id) => {
		const updatedCollectionRef = doc(db, 'superheroes', id);
		await deleteDoc(updatedCollectionRef);
		getSuperheroes();
	};

	return (
		<div>
			<h1>Superheroes</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<input ref={nameRef} type='text' placeholder='Name' />
				</div>
				<div>
					<input ref={actorRef} type='text' placeholder='Actor' />
				</div>
				<button type='submit'>SUBMIT</button>
			</form>
			<ul>
				{superheroes.map((superhero) => (
					<li key={superhero.id}>
						{superhero.name} - {superhero.actor_name}
						<div>
							<button
								onClick={() =>
									updateSuperhero(superhero.id, superhero.actor_name)
								}>
								EDIT
							</button>
							<button onClick={() => deleteSuperhero(superhero.id)}>
								DELETE
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
