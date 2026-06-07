import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Title,
	CategoryScale,
	LinearScale,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	Title,
	CategoryScale,
	LinearScale
);

const CodingStats = ({ leetcodeHandle, codeforcesHandle }) => {
	const [leetcodeStats, setLeetcodeStats] = useState(null);
	const [codeforcesStats, setCodeforcesStats] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLeetcodeStats = async () => {
			try {
				const response = await axios.get(
					`https://leetcode-stats-api.herokuapp.com/${leetcodeHandle}`
				);
				if (response.data && response.data.status !== "error") {
					setLeetcodeStats(response.data);
				} else {
					setLeetcodeStats({ easySolved: 95, mediumSolved: 110, hardSolved: 15 });
				}
			} catch (error) {
				console.error("Error fetching LeetCode stats, using fallbacks:", error);
				setLeetcodeStats({ easySolved: 95, mediumSolved: 110, hardSolved: 15 });
			}
		};

		const fetchCodeforcesStats = async () => {
			try {
				const response = await axios.get(
					`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`
				);
				if (response.data && response.data.status === "OK") {
					setCodeforcesStats(response.data.result[0]);
				} else {
					setCodeforcesStats({ rating: 890, maxRating: 940, rank: "newbie" });
				}
			} catch (error) {
				console.error("Error fetching Codeforces stats, using fallbacks:", error);
				setCodeforcesStats({ rating: 890, maxRating: 940, rank: "newbie" });
			}
		};

		const fetchData = async () => {
			setLoading(true);
			await Promise.all([fetchLeetcodeStats(), fetchCodeforcesStats()]);
			setLoading(false);
		};

		fetchData();
	}, [leetcodeHandle, codeforcesHandle]);

	if (loading) return <div className="text-center text-gray-400 p-6">Loading statistics...</div>;

	let totalSolved =
		(leetcodeStats?.easySolved || 0) +
		(leetcodeStats?.mediumSolved || 0) +
		(leetcodeStats?.hardSolved || 0);

	const data = {
		labels: ["Easy", "Medium", "Hard"],
		datasets: [
			{
				label: "LeetCode",
				data: [
					leetcodeStats?.easySolved || 0,
					leetcodeStats?.mediumSolved || 0,
					leetcodeStats?.hardSolved || 0,
				],
				backgroundColor: [
					"#254545", // Easy
					"#534520", // Medium
					"#512b2b", // Hard
				],
				borderColor: [
					"#1cbaba", // Easy
					"#ffb700", // Medium
					"#f63737", // Hard
				],
				borderWidth: 1.5,
			},
		],
	};

	const options = {
		radius: 90,
		circumference: 180, // Half circle
		rotation: -90, // Start at the top
		cutout: "50%", // Adjust for the speedometer look
		plugins: {
			legend: {
				display: false // Hide the legend
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
				},
			},
		},
	};

	return (
		<div className="relative ">

			{/* Codeforces stats */}
			<div className="flex items-center w-full  justify-evenly">
				<img
					className="w-[50px]"
					src="/codeforces.svg"
					alt="Codeforces"
				/>
				<div className="text-white p-4">
					<div className="flex items-center gap-2 text-sm">
						Rating - {codeforcesStats?.rating || 0}
					</div>
					<div className="flex items-center gap-2 text-sm">
						Max Rating - {codeforcesStats?.maxRating || 0}
					</div>
					<div className="flex items-center gap-2 text-sm">
						Rank - {codeforcesStats?.rank || "N/A"}
					</div>
				</div>
			</div>

			<hr className="mx-4 opacity-30" />
			<div className="absolute bottom-[-210px] w-full">
				<div className=" relative overflow-hidden w-full">
					<Doughnut data={data} options={options} />

					<div className="text-center text-white absolute w-full h-full flex justify-center items-center flex-col top-[50px] left-0">
						<span className="text-2xl mb-4 font-bold">{totalSolved}</span>
						<span className="opacity-65 text-sm">Questions Solved</span>
					</div>
				</div>
			</div>

			{/* Leetcode Stats */}
			<div className="flex items-center w-full  justify-evenly">
				<img
					className="w-[50px]"
					src="/leetcode.png"
					alt="LeetCode"
				/>
				<div className="text-white p-4">
					<div className="flex items-center gap-2 text-sm">
						<div className="bg-[#1cbaba] w-[12px] h-[12px] rounded-full"></div>
						Easy - {leetcodeStats?.easySolved || 0}
					</div>
					<div className="flex items-center gap-2 text-sm">
						<div className="bg-[#ffb700] w-[12px] h-[12px] rounded-full"></div>
						Medium - {leetcodeStats?.mediumSolved || 0}
					</div>
					<div className="flex items-center gap-2 text-sm">
						<div className="bg-[#f63737] w-[12px] h-[12px] rounded-full"></div>
						Hard - {leetcodeStats?.hardSolved || 0}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CodingStats;
