import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Select,
	MenuItem,
	Typography,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from "@mui/material";
import { getAllStudents } from "../services/getAllStudents";

const Students = ({ userType }) => {
	const [students, setStudents] = useState([]);
	useEffect(() => {
		async function getData() {
			const a = await getAllStudents();
			setStudents(a);
			console.log(students);
		}
		getData();
	}, []);
	return (
		<Box ml={4}>
			<Typography
				variant='h6'
				color='initial'>
				Registered teachers:
			</Typography>
			<Typography
				variant='body1'
				color='initial'>
				You can change the class assigned by going to classroom
			</Typography>
			<Table
				sx={{ minWidth: 650 }}
				aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell align='right'>Class Assigned</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{students?.map((row, index) => (
						<TableRow key={index}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.email}</TableCell>
							<TableCell align='right'>{row.classroom}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

export default Students;
