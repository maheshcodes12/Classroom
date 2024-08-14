import React from "react";
import { Typography, Button, Box } from "@mui/material";

const Profile = () => {
	const name = localStorage.getItem("name");
	const email = localStorage.getItem("email");

	const handleLogout = () => {
		localStorage.clear();
	};

	return (
		<Box
			sx={{
				width: "70vw",
				height: "100%",
				color: "black",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Box>
				<Typography
					sx={{ color: "black" }}
					variant='h5'>
					Name : {name}
				</Typography>
				<Typography
					sx={{ color: "black" }}
					variant='h5'>
					Email : {email}
				</Typography>
				<Button
					sx={{ marginY: 2, border: "1px solid" }}
					onClick={handleLogout}>
					Logout
				</Button>
			</Box>
		</Box>
	);
};

export default Profile;
