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
				<div className="cardul">
					<figure>
						<img className="card-image" src={shop.imageUrl} alt="..." />
					</figure>
					<h2>{shop.store}</h2>
					<p>{shop.description}</p>
					<p>{shop.user._id}</p>
				</div>
			)}
			{shop && user._id === shop.user._id && (
				<Link to={`/shopdetails/edit/${shopId}`}>
					<button>Edit Shop</button>
				</Link>
			)}

			<Link to={"/shoplist"}>
				<button>Go Back</button>
			</Link>
		</div>
	);
}

export default ShopDetails;
