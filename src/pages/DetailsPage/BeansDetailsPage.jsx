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
			//console.log(response.data);
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
				<div className="card glass bg-teal-700">
					<figure>
						<img className="card-image w-full" src={beans.imageUrl} alt="..." />
					</figure>
					<p className="text-lg text-black">
						<u>Store</u>
					</p>
					<p className="text-xl font-bold">
						<i>{beans.store}</i>
					</p>
					<p className="text-lg  text-black">
						<u>Origin </u>
					</p>
					<p className="text-lg">
						<i>{beans.origin}</i>
					</p>
					<p className="text-lg  text-black">
						<u>Description </u>
					</p>
					<p className="text-sm">
						<i>{beans.description}</i>
					</p>
					<p className="text-lg  text-black">
						<u>Location </u>
					</p>
					<p className="text-lg">
						<i>{beans.location}</i>
					</p>
				</div>
			)}
			{beans && user._id === beans.user._id && (
				<Link to={`/beansdetails/edit/${beansId}`}>
					<button className="btn btn-primary btn-sm">Edit Beans</button>
				</Link>
			)}

			<Link to={"/beanslist"}>
				<button className="btn btn-primary btn-sm">Go Back</button>
			</Link>
		</div>
	);
}

export default BeansDetails;
