import { useState } from "react";
import toast from "react-hot-toast";
import { LuPhone, LuMail, LuMapPin, LuClock, LuSend } from "react-icons/lu";
import axios from "axios";

export default function ContactPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim() || !email.trim() || !message.trim()) {
			toast.error("Please fill out all required fields");
			return;
		}
		setIsSubmitting(true);
		try {
			await axios.post(import.meta.env.VITE_BACKEND_URL + "/contact", {
				name,
				email,
				subject,
				message
			});
			toast.success("Message sent successfully! We will contact you soon.");
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		} catch (error) {
			console.error("Error sending contact message:", error);
			toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-slate-950 text-white py-16 px-4">
			<div className="max-w-6xl mx-auto space-y-12">

				{/* Header */}
				<div className="text-center space-y-4 max-w-3xl mx-auto">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
						Get In Touch
					</p>
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-accent via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
						Contact Our Team
					</h1>
					<p className="text-slate-400 text-lg">
						Have questions about custom builds, stock availability, or repair warranties? Send us a message or visit our outlet.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

					{/* Contact Information */}
					<div className="lg:col-span-5 space-y-6">
						<h2 className="text-2xl font-bold text-white mb-6">Store Details</h2>

						<div className="flex items-start bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
							<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mr-4 shrink-0">
								<LuPhone size={20} />
							</div>
							<div>
								<h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Phone Support</h4>
								<p className="text-white mt-1 font-medium">+94 11 234 5678</p>
								<p className="text-xs text-slate-400 mt-0.5">Mobile: +94 77 123 4567</p>
							</div>
						</div>

						<div className="flex items-start bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
							<div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent mr-4 shrink-0">
								<LuMail size={20} />
							</div>
							<div>
								<h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Email Inquiry</h4>
								<p className="text-white mt-1 font-medium">givacreations2003@gmail.com</p>
								<p className="text-xs text-slate-400 mt-0.5">givacreations2003@gmail.com</p>
							</div>
						</div>

						<div className="flex items-start bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
							<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mr-4 shrink-0">
								<LuMapPin size={20} />
							</div>
							<div>
								<h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Showroom Outlet</h4>
								<p className="text-white mt-1 font-medium">123 Galle Road, Colombo 03</p>
								<p className="text-xs text-slate-400 mt-0.5">Sri Lanka</p>
							</div>
						</div>

						<div className="flex items-start bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
							<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mr-4 shrink-0">
								<LuClock size={20} />
							</div>
							<div>
								<h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Business Hours</h4>
								<p className="text-white mt-1 font-medium">Mon - Sat: 9:00 AM - 6:00 PM</p>
								<p className="text-xs text-slate-400 mt-0.5">Sunday & Poya Days: Closed</p>
							</div>
						</div>
					</div>

					{/* Message Form */}
					<div className="lg:col-span-7 bg-slate-900/60 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-lg shadow-2xl">
						<h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div>
									<label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="name">
										Name <span className="text-red-500">*</span>
									</label>
									<input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="John Doe"
										className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
										required
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="email">
										Email Address <span className="text-red-500">*</span>
									</label>
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="john@example.com"
										className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
										required
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="subject">
									Subject
								</label>
								<input
									id="subject"
									type="text"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									placeholder="Build consultation query..."
									className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="message">
									Message <span className="text-red-500">*</span>
								</label>
								<textarea
									id="message"
									rows={5}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									placeholder="Tell us what you need help with..."
									className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
									required
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full inline-flex items-center justify-center rounded-full bg-accent py-4 text-sm font-bold text-slate-950 shadow-lg shadow-accent/25 transition hover:bg-accent/90 disabled:opacity-50 gap-2 cursor-pointer"
							>
								<LuSend size={16} />
								<span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
							</button>
						</form>
					</div>
				</div>

				{/* Map Mockup */}
				<div className="w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-4">
					<h3 className="text-xl font-bold text-white">Find Us on Google Maps</h3>
					<div className="w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-col text-slate-500 p-6 relative overflow-hidden">
						{/* Stylized UI grid mockup for map background */}
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
						<div className="relative text-center z-10 space-y-2">
							<LuMapPin className="mx-auto text-accent text-3xl animate-bounce" />
							<p className="text-slate-300 font-semibold">TechNova Main Showroom</p>
							<p className="text-xs text-slate-400 max-w-sm">123 Galle Road, Colombo 03, Sri Lanka</p>
							<a
								href="https://maps.google.com"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block mt-3 bg-white/5 border border-slate-700 hover:border-accent rounded-full px-5 py-2 text-xs text-white transition"
							>
								Get Driving Directions
							</a>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
