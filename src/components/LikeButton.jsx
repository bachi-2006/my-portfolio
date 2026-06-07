import React, { useState } from "react";

const LikeButton = () => {
	const [isLiked, setIsLiked] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("portfolio_liked") === "true";
		}
		return false;
	});

	const [likesCount, setLikesCount] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("portfolio_likes_count");
			if (saved) return parseInt(saved, 10);
			const base = 124;
			localStorage.setItem("portfolio_likes_count", base.toString());
			return base;
		}
		return 124;
	});

	const handleClick = () => {
		const nextLiked = !isLiked;
		setIsLiked(nextLiked);
		localStorage.setItem("portfolio_liked", nextLiked ? "true" : "false");
		
		const nextCount = nextLiked ? likesCount + 1 : likesCount - 1;
		setLikesCount(nextCount);
		localStorage.setItem("portfolio_likes_count", nextCount.toString());
	};

	const heartGrid = [
		[0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
		[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];

	return (
		<div className="flex flex-col items-center gap-3">
			<button
				onClick={handleClick}
				className={`
				 p-6 rounded-full border-2 border-black
				${isLiked ? "bg-[#500606]" : "bg-[#313131]"}
				transition-[transform,background-color] duration-300 ease-in-out
				focus:outline-none shadow-lg
				transform hover:scale-110
			  `}
			>
				<div className="grid grid-cols-10 gap-1 ">
					{heartGrid.map((row, rowIndex) =>
						row.map((cell, cellIndex) => (
							<div
								key={`${rowIndex}-${cellIndex}`}
								className={`
								w-[5px] h-[5px]
								${
									cell === 1
										? isLiked
											? "bg-[#cf3333]"
											: "bg-gray-500"
										: "bg-transparent"
								}
								${isLiked && cell === 1 ? "animate-pulse" : ""}
							  `}
							/>
						))
					)}
				</div>
			</button>
			<span className="text-[#a1a1aa] text-xs font-mono select-none tracking-widest">
				{likesCount} LIKES
			</span>
		</div>
	);
};

export default LikeButton;
