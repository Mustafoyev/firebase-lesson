import React, { useEffect, useRef, useState } from 'react';
import { storage } from '../firebase.config';
import { listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export const File = () => {
	const inputRef = useRef();
	const [imageList, setImageList] = useState([]);

	const imageListRef = ref(storage, 'images/');
	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const imageRef = ref(
			storage,
			`images/${inputRef.current.files[0].name}` + v4(),
		);
		await uploadBytes(imageRef, inputRef.current.files[0])
			.then((res) => {
				getDownloadURL(res.ref).then((url) => {
					setImageList((prev) => [...prev, url]);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		listAll(imageListRef)
			.then((res) => {
				res.items.map((item) => {
					getDownloadURL(item).then((url) => {
						setImageList((prev) => [...prev, url]);
					});
				});
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h1>File</h1>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type='file' />
				<button type='submit'>UPLOAD</button>
			</form>
			{imageList.map((img) => (
				<img src={img} width={'500'} height={'300'} />
			))}
		</div>
	);
};
