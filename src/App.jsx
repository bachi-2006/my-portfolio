import { useState, useEffect } from "react";
import React from "react";

import "./App.css";
import SideNav from "./components/SideNav";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import { Route, Routes } from "react-router";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import PortfolioSheet from "./components/PortfolioSheet";
import Experiments from "./pages/Experiments";

function App() {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [sheetData, setSheetData] = useState({});

	const sheetHandler = (data = {}) => {
		setSheetOpen(true);
		setSheetData(data);
	};

	// Render app immediately (no splash/loader)

	return (
		<>
			<PortfolioSheet
				sheetOpen={sheetOpen}
				setSheetOpen={setSheetOpen}
				sheetData={sheetData}
			/>
			<main
				className={`transition-transform  ${sheetOpen ? "scale-[0.90]" : ""}`}
			>
				<SideNav />
				<Navbar />
				<div className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/experiments" element={<Experiments />} />
						<Route
							path="/portfolio"
							element={<Portfolio sheetHandler={sheetHandler} />}
						/>
					</Routes>
				</div>
			</main>
		</>
	);
}

export default App;
