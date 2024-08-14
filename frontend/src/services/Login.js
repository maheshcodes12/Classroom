import axios from "axios";

export async function loginForPrincipal(email, password) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/auth/loginprincipal`, {
			email: email,
			password: password,
		});
		console.log(response);
		if (response) {
			localStorage.setItem("email", response.data.email);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("type", "Principal");
		}
	} catch (error) {
		console.log(error);
	}
}
export async function loginForTeacher(email, password) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/auth/loginteacher`, {
			email: email,
			password: password,
		});
		if (response) {
			localStorage.setItem("email", response.data.email);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("type", "Teacher");
		}
	} catch (error) {
		console.log(error);
	}
}
export async function loginForStudent(email, password) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/auth/loginstudent`, {
			email: email,
			password: password,
		});
		if (response) {
			localStorage.setItem("email", response.data.email);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("type", "Student");
		}
	} catch (error) {
		console.log(error);
	}
}
