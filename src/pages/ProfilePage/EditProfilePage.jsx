import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function EditProfile() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const { user: loggedUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleFirstName = (e) => setFirstName(e.target.value);
	const handleLastName = (e) => setLastName(e.target.value);
	const handleUsername = (e) => setUsername(e.target.value);

	const handleFileUpload = (e) => {
		setLoading(true);
		// console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();
		//console.log(user);
		// imageUrl => this name has to be the same as in the model since we pass
		// req.body to .create() method when creating a new movie in '/api/movies' POST route
		uploadData.append("imageUrl", e.target.files[0]);

		axios
			.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
			.then((response) => {
				// console.log("response is: ", response);
				// response carries "fileUrl" which we can use to update the state
				console.log(response.data.fileUrl);
				setImageUrl(response.data.fileUrl);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log("Error while uploading the file: ", err);
			});
	};

	const getBeansList = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");
			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/profile/${loggedUser._id}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);

			setFirstName(response.data.firstName);
			setLastName(response.data.lastName);
			setUsername(response.data.username);
			setImageUrl(response.data.imageUrl);
			//console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBeansList();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (loading) {
			alert("Image still loading...");
			return;
		}
		const editProfile = {
			firstName,
			lastName,
			username,
			imageUrl,
			user: loggedUser._id,
		};
		const storedToken = localStorage.getItem("authToken");

		axios
			.put(
				`${process.env.REACT_APP_API_URL}/api/profile/${loggedUser._id}`,
				editProfile,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			)
			/* .then(() => {
				getBeansList();
			}) */
			.catch((err) => console.log(err));

		setFirstName("");
		setLastName("");
		setUsername("");
		setImageUrl("");
		navigate(`/profile`);
	};

	const deleteProfile = () => {
		const storedToken = localStorage.getItem("authToken");

		axios
			.delete(
				`${process.env.REACT_APP_API_URL}/api/profile/${loggedUser._id}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			)
			.then(() => {
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="cont">
				<h3 className="text-2xl font-bold">Edit Profile</h3>
			<div className="SignupPage glass bg-indigo-700">

				<form onSubmit={handleSubmit}>
					<label htmlFor="firstName">
						First Name:
						<input
							type="text"
							name="firstName"
							value={firstName}
							onChange={handleFirstName}
						/>
					</label>

					<label htmlFor="lastName">
						Last Name:
						<input
							type="text"
							name="lastName"
							value={lastName}
							onChange={handleLastName}
						/>
					</label>

					<label htmlFor="username">
						Username:
						<input
							type="text"
							name="username"
							value={username}
							onChange={handleUsername}
						/>
					</label>

					<label htmlFor="image">
						Image:
						<input
							type="file"
							accept=".jpg, .png, .jpeg, .webp"
							onChange={(e) => handleFileUpload(e)}
						/>
					</label>

					<button className="btn btn-primary btn-xs">Edit Profile</button>
				</form>
				<button className="btn btn-primary btn-xs" onClick={deleteProfile}>Delete Profile</button>
			</div>
		</div>
	);
}

export default EditProfile;
