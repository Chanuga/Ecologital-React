import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Authentication/Login/Login';
import Signin from './Components/Authentication/Signin/Signin';
import Dashboard from './Components/Dashboard/Dashboard';
import User from './Components/User/User';
import EditUser from './Components/User/EditUser';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signin' element={<Signin />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/user' element={<User />} />
					<Route path='/user/editUser/:id' element={<EditUser />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
