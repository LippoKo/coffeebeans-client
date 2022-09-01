import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function ShopDetails() {
	const [shop, setShop] = useState(null);

	const { shopId } = useParams();
	const { user } = useContext(AuthContext);

	const getShopDetails = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");

			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/shopdetails/${shopId}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);
			setShop(response.data);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getShopDetails();
	}, []);

	return (
		<div className="cont">
			{shop && (
				<div className="card glass bg-indigo-700">
					<figure>
						<img className="card-image w-full" src={shop.imageUrl} alt="..." />
					</figure>
					<p className="text-lg text-black">
						<u>Store</u>
					</p>
					<p className="text-xl font-bold">
						<i>{shop.store}</i>
					</p>
					<p className="text-lg  text-black">
						<u>Description </u>
					</p>
					<p className="text-sm">
						<i>{shop.description}</i>
					</p>
					<p className="text-lg  text-black">
						<u>Location </u>
					</p>
					<p className="text-lg">
						<i>{shop.location}</i>
					</p>
				</div>
			)}
			{shop && user._id === shop.user._id && (
				<Link to={`/shopdetails/edit/${shopId}`}>
					<button className="btn btn-primary btn-sm">Edit Shop</button>
				</Link>
			)}

			<Link to={"/shoplist"}>
				<button className="btn btn-primary btn-sm">Go Back</button>
			</Link>
		</div>
	);
}

export default ShopDetails;
