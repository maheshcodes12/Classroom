import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Profile from "./Profile";
import Classroom from "./Classroom";
import { Box } from "@mui/material";
import Teachers from "./Teachers";
import Students from "./Students";

const Dashboard = () => {
	const [selectedOption, setSelectedOption] = useState("Classrooms");
	const [userType, setUserType] = useState("Principal");

	// useEffect(() => {
	// 	const typeofuser = localStorage.getItem("type");
	// 	setUserType(typeofuser);
	// }, []);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}>
			<Box
				display={"flex"}
				height={"100vh"}>
				<NavBar
					userType={userType}
					setSelectedOption={setSelectedOption}
				/>
				{selectedOption == "Profile" && (
					<Box>
						<Profile />
					</Box>
				)}
				{selectedOption == "Classrooms" && (
					<Box>
						<Classroom userType={userType} />
					</Box>
				)}
				{selectedOption == "Teachers" && (
					<Box>
						<Teachers userType={userType} />
					</Box>
				)}
				{selectedOption == "Students" && (
					<Box>
						<Students userType={userType} />
					</Box>
				)}
				{selectedOption == "CreateClassroom" && (
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						width={"70vw"}>
						Under Development
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;
