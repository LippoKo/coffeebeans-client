import { useState, useEffect } from "react";
import axios from "axios";

//const API_URL = "http://localhost:5005";

function BeansListPage() {
	const [beansList, setBeansList] = useState([]);

	const getBeansList = async () => {
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

			setBeansList(response.data.allBeans);
			//console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBeansList();
	}, []);

	return (
		<div className="ProjectListPage">
			{beansList.map((list) => {
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
export default BeansListPage;

/*   const getbeansList = () => {
		axios
			.get(`${API_URL}/api/coffeelist`)
			.then((response) => setCoffeeList(response.data))
			.catch((error) => console.log(error));
	}; */
