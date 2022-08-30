import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddBeans from "../../components/AddCoffee/AddBeans";

//const API_URL = "http://localhost:5005";

function BeansListPage() {
	const [beansList, setBeansList] = useState([]);

	const getBeansList = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");
			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/beanslist`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);

			setBeansList(response.data.allBeans.reverse());
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
			<AddBeans getBeansList={getBeansList} />

			{beansList.map((list) => {
				return (
					<div className="ProjectCard card" key={list._id}>
						<Link to={`/beansdetails/${list._id}`}>
							<img src={list.imageUrl} alt="..." />
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
export default BeansListPage;

/*   const getbeansList = () => {
		axios
			.get(`${API_URL}/api/coffeelist`)
			.then((response) => setCoffeeList(response.data))
			.catch((error) => console.log(error));
	}; */
