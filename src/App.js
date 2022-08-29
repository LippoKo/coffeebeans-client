import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import BeansListPage from "./pages/BeansListPage/BeansListPage";
import ShopListPage from "./pages/ShopListPage/ShopListPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Private from "./components/Private/Private";
import BeansDetailsPage from "./pages/DetailsPage/BeansDetailsPage";

function App() {
	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/beanslist"
					element={
						<Private>
							<BeansListPage />
						</Private>
					}
				/>

				<Route
					path="/beansdetails"
					element={
						<Private>
							<BeansDetailsPage />
						</Private>
					}
				/>

				<Route
					path="/shoplist"
					element={
						<Private>
							<ShopListPage />
						</Private>
					}
				/>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;
