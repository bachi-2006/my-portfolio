import React, { useState, useEffect, useRef } from "react";
import { ReactTerminal } from "react-terminal";

export default function Contact() {
	const [isCliMode, setIsCliMode] = useState(false);
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const terminalRef = useRef(null);

	const charLimit = 500;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (fullname && email && message) {
			submitForm(fullname, email, message);
		}
	};

	const submitForm = (nameVal, emailVal, messageVal) => {
		setSubmitted(true);
		// Reset state
		setFullname("");
		setEmail("");
		setMessage("");
		setTimeout(() => {
			setSubmitted(false);
		}, 6000);
	};

	// Parse custom flags like --name, --email, --message
	const parseArgs = (args) => {
		const params = { name: "", email: "", message: "" };
		const nameIdx = args.findIndex(x => x === "--name" || x === "-n");
		const emailIdx = args.findIndex(x => x === "--email" || x === "-e");
		const msgIdx = args.findIndex(x => x === "--message" || x === "-m");

		const getVal = (idx) => {
			if (idx === -1 || idx + 1 >= args.length) return "";
			const words = [];
			for (let i = idx + 1; i < args.length; i++) {
				if (args[i].startsWith("-")) break;
				words.push(args[i]);
			}
			return words.join(" ").replace(/^["']|["']$/g, "");
		};

		params.name = getVal(nameIdx);
		params.email = getVal(emailIdx);
		params.message = getVal(msgIdx);
		return params;
	};

	// CLI Terminal Commands
	const commands = {
		help: () => (
			<div className="space-y-1.5 font-mono text-xs">
				<p className="text-yellow-400 font-semibold">Available Commands:</p>
				<p>  <span className="text-[#38bdf8] font-bold">contact</span>   - Submit a message to Rohith</p>
				<p className="text-gray-500 pl-4">Usage: contact --name "Your Name" --email "your@email.com" --message "Your message"</p>
				<p className="text-gray-500 pl-4">Shorthand: contact -n "Your Name" -e "your@email.com" -m "Your message"</p>
				<p>  <span className="text-[#38bdf8] font-bold">socials</span>   - View social links & profiles</p>
				<p>  <span className="text-[#38bdf8] font-bold">about</span>     - Display digital resume shortcard</p>
				<p>  <span className="text-[#38bdf8] font-bold">gui</span>       - Switch back to visual form interface</p>
				<p>  <span className="text-[#38bdf8] font-bold">clear</span>     - Clear terminal logs</p>
			</div>
		),
		contact: (args) => {
			const { name, email: emailVal, message: messageVal } = parseArgs(args);
			if (!name || !emailVal || !messageVal) {
				return (
					<div className="text-red-400 font-mono text-xs space-y-1">
						<p>Error: Missing required fields.</p>
						<p>Syntax: contact --name "Name" --email "Email" --message "Message"</p>
						<p>Or try: contact -n "Name" -e "Email" -m "Message"</p>
					</div>
				);
			}
			submitForm(name, emailVal, messageVal);
			return (
				<div className="text-green-400 font-mono text-xs space-y-1">
					<p>✔ Message processing success!</p>
					<p>  Name: <span className="text-white">{name}</span></p>
					<p>  Email: <span className="text-white">{emailVal}</span></p>
					<p>  Message: <span className="text-white">{messageVal}</span></p>
					<p className="text-yellow-400">Submitting contact form state...</p>
				</div>
			);
		},
		socials: () => (
			<div className="space-y-1 font-mono text-xs">
				<p>🔗 <span className="font-semibold">LinkedIn:</span> <a href="https://www.linkedin.com/in/rohith-dachepally" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">rohith-dachepally</a></p>
				<p>🔗 <span className="font-semibold">GitHub:</span> <a href="https://github.com/bachi-2006" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">bachi-2006</a></p>
				<p>🔗 <span className="font-semibold">Instagram:</span> <a href="https://www.instagram.com/_mr_decent_06" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">_mr_decent_06</a></p>
				<p>🔗 <span className="font-semibold">Linktree:</span> <a href="https://linktr.ee/rohith_dachepally" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">rohith_dachepally</a></p>
			</div>
		),
		about: () => (
			<div className="space-y-1.5 font-mono text-xs text-gray-300">
				<p className="text-yellow-400 font-bold text-sm">Rohith Dachepally</p>
				<p className="text-xs text-gray-500">CS Undergrad @ VBIT | Data Analytics & IoT Enthusiast</p>
				<p className="mt-1">Built award winning IR designs, computer vision OS automators,</p>
				<p>and real-time peripheral keyboard visualizers.</p>
			</div>
		),
		gui: () => {
			setTimeout(() => setIsCliMode(false), 500);
			return "Restoring visual form layout...";
		},
		clear: () => "Terminal logs cleared."
	};

	useEffect(() => {
		if (isCliMode && terminalRef.current) {
			terminalRef.current.focusTerminal();
		}
	}, [isCliMode]);

	return (
		<article className="contact active" data-page="contact">
			<header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
				<h2 className="h2 article-title mb-0">Contact</h2>
				
				{/* Mode Toggle Switch */}
				<div className="flex bg-[#202022] border border-gray-800 rounded-xl p-1 shadow-inner gap-1">
					<button
						onClick={() => setIsCliMode(false)}
						className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
							!isCliMode
								? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md"
								: "text-gray-400 hover:text-white"
						}`}
					>
						<ion-icon name="create-outline"></ion-icon>
						<span>GUI Form</span>
					</button>
					<button
						onClick={() => setIsCliMode(true)}
						className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
							isCliMode
								? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md"
								: "text-gray-400 hover:text-white"
						}`}
					>
						<ion-icon name="terminal-outline"></ion-icon>
						<span>Developer CLI</span>
					</button>
				</div>
			</header>

			{isCliMode ? (
				/* Terminal Shell Mode */
				<div className="h-[450px] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl bg-[#1e1e1f] relative">
					<div className="absolute top-3 left-4 flex gap-1.5 z-10">
						<span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
						<span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
						<span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
						<span className="text-[10px] text-gray-500 font-mono ml-4 select-none">rohith@workspace:~/contact</span>
					</div>
					<div className="w-full h-full pt-8 pb-2">
						<ReactTerminal
							ref={terminalRef}
							commands={commands}
							prompt="visitor@rohith-pc:~$ "
							theme="my-custom-theme"
							welcomeMessage="React CLI Console. Type 'help' to see active commands."
							errorMessage="Command unrecognized. Type 'help' for instructions."
							themes={{
								"my-custom-theme": {
									themeBGColor: "#1e1e1f",
									themeToolbarColor: "#1e1e1f",
									themeColor: "#ffffff",
									themePromptColor: "#ffdb70",
								},
							}}
						/>
					</div>
				</div>
			) : (
				/* Standard Form Mode */
				<>
					{/* Map */}
					<section className="mapbox" data-mapbox>
						<figure>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3170294889!2d78.24323212262038!3d17.41229792508498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1721065588811!5m2!1sen!2sin"
								width="600"
								height="450"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</figure>
					</section>

					{/* Contact Form */}
					<section className="contact-form">
						<h3 className="h3 form-title">Contact Form</h3>

						{submitted ? (
							<div className="bg-[#212123] border border-green-500/30 text-green-400 p-8 rounded-2xl text-center flex flex-col items-center gap-3 transition-all duration-300 shadow-lg">
								<div className="w-[60px] h-[60px] rounded-full bg-green-500/10 flex items-center justify-center text-3xl text-green-500 animate-bounce">
									<ion-icon name="checkmark-circle-outline"></ion-icon>
								</div>
								<h4 className="text-white text-lg font-semibold spacegrotesk">Message Sent Successfully!</h4>
								<p className="text-gray-400 text-sm font-light">Thank you for reaching out! Rohith will get back to you shortly.</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="form">
								<div className="input-wrapper">
									<div className="relative">
										<input
											type="text"
											name="fullname"
											className="form-input w-full bg-transparent border-gray-800 focus:border-yellow-400 rounded-xl"
											placeholder="Full name"
											required
											value={fullname}
											onChange={(e) => setFullname(e.target.value)}
										/>
									</div>

									<div className="relative">
										<input
											type="email"
											name="email"
											className="form-input w-full bg-transparent border-gray-800 focus:border-yellow-400 rounded-xl"
											placeholder="Email address"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>

								<div className="relative mb-2">
									<textarea
										name="message"
										className="form-input w-full bg-transparent border-gray-800 focus:border-yellow-400 rounded-xl resize-none h-[140px]"
										placeholder="Your Message"
										required
										maxLength={charLimit}
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									{/* Live character limit display */}
									<span className="absolute bottom-3 right-4 text-[10px] text-gray-500 font-mono">
										{message.length} / {charLimit}
									</span>
								</div>

								<button
									className="form-btn cursor-pointer transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
									type="submit"
									disabled={!fullname || !email || !message}
								>
									<ion-icon name="paper-plane"></ion-icon>
									<span>Send Message</span>
								</button>
							</form>
						)}
					</section>
				</>
			)}
		</article>
	);
}
