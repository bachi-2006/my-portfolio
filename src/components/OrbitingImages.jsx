import React from "react";
import ImageRotator from "./ImageRotator";

const OrbitingImages = () => {
	const orbits = [
		{
			radius: 110,
			imageSize: 40,
			speed: 30,
			images: [
				"c.svg",
				"python.svg",
				"javascript.svg",
				"html5.svg",
				"css.svg",
				"github.svg",
			],
		},
		{
			radius: 180,
			speed: 50,
			imageSize: 40,
			images: [
				"react.svg",
				"tailwindcss.svg",
				"vscode.svg",
				"figma.svg",
				"linux.svg",
				"vite.svg",
			],
		},
	];

	return (
		<div
			style={{ width: "400px", height: "400px", overflow: "hidden" }}
			className=" absolute bottom-[-140px] right-[-100px]"
		>
			<ImageRotator
				centralImage="/python.svg"
				orbits={orbits}
			/>
		</div>
	);
};

export default OrbitingImages;
