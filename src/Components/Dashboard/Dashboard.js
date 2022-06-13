import React from 'react';
import TopNav from '../NavigationBarTop/TopNav';
import { Badge } from 'react-bootstrap';

function Dashboard() {
	return (
		<div>
			<TopNav />
			<br />
			<br />
			<br />
			<br />
			<br />
			<a href='/user'>
				<Badge pill bg='primary'>
					Users
				</Badge>
			</a>
		</div>
	);
}

export default Dashboard;
