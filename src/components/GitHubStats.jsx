import React, { useState } from "react";

export default function GitHubStats() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	return (
		<div className="relative w-full h-full flex items-center justify-center min-h-[140px] md:min-h-[195px] select-none p-4">
			{/* Skeleton Loader Shimmer */}
			{loading && !error && (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1e1f] rounded-2xl p-6">
					<div className="w-[80%] h-4 bg-gray-800/60 rounded animate-pulse mb-3"></div>
					<div className="w-[60%] h-8 bg-gray-800/60 rounded animate-pulse mb-3"></div>
					<div className="w-[45%] h-3 bg-gray-800/60 rounded animate-pulse"></div>
				</div>
			)}

			{/* Custom Fallback Card (Offline / Blocked / Down) */}
			{error ? (
				<div className="flex flex-col items-center justify-center text-center w-full h-full p-4 fade-in">
					<div className="text-yellow-400 text-3xl sm:text-4xl mb-2 flex items-center justify-center">
						<ion-icon name="logo-github"></ion-icon>
					</div>
					<h4 className="text-white font-bold spacegrotesk text-base sm:text-lg">
						GitHub Activity
					</h4>
					<span className="text-gray-400 text-xs mt-1">@bachi-2006</span>
					<div className="mt-3 px-4 py-1.5 bg-[#ffffff08] hover:bg-[#ffffff12] rounded-full text-yellow-300 text-xs border border-yellow-400/20 transition-all font-light flex items-center gap-1.5">
						<span>View Contributions</span>
						<ion-icon name="open-outline" style={{ fontSize: "12px" }}></ion-icon>
					</div>
				</div>
			) : (
				<img
					className={`cursor-pointer max-w-full object-contain transition-all duration-500 ${
						loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
					}`}
					src="https://streak-stats.demolab.com/?user=bachi-2006&theme=rising-sun&hide_border=true&background=00000000"
					alt="GitHub Streak Stats"
					onLoad={() => setLoading(false)}
					onError={() => setError(true)}
				/>
			)}
		</div>
	);
}
