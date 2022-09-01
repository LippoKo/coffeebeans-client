import BeansListPage from "../BeansListPage/BeansListPage";
import ShopListPage from "../ShopListPage/ShopListPage";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
	const [randomImage, setRandomImage] = useState("");

	const getImages = async () => {
		try {
			let response = await axios.get(
				"https://api.unsplash.com/search/photos/?per_page=10&query=coffee",
				{
					headers: {
						Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
					},
				}
			);

			console.log(response.data);
			setRandomImage(
				response.data.results[Math.floor(Math.random() * 10)].urls.raw
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getImages();
	}, []);

	return (
		<>
			<div className="cont">
				<h2 className="text-2xl font-bold">Home Page</h2>
				<img className="home-image" src={randomImage} alt="..." />
				<BeansListPage />
				<ShopListPage />
			</div>
		</>
	);
}

export default HomePage;
