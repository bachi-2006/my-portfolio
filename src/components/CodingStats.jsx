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
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLeetcodeStats = async () => {
			try {
				const response = await axios.get(
					`https://leetcode-stats-api.herokuapp.com/${leetcodeHandle}`
				);
				setLeetcodeStats(response.data);
			} catch (error) {
				setError(error);
			}
		};

		const fetchCodeforcesStats = async () => {
			try {
				const response = await axios.get(
					`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`
				);
				setCodeforcesStats(response.data.result[0]);
			} catch (error) {
				setError(error);
			}
		};

		const fetchData = async () => {
			await fetchLeetcodeStats();
			await fetchCodeforcesStats();
			setLoading(false);
		};

		fetchData();
	}, [leetcodeHandle, codeforcesHandle]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	let totalSolved =
		leetcodeStats?.easySolved +
		leetcodeStats?.mediumSolved +
		leetcodeStats?.hardSolved;

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
					<p className="flex items-center gap-2">
						Rating - {codeforcesStats.rating}
					</p>
					<p className="flex items-center gap-2">
						Max Rating - {codeforcesStats.maxRating}
					</p>
					<p className="flex items-center gap-2">
						<p>Rank - {codeforcesStats.rank}</p>
					</p>
				</div>
			</div>

			<hr className="mx-4 opacity-30" />
			<div className="absolute bottom-[-210px] w-full">
				<div className=" relative overflow-hidden w-full">
					<Doughnut data={data} options={options} />

					<p className="text-center text-white absolute w-full h-full flex justify-center items-center flex-col top-[50px] left-0">
						<p className="text-2xl mb-4 font-bold">{totalSolved}</p>
						<p className="opacity-65">Questions Solved</p>
					</p>
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
					<p className="flex items-center gap-2">
						<div className="bg-[#1cbaba] w-[16px] h-[16px] rounded-full"></div>
						Easy - {leetcodeStats.easySolved}
					</p>
					<p className="flex items-center gap-2">
						<div className="bg-[#ffb700] w-[16px] h-[16px] rounded-full"></div>
						Medium - {leetcodeStats.mediumSolved}
					</p>
					<p className="flex items-center gap-2">
						<div className="bg-[#f63737] w-[16px] h-[16px] rounded-full"></div>
						Hard - {leetcodeStats.hardSolved}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CodingStats;
