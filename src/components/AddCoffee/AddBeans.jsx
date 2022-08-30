import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function AddBeans({ getBeansList }) {
	const [store, setStore] = useState("");
	const [origin, setOrigin] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useContext(AuthContext);

	const handleStore = (e) => setStore(e.target.value);
	const handleOrigin = (e) => setOrigin(e.target.value);
	const handleDescription = (e) => setDescription(e.target.value);
	const handleLocation = (e) => setLocation(e.target.value);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (loading) {
			alert("Image still loading...");
			return;
		}

		const newBeans = {
			store,
			origin,
			description,
			location,
			imageUrl,
			user: user._id,
		};
		const storedToken = localStorage.getItem("authToken");

		axios
			.post(`${process.env.REACT_APP_API_URL}/api/coffeebeans`, newBeans, {
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			})
			.then(() => {
				getBeansList();
			})
			.catch((err) => console.log(err));

		setStore("");
		setOrigin("");
		setDescription("");
		setLocation("");
		setImageUrl("");
	};

	return (
		<div className="SignupPage">
			<h3>Add Beans</h3>

			<form onSubmit={handleSubmit}>
				<label htmlFor="store">
					Store:
					<input
						type="text"
						name="store"
						value={store}
						onChange={handleStore}
					/>
				</label>

				<label htmlFor="origin">
					Origin:
					<input
						type="text"
						name="origin"
						value={origin}
						onChange={handleOrigin}
					/>
				</label>

				<label htmlFor="description">
					Description:
					<input
						type="text"
						name="description"
						value={description}
						onChange={handleDescription}
					/>
				</label>

				<label htmlFor="location">
					Location:
					<input
						type="text"
						name="location"
						value={location}
						onChange={handleLocation}
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

				<button type="submit">Add Beans</button>
			</form>
		</div>
	);
}

export default AddBeans;
