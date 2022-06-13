import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
	const [registerName, setRegisterName] = useState('');
	const [userType, setUserType] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassWord, setRegisterPassWord] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	var registeredUser = {
		name: registerName,
		userType: userType,
		email: registerEmail,
		password: registerPassWord,
	};

	const register = async () => {
		const newErrors = findFormErrors();
		if (Object.keys(newErrors).length > 0) {
			//We got errors!
			setErrors(newErrors);
		} else {
			try {
				const response = await axios.post(
					`http://localhost:5000/api/v1/auth/register`,
					{
						name: registerName,
						email: registerEmail,
						role: userType,
						password: registerPassWord,
					}
				);
				console.log(response.data.user);
				navigate('/');
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
		//NAME ERROS
		if (!registerName || registerName.trim() == '') {
			newErrors.registerName = 'Name is required';
		}

		if (userType == 'Select' || userType.trim() == '') {
			newErrors.userType = 'User Type is required';
		}

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
				<h3>Signin Form</h3>

				<Form.Group className='mb-3' controlId='formBasicUN'>
					<Form.Label>User Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='User Name'
						onChange={e => setRegisterName(e.target.value)}
						value={registerName || ''}
						isInvalid={!!errors.registerName}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.registerName}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicUT'>
					<Form.Label>User Type</Form.Label>
					<Form.Select
						value={userType}
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
				<Button variant='primary' onClick={register}>
					Signin
				</Button>
			</Form>
		</div>
	);
}

export default Signin;
