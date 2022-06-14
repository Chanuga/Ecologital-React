import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserTable({ allUsers, select }) {
	return (
		<div>
			<table className='table table-hover table-bordered'>
				<thead>
					<tr>
						<th scope='col'>User Name</th>
						<th scope='col'>E-mail</th>
						<th scope='col'>Role</th>
						<th scope='col'>Delete</th>
					</tr>
				</thead>
				<tbody>
					{allUsers &&
						allUsers.map((data, index) => (
							<tr id={data._id} key={index}>
								<td>
									<Link to={`/user/editUser/${data._id}`}>{data.name}</Link>
								</td>
								<td>{data.email}</td>
								<td>{data.role}</td>
								<td>
									<Button
										variant='danger'
										onClick={() => {
											select(data._id);
										}}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					{!allUsers ||
						(allUsers.length == 0 && (
							<tr>
								<td colSpan={8} className='text-center'>
									No Data
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default UserTable;
