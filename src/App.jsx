import './App.css';
import { Auth } from './components/Auth';
import { File } from './components/File';
import { Superheroes } from './components/Superheroes';

function App() {
	return (
		<div className='App'>
			{/* <Superheroes />\ */}
			{/* <Auth /> */}
			<File />
		</div>
	);
}

export default App;

// FIREBASE
// 1. CRUD ✅
// 2. AUTH (email and password, google)
// 3. upload file
// 4. hosting
