import React from "react";

const Experience = [
{
company: "Google CrowdSource VBIT",
companyLogo:
"/google-crowdsource.png",
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
    title: "AWS Academy Graduate — AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    category: "Cloud & OS",
    link: "/certificates/aws_cloud_foundations.pdf"
  },
  {
    title: "AWS Academy Graduate — AWS Academy Cloud Architecting",
    issuer: "AWS Academy",
    category: "Cloud & OS",
    link: "/certificates/aws_cloud_architecting.pdf"
  },
  {
    title: "CISCO Linux Essentials",
    issuer: "Cisco Networking Academy",
    category: "Cloud & OS",
    link: "/certificates/cisco_linux_essentials.pdf"
  },
  {
    title: "CISCO Linux Certification",
    issuer: "Cisco Networking Academy",
    category: "Cloud & OS",
    link: "/certificates/cisco_linux.pdf"
  },
  {
    title: "Google Cohort-8 Android Developer",
    issuer: "Google / Android Developer",
    category: "Development & Other",
    link: "/certificates/cohort8_android_developer.pdf"
  },
  {
    title: "HackerRank SQL (Advanced)",
    issuer: "HackerRank",
    category: "Data & AI",
    link: "/certificates/hackerrank_sql_advanced.pdf"
  },
  {
    title: "IBM Generative AI Developer",
    issuer: "IBM",
    category: "Data & AI",
    link: "/certificates/ibm_generative_ai.pdf"
  },
  {
    title: "HP LIFE Data Analytics",
    issuer: "HP LIFE",
    category: "Data & AI",
    link: "/certificates/hp_life_data_analytics.pdf"
  },
  {
    title: "Data Analyst Certification",
    issuer: "Oneroadmap",
    category: "Data & AI",
    link: "/certificates/oneroadmap_data_analyst.pdf"
  },
  {
    title: "Introduction to PowerBI",
    issuer: "SimpliLearn",
    category: "Data & AI",
    link: "/certificates/simplilearn_powerbi.pdf"
  },
  {
    title: "Python Programming For Beginners",
    issuer: "Udemy",
    category: "Development & Other",
    link: "/certificates/udemy_python_beginners.pdf"
  },
  {
    title: "C Programming Certification",
    issuer: "Edube",
    category: "Development & Other",
    link: "/certificates/c_programming_edube.pdf"
  },
  {
    title: "AI Workshop Certification",
    issuer: "Be10x",
    category: "Data & AI",
    link: "/certificates/be10x_ai_workshop.pdf"
  },
  {
    title: "ChatGPT and AI Workshop",
    issuer: "AI Workshop",
    category: "Data & AI",
    link: "/certificates/chatgpt_ai_workshop.pdf"
  },
  {
    title: "Unity Game Development (FPV) — LinkedIn Post",
    issuer: "LinkedIn",
    category: "Development & Other",
    link: "https://www.linkedin.com/posts/rohith-dachepally_unity-gamedevelopment-fpv-ugcPost-7433500447635648513-s34Y?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEl9SysBbDFLSO6WL6SVptf-ju5KIu3uIk8"
  }
];

export default function About() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const categories = ["All", "Cloud & OS", "Data & AI", "Development & Other"];
  
  const filteredCerts = selectedCategory === "All"
    ? Certifications
    : Certifications.filter(c => c.category === selectedCategory);

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

  <div className="flex gap-2 mb-6 flex-wrap">
    {categories.map(cat => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
          selectedCategory === cat
            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md shadow-yellow-500/25"
            : "bg-[#2a2a2b] text-gray-400 hover:text-white"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>

  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {filteredCerts.map((cert, index) => (
      <li
        className="bg-[#212123] border border-gray-800 rounded-2xl p-5 hover:translate-y-[-4px] hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-300 cursor-pointer"
        key={index}
        onClick={() => window.open(cert.link, "_blank")}
      >
        <div className="flex gap-4 items-start">
          <div className="w-[50px] h-[50px] rounded-xl border border-gray-800 bg-[#2a2a2b] flex items-center justify-center flex-shrink-0 text-xl text-yellow-400">
            <ion-icon name="ribbon-outline"></ion-icon>
          </div>
          <div className="flex-1">
            <h4 className="text-white text-base font-semibold leading-tight hover:text-yellow-400 transition-colors">
              {cert.title}
            </h4>
            <span className="text-xs text-gray-400 block mt-1">{cert.issuer}</span>
            <span className="inline-block mt-3 text-xs bg-yellow-500/10 text-yellow-400 px-2.5 py-0.5 rounded-full font-medium">
              {cert.category}
            </span>
          </div>
        </div>
      </li>
    ))}
  </ul>
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
	<a href="https://www.linkedin.com/posts/rohith-dachepally_proud-to-share-our-award-winning-project-ugcPost-7266166692341252096-bLFU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEl9SysBbDFLSO6WL6SVptf-ju5KIu3uIk8" target="_blank" rel="noopener noreferrer" className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform">
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
	</a>
</li>
<li className="timeline-item">
	<a href="https://www.linkedin.com/posts/rohith-dachepally_unity-gamedevelopment-fpv-ugcPost-7433500447635648513-s34Y?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEl9SysBbDFLSO6WL6SVptf-ju5KIu3uIk8" target="_blank" rel="noopener noreferrer" className="flex gap-4 hover:translate-x-2 duration-200 cursor-pointer transition-transform">
		<div className="w-[50px] h-[50px] rounded-lg border border-gray-600 bg-[#2a2a2b] flex items-center justify-center flex-shrink-0 text-2xl text-yellow-400">
			<ion-icon name="trophy"></ion-icon>
		</div>
		<div>
			<h4 className="h4 timeline-item-title font-semibold">
				<span className="text-yellow-400">1st Place</span> — Frame 2 Reality
			</h4>
			<span>VBIT | February 2026</span>
			<p className="timeline-text">
				Secured First Place in Frame 2 Reality (VBIT). In a constrained timeframe our team built a complete
				First‑Person Perspective (FPV) coin‑collection game in Unity — a polished, playable demo ready for
				presentation. The prototype included smooth FPV controls, dynamic coin spawning and collection,
				a real‑time scoring system, environment tuning, and performance optimizations.
			</p>
		</div>
	</a>
</li>
</ol>
</section>
</article>
);
}
