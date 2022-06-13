import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassWord, setRegisterPassWord] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const login = async () => {
		const newErrors = findFormErrors();
		if (Object.keys(newErrors).length > 0) {
			//We got errors!
			setErrors(newErrors);
		} else {
			try {
				const response = await axios.post(
					`http://localhost:5000/api/v1/auth/login`,
					{
						email: registerEmail,
						password: registerPassWord,
					}
				);
				console.log(response.data.user);
				localStorage.setItem('userTpe', response.data.user);

				navigate('/dashboard');
			} catch (error) {
				console.error(error.message);
			}
		}
	};

	const findFormErrors = () => {
		const newErrors = {};

		var regex = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		if (!registerEmail || registerEmail !== '') {
			if (regex.test(registerEmail) === false) {
				newErrors.registerEmail = 'Please enter a valid email address';
			}
		}

		if (!registerPassWord || registerPassWord.trim() == '') {
			newErrors.registerPassWord = 'Password is required';
		}

		return newErrors;
	};

	return (
		<div
			className='container'
			style={{
				display: 'flex',
				flexDirection: 'row',
				marginTop: '10%',
				justifyContent: 'center',
			}}
		>
			<Form
				style={{
					width: '600px',
					border: '5px solid #0d6ffc',
					borderRadius: '10px',
					padding: '40px',
				}}
			>
				<h3>Login Form</h3>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onChange={e => setRegisterEmail(e.target.value)}
						value={registerEmail || ''}
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
						value={registerPassWord || ''}
						isInvalid={!!errors.registerPassWord}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.registerPassWord}
					</Form.Control.Feedback>
				</Form.Group>
				<Button variant='primary' onClick={login}>
					Login
				</Button>
			</Form>
		</div>
	);
}

export default Login;
