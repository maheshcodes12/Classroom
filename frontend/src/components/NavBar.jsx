import React from "react";
import { Typography, Box, Button } from "@mui/material";

const NavBar = ({ userType, setSelectedOption }) => {
	return (
		<Box
			sx={{
				height: "100vh",
				width: "20vw",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 3,
				backgroundColor: "#f4f4f4",
				p: 2,
				borderRight: "1px solid #ddd",
			}}>
			<Typography
				variant='h6'
				color='textPrimary'
				sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
				onClick={() => setSelectedOption("Profile")}>
				Profile
			</Typography>
			{userType === "Principal" && (
				<Typography
					variant='h6'
					color='textPrimary'
					sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
					onClick={() => setSelectedOption("Teachers")}>
					Teachers
				</Typography>
			)}
			{(userType === "Teacher" || userType === "Principal") && (
				<Typography
					variant='h6'
					color='textPrimary'
					sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
					onClick={() => setSelectedOption("Students")}>
					Students
				</Typography>
			)}
			<Typography
				variant='h6'
				color='textPrimary'
				sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
				onClick={() => setSelectedOption("Classrooms")}>
				Classrooms
			</Typography>
			{userType === "Principal" && (
				<Button
					variant='contained'
					color='primary'
					sx={{ mt: 2, borderRadius: "8px", padding: "8px 16px" }}
					onClick={() => setSelectedOption("CreateClassroom")}>
					Create Classroom
				</Button>
			)}
		</Box>
	);
};

export default NavBar;
