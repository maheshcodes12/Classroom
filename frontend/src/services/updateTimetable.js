import axios from "axios";

export async function updateTimetable() {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/timetable/update`, {
			classroom: caches,
			periods: periods,
		});
		console.log(response);

		if (response.data) {
			return response.data.studentsArray;
		}
	} catch (error) {
		console.log(error);
	}
}
