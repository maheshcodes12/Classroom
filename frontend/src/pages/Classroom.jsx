import {
	Box,
	Grid,
	Select,
	MenuItem,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	addTeacherToClassroom,
	getClassroomData,
	removeStudentFromClassroom,
	removeTeacherFromClassroom,
} from "../services/Classroom";
import DeleteIcon from "@mui/icons-material/Delete";

const Classroom = ({ userType }) => {
	const [selectedClass, setSelectedClass] = useState("5th");
	const [classRoomData, setClassRoomData] = useState({});
	const [addTeacherIcon, setAddTeacherIcon] = useState(false);
	const classes = ["5th", "6th"];
	const availableTeachers = [
		{ name: "Teacher1", email: "teacher1@gmail.com" },
		{ name: "Teacher2", email: "teacher2@gmail.com" },
	];
	const [selectedTeacher, setSelectedTeacher] = useState(
		availableTeachers[0].email
	);

	const [timeSlots, setTimeSlots] = useState([]);
	const [subjectMap, setSubjectMap] = useState({});

	useEffect(() => {
		const generateTimeSlots = (start, end) => {
			const slots = [];
			let currentTime = new Date(`2024-08-14T${start}`);
			const endTime = new Date(`2024-08-14T${end}`);

			while (currentTime < endTime) {
				const startHour = currentTime.getHours();
				const endHour = startHour + 1;
				const slot = `${startHour % 12 || 12}${startHour < 12 ? "AM" : "PM"}-${
					endHour % 12 || 12
				}${endHour < 12 ? "AM" : "PM"}`;
				slots.push(slot);

				currentTime.setHours(currentTime.getHours() + 1);
			}
			return slots;
		};

		if (classRoomData?.startTime && classRoomData?.endTime) {
			const slots = generateTimeSlots(
				classRoomData?.startTime,
				classRoomData?.endTime
			);
			setTimeSlots(slots);
		}
	}, [classRoomData?.startTime, classRoomData?.endTime]);

	useEffect(() => {
		async function getData() {
			const data = await getClassroomData(selectedClass);
			setClassRoomData(data);
			setAddTeacherIcon(data?.teacherOfClass?.email ? true : false);
			const periods = data?.period || [];
			const periodSubjects = getPeriodSubjects(periods);
			setSubjectMap(periodSubjects);
		}
		getData();
	}, [selectedClass]);

	const getPeriodSubjects = (periods) => {
		const periodMap = {};
		periods.forEach((period) => {
			const startHour = new Date(`2024-08-14T${period.startTime}`).getHours();
			const endHour = new Date(`2024-08-14T${period.endTime}`).getHours();
			for (let hour = startHour; hour < endHour; hour++) {
				const slot = `${hour % 12 || 12}${hour < 12 ? "AM" : "PM"}-${
					(hour + 1) % 12 || 12
				}${hour + 1 < 12 ? "AM" : "PM"}`;
				periodMap[slot] = period.subject;
			}
		});
		return periodMap;
	};

	const deleteTeacher = async () => {
		await removeTeacherFromClassroom(
			selectedClass,
			classRoomData?.teacherOfClass?.email
		);
		const newClassroomData = { ...classRoomData, teacherOfClass: null };
		setClassRoomData(newClassroomData);
		setAddTeacherIcon(true); // Show the add teacher dropdown after removing
	};

	const addTeacher = async (email) => {
		setSelectedTeacher(email);
		setAddTeacherIcon(false);
		await addTeacherToClassroom(selectedClass, email);
		const data = await getClassroomData(selectedClass);
		setClassRoomData(data);
	};

	const handleDeleteStudent = async (index, email) => {
		await removeStudentFromClassroom(selectedClass, email);
		const newStudentsData = [...classRoomData?.studentsInClass];
		newStudentsData.splice(index, 1);
		const newClassroomData = {
			...classRoomData,
			studentsInClass: newStudentsData,
		};
		setClassRoomData(newClassroomData);
	};

	return (
		<Box sx={{ p: 2 }}>
			<Box
				display={"flex"}
				gap={8}
				mb={3}
				borderBottom={"1px solid"}>
				<Typography
					variant='h6'
					color='initial'
					sx={{ mb: 2, backgroundColor: "white", color: "black" }}>
					Select Classroom :
				</Typography>
				<Select
					labelId='Select Class'
					id='simple-select'
					value={selectedClass}
					label='Class'
					onChange={(e) => setSelectedClass(e.target.value)}
					sx={{ mb: 2, backgroundColor: "white", color: "black" }}>
					{classes.map((element, index) => (
						<MenuItem
							key={index}
							value={element}>
							{element}
						</MenuItem>
					))}
				</Select>
			</Box>
			<Box
				width={"80vw"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				gap={5}>
				<Typography
					variant='h6'
					color='textPrimary'>
					Classroom : {classRoomData?.name}
				</Typography>
				<Box
					borderBottom={"solid 1px"}
					pb={4}
					width={"100%"}>
					<Box
						width={"80%"}
						borderRadius={8}
						boxShadow={10}
						p={2}
						px={10}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"space-around"}>
						<Typography
							variant='h6'
							color='textPrimary'>
							Teacher : {classRoomData?.teacherOfClass?.name}
						</Typography>
						{userType === "Principal" && !addTeacherIcon && (
							<DeleteIcon
								onClick={deleteTeacher}
								sx={{ cursor: "pointer", color: "red" }}
							/>
						)}
						{addTeacherIcon && (
							<Select
								labelId='Select Teacher'
								id='simple-select'
								sx={{ width: 250, backgroundColor: "white", color: "black" }}
								value={selectedTeacher}
								label='Teacher'>
								{availableTeachers.map((element, index) => (
									<MenuItem
										key={index}
										value={element.email}
										onClick={() => addTeacher(element.email)}>
										{element.name}
									</MenuItem>
								))}
							</Select>
						)}
					</Box>
				</Box>
				<Box
					borderBottom={"solid 1px"}
					pb={4}
					width={"100%"}>
					<Typography
						variant='h6'
						color='textPrimary'>
						Start time : {classRoomData?.startTime}
					</Typography>
					<Typography
						variant='h6'
						color='textPrimary'>
						End Time : {classRoomData?.endTime}
					</Typography>
					<Grid
						item
						md={6}
						mx={10}>
						<Typography
							variant='h6'
							color='textPrimary'>
							Timetable :
						</Typography>
						<TableContainer component={Paper}>
							<Table
								sx={{ minWidth: 650 }}
								aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Day</TableCell>
										{timeSlots.map((slot, index) => (
											<TableCell
												key={index}
												sx={{ backgroundColor: "#f5f5f5", color: "black" }}>
												{slot}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{classRoomData?.studentsInClass?.map((row, index) => (
										<TableRow key={index}>
											<TableCell>{row.name}</TableCell>
											{timeSlots.map((slot, idx) => (
												<TableCell
													key={idx}
													sx={{ backgroundColor: "#e0e0e0", color: "black" }}>
													{subjectMap[slot] || ""}
												</TableCell>
											))}
											<TableCell align='right'>
												<Button
													variant='contained'
													color='secondary'
													onClick={() => handleDeleteStudent(index, row.email)}>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Box>
				<Box
					pb={4}
					mx={10}
					width={"80%"}>
					<Typography
						variant='h6'
						color='textPrimary'>
						Students :
					</Typography>
					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell align='right'>Remove Student</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{classRoomData?.studentsInClass?.map((row, index) => (
									<TableRow key={index}>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell align='right'>
											<Button
												variant='contained'
												color='secondary'
												onClick={() => handleDeleteStudent(index, row.email)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Box>
	);
};

export default Classroom;
