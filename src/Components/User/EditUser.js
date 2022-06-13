import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import TopNav from '../NavigationBarTop/TopNav';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [errors, setErrors] = useState({});
	const [registerName, setRegisterName] = useState('');
	const [userType, setUserType] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassWord, setRegisterPassWord] = useState('');

	console.log('data', data);

	useEffect(() => {
		debugger;
		if (id) {
			const response = axios
				.get(`http://localhost:5000/api/v1/auth/users/${id}`)
				.then(function (response) {
					// handle success
					console.log(response.data.data);
					setData(response.data.data);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
		}
	}, []);

	const handleCancel = () => {
		navigate('/user');
	};

	const handleSavenClose = e => {
		e.preventDefault();
		try {
			const response = axios
				.put(`http://localhost:5000/api/v1/auth/users/${id}`, {
					name: registerName,
					email: registerEmail,
					role: userType,
					password: registerPassWord,
				})
				.then(function (response) {
					// handle success
					console.log(response.data.data);
					setData(response.data.data);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
				});
			navigate('/user');
		} catch (error) {}
	};

	return (
		<div>
			<TopNav />
			<Container>
				<div className='page-btn-title d-flex justify-content-between align-items-center'>
					<h2>Edit User</h2>
				</div>
				<hr />
				{data && (
					<Form id={id}>
						<Form.Group className='mb-3' controlId='formBasicUN'>
							<Form.Label>User Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='User Name'
								onChange={e => setRegisterName(e.target.value)}
								value={registerName || data.name || ''}
								isInvalid={!!errors.registerName}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.registerName}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formBasicUT'>
							<Form.Label>User Type</Form.Label>
							<Form.Select
								value={userType || data.role || ''}
								onChange={e => setUserType(e.target.value)}
								isInvalid={!!errors.userType}
							>
								<option value='Select'>Select</option>
								<option value='admin'>Admin</option>
								<option value='user'>User</option>
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								{errors.userType}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>E-mail address</Form.Label>
							<Form.Control
								type='email'
								placeholder='E-mail'
								onChange={e => setRegisterEmail(e.target.value)}
								value={registerEmail || data.email || ''}
								isInvalid={!!errors.registerEmail}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.registerEmail}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								onChange={e => setRegisterPassWord(e.target.value)}
								value={registerPassWord || data.password || ''}
								isInvalid={!!errors.registerPassWord}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.registerPassWord}
							</Form.Control.Feedback>
						</Form.Group>

						<div className='text-end'>
							<Button onClick={handleCancel} variant='danger'>
								Cancel
							</Button>

							<Button
								onClick={handleSavenClose}
								variant='success'
								style={{ margin: '5px' }}
							>
								Save
							</Button>
						</div>
					</Form>
				)}
			</Container>
		</div>
	);
}

export default EditUser;
