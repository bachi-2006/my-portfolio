import React from "react";

export default function Contact() {
	return (
		<article className="contact active" data-page="contact">
			<header>
				<h2 className="h2 article-title">Contact</h2>
			</header>

			{/* Map */}

			<section className="mapbox" data-mapbox>
				<figure>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3170294889!2d78.24323212262038!3d17.41229792508498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1721065588811!5m2!1sen!2sin"
						width="600"
						height="450"
						style={{ border: 0 }}
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</figure>
			</section>

			{/* Contact Form */}

			<section className="contact-form">
				<h3 className="h3 form-title">Contact Form</h3>

				<form action="#" className="form" data-form>
					<div className="input-wrapper">
						<input
							type="text"
							name="fullname"
							className="form-input"
							placeholder="Full name"
							required
							data-form-input
						/>

						<input
							type="email"
							name="email"
							className="form-input"
							placeholder="Email address"
							required
							data-form-input
						/>
					</div>

					<textarea
						name="message"
						className="form-input"
						placeholder="Your Message"
						required
						data-form-input
					/>

					<button className="form-btn" type="submit" disabled data-form-btn>
						<ion-icon name="paper-plane"></ion-icon>
						<span>Send Message</span>
					</button>
				</form>
			</section>
		</article>
	);
}
