import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ShopDetails() {
	const [shop, setShop] = useState(null);

	const { shopId } = useParams();

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
			//console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getShopDetails();
	}, []);

	return (
		<>
			{shop && (
				<>
					<img src={shop.imageUrl} alt="..." />
					<h2>{shop.store}</h2>
					<p>{shop.description}</p>
				</>
			)}
			<Link to={`/shopdetails/edit/${shopId}`}>
				<button>Edit shop</button>
			</Link>

			<Link to={"/shoplist"}>
				<button>Go Back</button>
			</Link>
		</>
	);
}

export default ShopDetails;
