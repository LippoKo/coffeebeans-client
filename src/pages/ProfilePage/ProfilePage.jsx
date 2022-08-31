import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
	const [user, setUser] = useState([]);
	const [beans, setBeans] = useState([]);
	const [shop, setShop] = useState([]);

	const { user: loggedUser } = useContext(AuthContext);

	const getUser = async () => {
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
			setUser(response.data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const getMyList = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");
			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/mylist/${loggedUser._id}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);
			setBeans(response.data.myBeans);
			setShop(response.data.myShops);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
		getMyList();
	}, []);

	return (
		<>
			{user && (
				<>
					<figure>
						<img className="profile-image" src={user.imageUrl} alt="..." />
					</figure>
					<h2>{user.username}</h2>
					<p>{user.firstName}</p>
					<p>{user.lastName}</p>
					<Link to={`/profile/edit/${loggedUser._id}`}>
						<button>Edit Profile</button>
					</Link>
				</>
			)}
			<h1>My List</h1>

			{beans.map((myBeans) => {
				return (
					<div className="container">
						<div className="create-card card glass" key={myBeans._id}>
							<Link to={`/beansdetails/${myBeans._id}`}>
								<figure>
									<img
										className="card-image"
										src={myBeans.imageUrl}
										alt="..."
									/>
								</figure>
								<h3>{myBeans.store}</h3>
								<h5>{myBeans.description}</h5>
							</Link>
						</div>
					</div>
				);
			})}

			{shop.map((myShop) => {
				return (
					<div className="container">
						<div className="create-card card glass" key={myShop._id}>
							<Link to={`/shopdetails/${myShop._id}`}>
								<figure>
									<img className="card-image" src={myShop.imageUrl} alt="..." />
								</figure>
								<h3>{myShop.store}</h3>
								<h5>{myShop.description}</h5>
							</Link>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default ProfilePage;
