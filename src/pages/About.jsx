import React from "react";

export default function About() {
const Experience = [
{
company: "Google CrowdSource VBIT",
companyLogo:
"google-crowdsource.png",
role: "Hospitality Coordinator",
duration: "Jun 2025 - Present",
description:
"Coordinating hospitality operations for Crowdsource by Google India, managing events and ensuring smooth collaboration between teams and participants.",
},
{
company: "1M1B (1 Million for 1 Billion)",
companyLogo:
"https://www.google.com/s2/favicons?domain=1m1b.org&sz=128",
role: "Intern",
duration: "Aug 2025 - Nov 2025",
description:
"Completed an internship at 1M1B, contributing to projects focused on sustainable development and social impact through technology and innovation.",
},
{
company: "Chitrika VBIT",
companyLogo:
"https://www.google.com/s2/favicons?domain=vbithyd.ac.in&sz=128",
role: "Photographer",
duration: "Jul 2024 - Aug 2025",
description:
"Official photographer for Chitrika VBIT, capturing college events, cultural festivals, and creative moments. Developed expertise in event photography and visual storytelling.",
},
{
company: "VISWAM.AI",
companyLogo:
"https://www.google.com/s2/favicons?domain=viswam.ai&sz=128",
role: "AI Developer Intern",
duration: "Jun 2025 - Jul 2025",
description:
"Worked as an AI Developer Intern at VISWAM.AI, gaining hands-on experience in artificial intelligence development and machine learning applications.",
},
];

const Skills = [
{
category: "Programming Languages",
icon: "code-slash-outline",
skills: [
{ name: "C", level: 70 },
{ name: "Java", level: 80 },
{ name: "Python", level: 75 },
],
},
{
category: "Data & Analytics",
icon: "analytics-outline",
skills: [
{ name: "Microsoft PowerBI", level: 85 },
{ name: "Data Analysis", level: 80 },
{ name: "Statistics", level: 70 },
{ name: "SQL", level: 75 },
],
},
{
category: "Tools & Technologies",
icon: "hammer-outline",
skills: [
{ name: "Microsoft PowerPoint", level: 90 },
{ name: "Machine Learning", level: 65 },
{ name: "Data Visualization", level: 80 },
],
},
];

const Certifications = [
{
title: "Introduction to PowerBI",
issuer: "SimpliLearn",
link: "https://shorturl.at/vb7lV",
},
{
title: "Python Programming For Beginners",
issuer: "Udemy",
link: "https://shorturl.at/NHg1y",
},
];

return (
<article className="about active" data-page="about">
{/* About Me */}
<header>
<h2 className="h2 article-title cristik font-extralight">About Me</h2>
</header>

<section className="about-text max-w-[600px]">
<p>
Hey, I'm Rohith — a Tech Enthusiast and Computer Science undergrad
at Vignana Bharathi Institute of Technology (VBIT), Hyderabad.
Passionate about Engineering, Data Analytics, and building innovative
solutions with C, Java, and Python.
</p>
<p>
Interested in Data Analytics, Machine Learning, and turning raw data
into meaningful insights. I love exploring new technologies and
contributing to impactful projects.
</p>
</section>

{/* Services */}
<section className="service">
<h3 className="h3 service-title">What I Do</h3>
<ul className="service-list">
<li className="service-item">
<div className="service-icon-box">
<ion-icon name="analytics-outline" style={{ fontSize: "28px", color: "var(--orange-yellow-crayola)" }}></ion-icon>
</div>
<div className="service-content-box">
<h4 className="h4 service-item-title">Data Analytics</h4>
<p className="service-item-text">
Transforming raw data into meaningful insights using PowerBI,
SQL, and Python — from statistical analysis to interactive
dashboards and data visualization.
</p>
</div>
</li>
<li className="service-item">
<div className="service-icon-box">
<ion-icon name="hardware-chip-outline" style={{ fontSize: "28px", color: "var(--orange-yellow-crayola)" }}></ion-icon>
</div>
<div className="service-content-box">
<h4 className="h4 service-item-title">IoT & Embedded Systems</h4>
<p className="service-item-text">
Designing and building smart automation systems using Arduino,
IR sensors, and microcontrollers for real-world IoT
applications.
</p>
</div>
</li>
</ul>
</section>

{/* Experience */}
<section className="timeline">
<div className="title-wrapper">
<div className="icon-box">
<ion-icon name="briefcase-outline"></ion-icon>
</div>
<h3 className="h3 font-semibold">Experience</h3>
</div>

<ol className="timeline-list">
{Experience.map((role, index) => (
<li className="timeline-item" key={index}>
<div className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform">
<img
className="w-[50px] h-[50px] rounded-lg border border-gray-600 object-cover flex-shrink-0"
src={role.companyLogo}
alt={role.company}
/>
<div>
<h4 className="h4 timeline-item-title">
<b>{role.role}</b>
<br />
{role.company}
</h4>
<span>{role.duration}</span>
<p className="timeline-text">{role.description}</p>
</div>
</div>
</li>
))}
</ol>
</section>

<div className="separator"></div>

{/* Skills */}
<section className="skill">
<div className="title-wrapper">
<div className="icon-box mr-4">
<ion-icon name="hammer-outline"></ion-icon>
</div>
<h3 className="h3 font-semibold">My Skills</h3>
</div>

<div className="timeline-list">
{Skills.map((skillGroup, index) => (
<div className="mt-6 mr-8" key={index}>
<h4 className="skills-title cristik font-medium text-yellow-200 overflow-hidden mb-0 p-4">
<span className="flex gap-2 items-center text-2xl">
<ion-icon name={skillGroup.icon}></ion-icon>
<span className="text-lg opacity-75">{skillGroup.category}</span>
</span>
</h4>
<div className="flex flex-col gap-4 px-4">
{skillGroup.skills.map((s, sIndex) => (
<div key={sIndex}>
<div className="flex items-center justify-between mb-1">
<span className="text-sm text-white opacity-80">{s.name}</span>
</div>
<div className="h-1.5 bg-[#2a2a2b] rounded-full overflow-hidden">
<div
className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
style={{ width: `${s.level}%` }}
/>
</div>
</div>
))}
</div>
</div>
))}
</div>
</section>

<div className="separator"></div>

{/* Certifications */}
<section className="timeline">
<div className="title-wrapper">
<div className="icon-box">
<ion-icon name="ribbon-outline"></ion-icon>
</div>
<h3 className="h3 font-semibold">Certifications</h3>
</div>

<ol className="timeline-list">
{Certifications.map((cert, index) => (
<li className="timeline-item" key={index}>
<a
href={cert.link}
target="_blank"
rel="noopener noreferrer"
className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform"
>
<div className="w-[50px] h-[50px] rounded-lg border border-gray-600 bg-[#2a2a2b] flex items-center justify-center flex-shrink-0 text-2xl text-yellow-400">
<ion-icon name="ribbon"></ion-icon>
</div>
<div>
<h4 className="h4 timeline-item-title font-semibold">
{cert.title}
</h4>
<span>{cert.issuer}</span>
</div>
</a>
</li>
))}
</ol>
</section>

<div className="separator"></div>

{/* Education */}
<section className="timeline">
<div className="title-wrapper">
<div className="icon-box">
<ion-icon name="school-outline"></ion-icon>
</div>
<h3 className="h3 font-semibold">Education</h3>
</div>

<ol className="timeline-list">
<li className="timeline-item">
<div className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform">
<img
className="w-[50px] h-[50px] rounded-lg border border-gray-600 object-cover flex-shrink-0"
src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn6hKR-GCU3gVGS-WSr9MD3aTLuhb7cWBXMQ&s"
alt="VBIT"
/>
<div>
<h4 className="h4 timeline-item-title font-semibold">
Vignana Bharathi Institute of Technology (VBIT)
</h4>
<span>Bachelor of Technology - BTech, Computer Science</span>
<p className="timeline-text">Aug 2023 - Jul 2027</p>
<p className="timeline-text text-xs opacity-60">
Skills: C, Python, Java, Data Analytics, SQL
</p>
</div>
</div>
</li>
<li className="timeline-item">
<div className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform">
<img
className="w-[50px] h-[50px] rounded-lg border border-gray-600 object-cover flex-shrink-0"
src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VxNQv0DOYJ4NMwMAGwPC_Ht4YrZL5AuWSQ&s"
alt="Sri Chaitanya"
/>
<div>
<h4 className="h4 timeline-item-title font-semibold">
Sri Chaitanya College of Education
</h4>
<span>Intermediate Education</span>
<p className="timeline-text">Jul 2021 - Apr 2023</p>
</div>
</div>
</li>
</ol>
</section>

<div className="separator"></div>

{/* Achievements */}
<section className="timeline">
<div className="title-wrapper">
<div className="icon-box">
<ion-icon name="trophy-outline"></ion-icon>
</div>
<h3 className="h3 font-semibold">Achievements</h3>
</div>

<ol className="timeline-list">
<li className="timeline-item">
<div className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform">
<div className="w-[50px] h-[50px] rounded-lg border border-gray-600 bg-[#2a2a2b] flex items-center justify-center flex-shrink-0 text-2xl text-yellow-400">
<ion-icon name="trophy"></ion-icon>
</div>
<div>
<h4 className="h4 timeline-item-title font-semibold">
<span className="text-yellow-400">1st Place</span> — Sowparnika-2K24
</h4>
<span>IETE-ISF VBIT | February 2024</span>
<p className="timeline-text">
Won first place in the Prototype category at Sowparnika-2K24, organized by IETE-ISF at Vignana Bharathi Institute of Technology (VBIT). Built an IR based Smart Home Design using Arduino and IR sensors, demonstrating real-time sensor control and intelligent automation.
</p>
</div>
</div>
</li>
</ol>
</section>
</article>
);
}
