import { useState, useEffect } from "react";
import axios from "axios";
import AddShop from "../../components/AddCoffee/AddShop";
import { Link } from "react-router-dom";

//const API_URL = "http://localhost:5005";

function ShopListPage() {
	const [shopList, setShopList] = useState([]);

	const getShopList = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");
			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/shoplist`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);

			setShopList(response.data.allShops.reverse());
			//console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getShopList();
	}, []);

	return (
		<div className="ProjectListPage">
			{/* <AddShop getShopList={getShopList} />
 */}
			{shopList.map((list) => {
				return (
					<div className="create-card card glass" key={list._id}>
						<Link to={`/shopdetails/${list._id}`}>
						<figure>

							<img className="card-image" src={list.imageUrl} alt="..." />
						</figure>
							<h3>{list.store}</h3>
							<h5>{list.description}</h5>
							<h5>{list.location}</h5>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
export default ShopListPage;
