import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function BeansDetails() {
	const [beans, setBeans] = useState(null);

	const { beansId } = useParams();

	const getBeansDetails = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");

			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/beansdetails/${beansId}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);
			setBeans(response.data);
			//console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBeansDetails();
	}, []);

	return (
		<>
			{beans && (
				<>
					<img src={beans.imageUrl} alt="..." />
					<h2>{beans.store}</h2>
					<p>{beans.description}</p>
				</>
			)}
			<Link to={`/beansdetails/edit/${beansId}`}>
				<button>Edit Beans</button>
			</Link>

			<Link to={"/beanslist"}>
				<button>Go Back</button>
			</Link>
		</>
	);
}

export default BeansDetails;
