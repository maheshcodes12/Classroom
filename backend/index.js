const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var mongoose = require("mongoose");

dotenv.config({
	path: "./.env",
});

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*", // Allow all origins
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

//--------------------------------------------------------
const authRoute = require("./routes/authRoute.js");
const classroomRoute = require("./routes/classroomRoute.js");
const timetableRoute = require("./routes/timetableRoute.js");
const updateTeacherRoute = require("./routes/updateTeacherRoute.js");
const updateStudentRoute = require("./routes/updateStudentRoute.js");
const getUsersRoute = require("./routes/getUsersRoute.js");
app.get("/", (req, res) => {
	res.json("Hello");
});
app.use("/auth", authRoute);
app.use("/classroom", classroomRoute);
app.use("/timetable", timetableRoute);
app.use("/teacher", updateTeacherRoute);
app.use("/student", updateStudentRoute);
app.use("/users", getUsersRoute);
//--------------------------------------------------------

const PORT = process.env.PORT;

var mongoDB =
	"mongodb+srv://AdminRoot:classroomCluster69@classroom.tqvtn.mongodb.net/?retryWrites=true&w=majority&appName=Classroom";
mongoose
	.connect(mongoDB)
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((e) => {
		console.log(e);
	});

var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
