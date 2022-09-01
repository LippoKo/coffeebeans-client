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
					<figure className="flex justify-center">
						<img className="profile-image w-32" src={user.imageUrl} alt="..." />
					</figure>
					<h2 className="text-2xl font-bold"><i>{user.username}</i> </h2>
					<p className="text-sm">Name: <i className="text-xl">{user.firstName}</i></p>
					<p className="text-sm">LastName: <i className="text-xl">{user.lastName}</i> </p>
					<p className="text-sm">Email: <i className="text-xl">{user.email}</i> </p>
					<Link to={`/profile/edit/${loggedUser._id}`}>
						<button className="btn btn-primary btn-sm">Edit Profile</button>
					</Link>
				</>
			)}
			<hr />
			<h1 className="text-2xl font-bold">My List</h1>

			{beans.map((myBeans) => {
				return (
					<div className="cont">
						<h1 className="text-xl">Beans</h1>
						<div className="card glass bg-teal-700" key={myBeans._id}>
							<Link to={`/beansdetails/${myBeans._id}`}>
								<figure>
									<img
										className="card-image w-full"
										src={myBeans.imageUrl}
										alt="..."
									/>
								</figure>
								<p className="text-lg  text-black">
									<u>Store</u>
								</p>
								<p className="text-xl font-bold">
									<i>{myBeans.store}</i>
								</p>

								<p className="text-lg  text-black">
									<u>Description </u>{" "}
								</p>
								<p className="text-sm">
									<i>{myBeans.description}</i>
								</p>
							</Link>
						</div>
					</div>
				);
			})}

			{shop.map((myShop) => {
				return (
					<div className="cont">
						<h1 className="text-xl">Shop</h1>
						<div className="card glass bg-indigo-700" key={myShop._id}>
							<Link to={`/shopdetails/${myShop._id}`}>
								<figure>
									<img
										className="card-image w-full"
										src={myShop.imageUrl}
										alt="..."
									/>
								</figure>
								<p className="text-lg  text-black">
									<u>Store</u>
								</p>
								<p className="text-xl font-bold">
									<i>{myShop.store}</i>
								</p>

								<p className="text-lg  text-black">
									<u>Description </u>{" "}
								</p>
								<p className="text-sm">
									<i>{myShop.description}</i>
								</p>
							</Link>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default ProfilePage;
