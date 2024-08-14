import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { signupForStudent, signupForTeacher } from "../services/Signup";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const [type, setType] = React.useState("Teacher");
	const [userType, setUserType] = React.useState("Principal");
	const navigate = useNavigate();

	React.useEffect(() => {
		const typeofuser = localStorage.getItem("type");
		setUserType(typeofuser);
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		if (type == "Teacher") {
			signupForTeacher(
				data.get("name"),
				data.get("email"),
				data.get("password")
			);
		}
		if (type == "Student") {
			signupForStudent(
				data.get("name"),
				data.get("email"),
				data.get("password"),
				data.get("classroom")
			);
		}
		setTimeout(() => {
			navigate("/dashboard");
		}, 2000);
	};
	const handleType = (e, value) => {
		if (value != null) setType(value);
		console.log(value);
	};

	return (
		<Container sx={{ width: "100vw" }}>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography
					component='h1'
					variant='h5'>
					Sign up
				</Typography>
				<Box mt={2}>
					{" "}
					<ToggleButtonGroup
						value={type}
						exclusive
						onChange={handleType}
						aria-label='text alignment'>
						{userType == "Principal" && (
							<ToggleButton value='Teacher'>Teacher</ToggleButton>
						)}
						<ToggleButton value='Student'>Student</ToggleButton>
					</ToggleButtonGroup>
				</Box>
				<Box
					component='form'
					width={"40%"}
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={12}>
							<TextField
								autoComplete='given-name'
								name='name'
								required
								fullWidth
								id='name'
								label='Name'
								autoFocus
							/>
						</Grid>
						{type == "Student" && (
							<Grid
								item
								xs={12}>
								<TextField
									autoComplete='given-class'
									name='classroom'
									required
									fullWidth
									id='classroom'
									label='Classroom'
									autoFocus
								/>
							</Grid>
						)}

						<Grid
							item
							xs={12}>
							<TextField
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<TextField
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='new-password'
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
