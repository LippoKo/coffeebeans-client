import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function BeansDetails() {
  const [beans, setBeans] = useState(null)

  const { id } = useParams()

  const getBeansDetails = async () => {
		try {
			const storedToken = localStorage.getItem("authToken");

			let response = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/beansdetails/${id}`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				}
			);
			setBeans(response.data.allBeans);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBeansDetails();
	}, []);

  return (
    <>
      <h1>{beans.store}</h1>
      <p>{beans.description}</p>
    </>
  )
}

export default BeansDetails