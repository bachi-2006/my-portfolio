import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [activePath, setActivePath] = useState("/");

	const controlNavbar = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > lastScrollY) {
				setShow(false);
			} else {
				setShow(true);
			}
			setLastScrollY(window.scrollY);
		}
	};

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);
			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	const navItems = [
		{
			path: "/",
			name: (
				<div className="flex items-center gap-2">
					<ion-icon name="bug-outline"></ion-icon>Home
				</div>
			),
		},
		{
			path: "/about",
			name: (
				<div className="flex items-center gap-2">
					<ion-icon name="person-circle-outline"></ion-icon> About
				</div>
			),
		},
		{
			path: "/portfolio",
			name: (
				<div className="flex items-center gap-2">
					<ion-icon name="grid-outline"></ion-icon> Portfolio
				</div>
			),
		},
		{
			path: "/contact",
			name: (
				<div className="flex items-center gap-2">
					<ion-icon name="mail-outline"></ion-icon> Contact
				</div>
			),
		},
		{
			path: "/experiments",
			name: (
				<div className="flex items-center gap-2">
					<ion-icon name="flask-outline"></ion-icon> Experiments
				</div>
			),
		},
	];

	return (
		<>
			<nav
				className={`fixed bottom-[30px] left-0 w-full transition-transform  duration-300 px-4 z-[10]   min-h-[62px] lg:h-[62px] md:h-[62px] ${
					show ? "translate-y-0" : " translate-y-[calc(100%+30px)]"
				}`}
			>
				<div className="navblur w-full max-w-[800px] mx-auto transition-all duration-200 ">
					<div
						className={`overflow-hidden transition-max-height duration-700 ease-in-out ${
							isMobileMenuOpen ? "max-h-screen" : "max-h-0"
						}`}
					>
						<div className=" flex flex-col text-right p-8 text-2xl gap-6">
							{navItems.map((item) => (
								<NavLink
									key={item.path}
									to={item.path}
									className={`${
										activePath === item.path ? "text-gray-200" : "text-gray-400"
									} hover:text-gray-300 transition-colors duration-300`}
									onClick={() => {
										setActivePath(item.path);
										setIsMobileMenuOpen(false);
									}}
								>
									{item.name}
								</NavLink>
							))}
						</div>
					</div>
					<div className=" text-white px-6 h-[60px]  overflow-hidden rounded-2xl flex items-center justify-between p-0">
						
						<img src="rohith-logo.png" className="h-[80%]" />

						<div className="hidden md:flex space-x-4 relative h-full items-center p-0">
							{navItems.map((item) => (
								<NavLink
									key={item.path}
									to={item.path}
									className={`${
										activePath === item.path ? "text-gray-200" : "text-gray-400"
									} hover:text-gray-300 transition-colors duration-300 h-full flex items-center relative`}
									onClick={() => setActivePath(item.path)}
								>
									{item.name}
									{activePath === item.path && (
										<div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transition-transform duration-300" />
									)}
								</NavLink>
							))}
						</div>

						<div className="md:hidden flex items-center">
							<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
								<svg
									className="w-6 h-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			 <div className="lg:flex hidden text-2xl text-gray-400  gap-2 ">
				 <a className="transition-colors hover:text-gray-200" href="https://github.com/bachi-2006">
					<ion-icon name="logo-github"></ion-icon>
				</a>
				<a className="transition-colors hover:text-gray-200" href="https://www.linkedin.com/in/rohith-dachepally/">
					{" "}
					<ion-icon name="logo-linkedin"></ion-icon>
				</a> 
			</div>			</nav>
			{isMobileMenuOpen && (
				<div className="fixed bottom-0 left-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center transition-[background-color] duration-700"></div>
			)}
		</>
	);
};

export default Navbar;
