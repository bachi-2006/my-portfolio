import React from "react";

const blogPosts = [
	{
		image: "/blogs/blog-1.jpg",
		category: "Data Science",
		date: "Mar 2026",
		title: "Getting Started with Data Visualization",
		text: "A beginner's guide to creating compelling data visualizations using Python and modern libraries.",
	},
	{
		image: "/blogs/blog-2.jpg",
		category: "Web Dev",
		date: "Feb 2026",
		title: "React Best Practices in 2026",
		text: "Key patterns and practices for building scalable React applications with modern tooling.",
	},
	{
		image: "/blogs/blog-3.jpg",
		category: "Machine Learning",
		date: "Jan 2026",
		title: "Introduction to Neural Networks",
		text: "Understanding the fundamentals of neural networks and how they power modern AI applications.",
	},
	{
		image: "/blogs/blog-4.jpg",
		category: "Design",
		date: "Dec 2025",
		title: "UI Design Principles for Developers",
		text: "Essential design principles every developer should know to create better user interfaces.",
	},
	{
		image: "/blogs/blog-5.jpg",
		category: "DSA",
		date: "Nov 2025",
		title: "Mastering Graph Algorithms",
		text: "A deep dive into graph traversal algorithms and their real-world applications.",
	},
	{
		image: "/blogs/blog-6.jpg",
		category: "Open Source",
		date: "Oct 2025",
		title: "Contributing to Open Source Projects",
		text: "Tips and strategies for making meaningful contributions to open-source communities.",
	},
];

export default function Blog() {
	return (
		<article className="blog active" data-page="blog">
			<header>
				<h2 className="h2 article-title">Blog</h2>
			</header>

			<section className="blog-posts">
				<ul className="blog-posts-list">
					{blogPosts.map((post, index) => (
						<li className="blog-post-item" key={index}>
							<a href="#">
								<figure className="blog-banner-box">
									<img
										src={post.image}
										alt={post.title}
										loading="lazy"
									/>
								</figure>
								<div className="blog-content">
									<div className="blog-meta">
										<span className="blog-category">{post.category}</span>
										<span className="dot"></span>
										<time>{post.date}</time>
									</div>
									<h3 className="h3 blog-item-title">{post.title}</h3>
									<p className="blog-text">{post.text}</p>
								</div>
							</a>
						</li>
					))}
				</ul>
			</section>
		</article>
	);
}
