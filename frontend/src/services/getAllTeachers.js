import axios from "axios";

export async function getAllTeachers() {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.get(`${backend_url}/users/getteachers`);
		console.log(response);

		if (response.data) {
			return response.data.teachersArray;
		}
	} catch (error) {
		console.log(error);
	}
}
