import axios from "axios";

export async function getAllStudents() {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.get(`${backend_url}/users/getstudents`);
		console.log(response);

		if (response.data) {
			return response.data.studentsArray;
		}
	} catch (error) {
		console.log(error);
	}
}
