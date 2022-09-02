import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";


function AddShop({ getShopList }) {
	const [store, setStore] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleStore = (e) => setStore(e.target.value);
	const handleDescription = (e) => setDescription(e.target.value);
	const handleLocation = (e) => setLocation(e.target.value);

	const handleFileUpload = (e) => {
		setLoading(true);
		// console.log("The file to be uploaded is: ", e.target.files[0]);

		const uploadData = new FormData();

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

		const newShop = { store, description, location, imageUrl, user: user._id };
		const storedToken = localStorage.getItem("authToken");

		axios
			.post(`${process.env.REACT_APP_API_URL}/api/coffeeshop`, newShop, {
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			})
			.then(() => {
				console.log('Shop Added!')
			})
			.catch((err) => console.log(err));

		setStore("");
		setDescription("");
		setLocation("");
		setImageUrl("");
		navigate("/shoplist");
	};

	return (
		<div className="cont">
			<h3 className="text-2xl font-bold">Add Shop</h3>
			<div className="SignupPage card bg-indigo-700">
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

					<button className="btn btn-primary btn-sm">Add Shop</button>
				</form>
			</div>
		</div>
	);
}

export default AddShop;
