import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/home'
						element={<Homepage />}
					/>
					<Route
						path='/'
						element={<Dashboard />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/signup'
						element={<SignUp />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
