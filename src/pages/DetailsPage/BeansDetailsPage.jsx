import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function BeansDetails() {
	const [beans, setBeans] = useState(null);

	const { beansId } = useParams();
	const { user } = useContext(AuthContext);

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
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBeansDetails();
	}, []);

	return (
		<div className="cont">
			{beans && (
				<div className="cardul">
					<figure>
						<img className="card-image" src={beans.imageUrl} alt="..." />
					</figure>
					<h2>{beans.store}</h2>
					<p>{beans.description}</p>
					<p>{beans.user._id}</p>
				</div>
			)}
			{beans && user._id === beans.user._id && (
				<Link to={`/beansdetails/edit/${beansId}`}>
					<button>Edit Beans</button>
				</Link>
			)}

			<Link to={"/beanslist"}>
				<button>Go Back</button>
			</Link>
		</div>
	);
}

export default BeansDetails;
