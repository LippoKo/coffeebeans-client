import { useState, useEffect } from "react";
import axios from "axios";

//const API_URL = "http://localhost:5005";

function ShopListPage() {
	const [shopList, setShopList] = useState([]);

	const getShopList = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");
			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/coffeelist`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);

			setShopList(response.data.allShops);
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
			{shopList.map((list) => {
				return (
					<div className="ProjectCard card" key={list._id}>
						<h3>{list.store}</h3>
						<h5>{list.description}</h5>
						<h5>{list.location}</h5>
					</div>
				);
			})}
		</div>
	);
}
export default ShopListPage;
