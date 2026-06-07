import React from "react";

export default function Showcase() {
	return (
		<div className="hshowcase homebox flex flex-row items-center justify-between p-0 md:p-8 relative overflow-hidden">
			{/* Text content - visible on desktop, hidden on mobile */}
			<div className="hidden md:flex flex-col justify-center z-10 flex-1 pr-6 select-none">
				<span className="text-yellow-400 font-semibold uppercase text-xs tracking-widest mb-2 cristik">
					About Me
				</span>
				<h3 className="text-white text-2xl font-bold spacegrotesk mb-2">
					Digital Persona
				</h3>
				<p className="text-[#a1a1aa] text-sm leading-relaxed font-light">
					A customized AI-crafted representation highlighting the creative tech vision and development focus behind this portfolio.
				</p>
			</div>
			
			{/* Avatar Image */}
			<div className="absolute inset-0 w-full h-full md:relative md:w-[180px] md:h-[180px] md:flex-shrink-0 z-10 transition-all duration-300 hover:scale-[1.03]">
				<img
					className="w-full h-full rounded-2xl object-cover md:border md:border-[#363636] md:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
					src="/ai_avatar.png"
					alt="AI Avatar"
				/>
			</div>
		</div>
	);
}
