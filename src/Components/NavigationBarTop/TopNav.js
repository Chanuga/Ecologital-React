import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function TopNav() {
	return (
		<div>
			<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand href='/dashboard'>React-Test-App</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'></Nav>
						<Nav>
							<Nav.Link href='/user'>Users</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default TopNav;
