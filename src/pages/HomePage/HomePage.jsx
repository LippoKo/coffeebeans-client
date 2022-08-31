import BeansListPage from "../BeansListPage/BeansListPage";
import ShopListPage from "../ShopListPage/ShopListPage";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
	const [randomImage, setRandomImage] = useState("");

	const getImages = async () => {
		try {
			let response = await axios.get("https://coffee.alexflipnote.dev/random");
			setRandomImage(response);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getImages();
	}, []);

	return (
		<div>
			<h2>Home Page</h2>
			<ShopListPage />
			<BeansListPage />
		</div>
	);
}

export default HomePage;
