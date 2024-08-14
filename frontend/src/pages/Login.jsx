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
import {
	loginForPrincipal,
	loginForStudent,
	loginForTeacher,
} from "../services/Login";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [type, setType] = React.useState();
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		if (type == "Principal") {
			loginForPrincipal(data.get("email"), data.get("password"));
		} else if (type == "Teacher") {
			loginForTeacher(data.get("email"), data.get("password"));
		} else if (type == "Student") {
			loginForStudent(data.get("email"), data.get("password"));
		}
		setTimeout(() => {
			navigate("/dashboard");
		}, 2000);
	};
	const handleType = (e, value) => {
		setType(value);
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
					Login
				</Typography>
				<Box mt={2}>
					{" "}
					<ToggleButtonGroup
						value={type}
						exclusive
						onChange={handleType}
						aria-label='text alignment'>
						<ToggleButton value='Principal'>Principal</ToggleButton>
						<ToggleButton value='Teacher'>Teacher</ToggleButton>
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
								required
								fullWidth
								id='email'
								label='Email Address'
								type='email'
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
						Login
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
