import axios from "axios";

export async function signupForTeacher(name, email, password) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/auth/signupteacher`, {
			name: name,
			email: email,
			password: password,
		});
		console.log(response);
		if (response) {
			localStorage.setItem("email", response.data.email);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("type", "Teacher");
		}
	} catch (error) {
		console.log(error);
	}
}
export async function signupForStudent(name, email, password, classroom) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/auth/signupstudent`, {
			name: name,
			email: email,
			password: password,
			classroom: classroom,
		});
		console.log(response);
		if (response) {
			localStorage.setItem("email", response.data.email);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("type", "Student");
		}
	} catch (error) {
		console.log(error);
	}
}
