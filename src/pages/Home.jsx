import React from "react";
import LikeButton from "../components/LikeButton";
import Resume from "../components/homeComponents/Resume";
import Skills from "../components/homeComponents/Skills";
import Quotes from "../components/homeComponents/Quotes";
import Projects from "../components/homeComponents/Projects";
import Library from "../components/homeComponents/Library";
import Showcase from "../components/homeComponents/Showcase";

export default function Home() {
	return (
		<article className="active" id="homearticle">
			{/* Hero Section */}
			<div
				style={{ gridAutoFlow: "dense", position: "relative" }}
				className="homebox p-6 pb-4 relative overflow-hidden sm:p-8 lg:p-[30px]"
			>
				<header>
					<h2 className="text-white cristik font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl">
						<span className="italic text-lg sm:text-xl md:text-2xl opacity-25 block">
							Hey there, I'm
						</span>
						<span className="cristik text-2xl sm:text-3xl md:text-4xl mt-2 block">
							Rohith Dachepally
						</span>
					</h2>
				</header>

				<section className="about-text mb-0 pb-0 mt-3">
					<div className="flex gap-1 sm:gap-2 text-xl sm:text-2xl md:text-3xl items-center">
						<span className="text-red-400 font-semibold">I Analyze,</span>
						<span className="text-yellow-400 cristik">Code &</span>
						<span className="text-green-400 spacegrotesk">Innovate</span>
					</div>
					<span className="block mt-1 sm:mt-2 text-base sm:text-lg md:text-xl font-medium opacity-45 text-gray-300">
						CS Undergrad @ VBIT | Data Analytics & IoT Enthusiast
					</span>
				</section>

				<img
					style={{
						mixBlendMode: "hard-light",
						maskImage: "linear-gradient(to right, transparent, black)",
					}}
					src="/code-bg.jpg"
					alt="Code background"
					className="hidden lg:block absolute z-[30] right-0 top-0 h-[130%] grayscale opacity-50 pointer-events-none"
				/>
			</div>

			{/* Bento Grid */}
			<div className="bentogrid h-full w-full grid mt-6 gap-6">
				{/* GitHub Streak */}
				<div className="github homebox flex items-center cursor-pointer overflow-hidden">
					<a
						href="https://github.com/bachi-2006"
						target="_blank"
						rel="noopener noreferrer"
						className="flex w-full h-full justify-center items-center"
					>
						<img
							className="cursor-pointer max-w-full"
							src="https://streak-stats.demolab.com/?user=bachi-2006&theme=rising-sun&hide_border=true&background=00000000"
							alt="GitHub Streak Stats"
						/>
					</a>
				</div>

				{/* Like Button */}
				<div className="showcase homebox relative overflow-hidden flex flex-col items-center justify-center">
					<span className="text-white cristik p-4 lg:text-2xl md:text-2xl text-xl text-center">
						Liked the <br /> Portfolio?
					</span>
					<div className="text-white cristik w-full flex justify-center items-center">
						<LikeButton />
					</div>
				</div>

				{/* Social Media Links */}
				<div className="home-social-media lg:flex md:flex grid grid-rows-2 grid-cols-2 flex-wrap gap-4 text-white md:gap-4">
					<div
						onClick={() =>
							window.open("https://www.linkedin.com/in/rohith-dachepally", "_blank")
						}
						className="homebox flex-1 flex items-center justify-center p-4 md:w-1/4"
					>
						<div>
							<ion-icon name="logo-linkedin"></ion-icon>
							<span>LinkedIn</span>
						</div>
					</div>
					<div
						onClick={() =>
							window.open("https://www.github.com/bachi-2006", "_blank")
						}
						className="homebox flex-1 flex items-center justify-center p-4 md:w-1/4"
					>
						<div>
							<ion-icon name="logo-github"></ion-icon>
							<span>GitHub</span>
						</div>
					</div>
					<div
						onClick={() =>
							window.open("https://www.instagram.com/_mr_decent_06", "_blank")
						}
						className="homebox flex-1 flex items-center justify-center p-4 md:w-1/4"
					>
						<div>
							<ion-icon name="logo-instagram"></ion-icon>
							<span>Instagram</span>
						</div>
					</div>
					<div
						onClick={() =>
							window.open("https://linktr.ee/rohith_dachepally", "_blank")
						}
						className="homebox flex-1 flex items-center justify-center p-4 md:w-1/4"
					>
						<div>
							<ion-icon name="link-outline"></ion-icon>
							<span>Linktree</span>
						</div>
					</div>
				</div>

				<Resume />
				<Skills />
				<Quotes />
				<Projects />
				<Library />
				<Showcase />
			</div>
		</article>
	);
}
