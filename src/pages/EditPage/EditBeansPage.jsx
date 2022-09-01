import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

function EditBeans() {
	const [store, setStore] = useState("");
	const [origin, setOrigin] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const { user, authenticateUser } = useContext(AuthContext);
	const { beansId } = useParams();
	const navigate = useNavigate();

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

	const getBeansList = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");
			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/beansdetails/${beansId}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);

			setStore(response.data.store);
			setOrigin(response.data.origin);
			setDescription(response.data.description);
			setLocation(response.data.location);
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
		const editBeans = {
			store,
			origin,
			description,
			location,
			imageUrl,
			user: user._id,
		};
		const storedToken = localStorage.getItem("authToken");

		axios
			.put(
				`${process.env.REACT_APP_API_URL}/api/beansdetails/${beansId}`,
				editBeans,
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

		setStore("");
		setOrigin("");
		setDescription("");
		setLocation("");
		setImageUrl("");
		navigate(`/beansdetails/${beansId}`);
		authenticateUser();
	};

	const deleteBeans = () => {
		const storedToken = localStorage.getItem("authToken");

		axios
			.delete(`${process.env.REACT_APP_API_URL}/api/beansdetails/${beansId}`, {
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			})
			.then(() => {
				navigate("/beanslist");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="cont">
			<h3 className="text-2xl font-bold">Edit Beans</h3>
			<div className="cardul glass bg-indigo-700 flex items-center flex-col">
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

					<button className="btn btn-primary btn-xs">Edit Beans</button>
				</form>
				<button className="btn btn-primary btn-xs" onClick={deleteBeans}>Delete Beans</button>
			</div>
		</div>
	);
}

export default EditBeans;
