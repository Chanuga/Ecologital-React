import React, { useEffect, useState } from 'react';
import { Container, Button, Link } from 'react-bootstrap';
import TopNav from '../NavigationBarTop/TopNav';
import axios from 'axios';
import UserTable from './UserTable';

function User() {
	const [data, setData] = useState(null);

	useEffect(() => {
		if (localStorage.getItem('userType') == 'admin') {
			fetchData();
		} else {
			fetchUser(localStorage.getItem('userID'));
		}
	}, []);

	const fetchData = () => {
		const response = axios
			.get(`http://localhost:5000/api/v1/auth/users`)
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
	};

	const fetchUser = id => {
		debugger;
		const response = axios
			.get(`http://localhost:5000/api/v1/auth/users/${id}`)
			.then(function (response) {
				// handle success
				console.log(response.data.data);
				setData([response.data.data]);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	};

	const handleShow = () => {};

	function select(id) {
		const response = axios
			.delete(`http://localhost:5000/api/v1/auth/users/${id}`)
			.then(function (response) {
				// handle success
				console.log(response.data.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
			});

		fetchData();
	}

	return (
		<div>
			<TopNav />
			<Container>
				<div className='page-btn-title d-flex justify-content-between align-items-center'>
					<h2>User Manager</h2>
				</div>
				<hr />

				<div>
					<div>
						<div>
							<div className='table-responsive'>
								<UserTable allUsers={data} select={select} />
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default User;
