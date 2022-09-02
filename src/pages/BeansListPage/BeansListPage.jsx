import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
			{/* <AddBeans getBeansList={getBeansList} /> */}

			{beansList.map((list) => {
				return (
					<div className="cont" key={list._id}>
						<div className="card glass  bg-teal-700">
							<Link to={`/beansdetails/${list._id}`}>
								<figure>
									<img
										className="card-image w-full"
										src={list.imageUrl}
										alt="..."
									/>
								</figure>
								<p className="text-lg  text-black">
									<u>Store</u>
								</p>
								<p className="text-xl font-bold">
									<i>{list.store}</i>
								</p>

								<p className="text-lg  text-black">
									<u>Description </u>{" "}
								</p>
								<p className="text-sm">
									<i>{list.description}</i>
								</p>
								<p className="text-xs flex justify-start text-black">
									<u>Created by: </u>{" "}
								</p>
								<p className="text-sm flex">
									<img
										className="card-profile"
										src={list.user.imageUrl}
										alt="profile pic"
									/>
									<i>{list.user.username}</i>
								</p>
							</Link>
						</div>
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
