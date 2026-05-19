import React, { useState } from "react";
import { Projects } from "../assets/Projects";

export default function Portfolio({ sheetHandler }) {
	const [isSelected, setIsSelected] = useState("All");

	const categories = [
		"All",
		"Web Development",
		"App Development",
		"AI & Machine Learning",
		"IoT & Embedded Systems",
		"Data Analytics",
		"Python Tools",
	];

	const filterProjects =
		isSelected === "All"
			? Projects
			: Projects.filter((project) => project.categories.includes(isSelected));

	return (
		<article className="portfolio active" data-page="portfolio">
			<header>
				<h2 className="h2 article-title spacegrotesk">Portfolio</h2>
			</header>

			<section className="projects">
				{/* Desktop Filter */}
				<ul className="filter-list">
					{categories.map((cat) => (
						<li className="filter-item" key={cat}>
							<button
								className={isSelected === cat ? "active" : ""}
								onClick={() => setIsSelected(cat)}
							>
								{cat}
							</button>
						</li>
					))}
				</ul>

				{/* Mobile Filter */}
				<div className="filter-select-box md:hidden">
					<select
						className="w-full bg-[var(--eerie-black-2)] text-[var(--light-gray)] p-3 border border-[var(--jet)] rounded-xl text-sm"
						value={isSelected}
						onChange={(e) => setIsSelected(e.target.value)}
					>
						{categories.map((cat) => (
							<option value={cat} key={cat}>{cat}</option>
						))}
					</select>
				</div>

				{/* Project Grid */}
				<div className="grid md:grid-cols-2 grid-cols-1 gap-4 cursor-pointer">
					{filterProjects.map((project, index) => (
						<div
							key={index}
							onClick={() => sheetHandler(project)}
							className="bg-[#2b2b2c6a] hover:bg-[linear-gradient(0deg,_rgba(254,202,102,0.15)_0%,_transparent_100%)] bg-[linear-gradient(0deg,_rgba(254,202,102,0.05)_0%,_transparent_100%)] p-8 rounded-2xl text-white h-[300px] relative overflow-hidden border-[#363636] border group transition-all duration-300 hover:border-[#585858]"
						>
							<span className="spacegrotesk text-xl font-bold block">
								{project.title}
							</span>
							<span className="text-[#ffffffd8] font-thin mt-2 line-clamp-3 block">
								{project.description}
							</span>

							{project.img && project.img.length > 0 ? (
								<>
									<img
										src={project.img[0]}
										alt={project.title}
										className="absolute bottom-[-40px] h-[180px] rounded-lg shadow-[0_10px_50px_-12px_rgba(0,0,0,0.85)] left-8 group-hover:rotate-[-3deg] transition-transform group-hover:scale-[1.05] group-hover:translate-x-[-10px] w-[60%] object-cover bg-top"
									/>
									<img
										src={project.img[1] || project.img[0]}
										alt={project.title}
										className="absolute bottom-[-40px] h-[140px] rounded-lg shadow-[0_10px_50px_-12px_rgba(0,0,0,0.85)] right-8 group-hover:rotate-[3deg] transition-transform group-hover:scale-[1.05] group-hover:translate-x-[10px]"
									/>
								</>
							) : (
								<div className="absolute bottom-5 left-8 right-8 flex flex-wrap gap-2">
									{project.tools?.slice(0, 5).map((tool, i) => (
										<span
											key={i}
											className="text-xs px-2.5 py-1 bg-[#ffffff08] rounded-full text-yellow-200/70 border border-yellow-400/20"
										>
											{tool}
										</span>
									))}
								</div>
							)}
						</div>
					))}
				</div>

				{filterProjects.length === 0 && (
					<div className="text-center text-gray-500 py-16">
						<ion-icon name="folder-open-outline" style={{ fontSize: "48px" }}></ion-icon>
						<p className="mt-4 text-lg">No projects in this category yet.</p>
					</div>
				)}
			</section>
		</article>
	);
}
