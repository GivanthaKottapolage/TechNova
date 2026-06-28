import { LuShieldCheck, LuCpu, LuSparkles, LuWrench } from "react-icons/lu";

export default function AboutPage() {
	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-[#0D1117] text-white py-16 px-4">
			<div className="max-w-6xl mx-auto space-y-16">
				
				{/* Hero Section */}
				<div className="text-center space-y-4 max-w-3xl mx-auto">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
						Who We Are
					</p>
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-accent via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
						We Power Your Tech Journey
					</h1>
					<p className="text-slate-400 text-lg">
						TechNova (formerly Isuri Technologies) is your ultimate destination for high-end custom PC builds, genuine hardware parts, and professional repair services.
					</p>
				</div>

				{/* Statistics / Trust Indicators */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
					<div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
						<h3 className="text-3xl font-bold text-accent">5,000+</h3>
						<p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Happy Customers</p>
					</div>
					<div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
						<h3 className="text-3xl font-bold text-accent">100%</h3>
						<p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Genuine Parts</p>
					</div>
					<div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
						<h3 className="text-3xl font-bold text-accent">10+ Years</h3>
						<p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Industry Experience</p>
					</div>
					<div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
						<h3 className="text-3xl font-bold text-accent">24/7</h3>
						<p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Expert Support</p>
					</div>
				</div>

				{/* Our Pillars */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-lg hover:border-accent/25 transition duration-300">
						<div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 border border-accent/10">
							<LuCpu size={24} />
						</div>
						<h3 className="text-xl font-bold mb-3 text-white">Custom PC Assembly</h3>
						<p className="text-slate-400 text-sm leading-relaxed">
							From budget rigs for homework to high-end workstations and gaming monsters, we design, test, and assemble machines tailored precisely to your requirements.
						</p>
					</div>

					<div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-lg hover:border-accent/25 transition duration-300">
						<div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-6 border border-accent/20">
							<LuShieldCheck size={24} />
						</div>
						<h3 className="text-xl font-bold mb-3 text-white">Guaranteed Authenticity</h3>
						<p className="text-slate-400 text-sm leading-relaxed">
							We stand behind everything we sell. Every GPU, motherboard, RAM stick, and power supply unit is 100% brand new, authentic, and backed by manufacturer warranty.
						</p>
					</div>

					<div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-lg hover:border-accent/25 transition duration-300">
						<div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 border border-accent/10">
							<LuWrench size={24} />
						</div>
						<h3 className="text-xl font-bold mb-3 text-white">Expert Repair Services</h3>
						<p className="text-slate-400 text-sm leading-relaxed">
							Faced with diagnostics troubles, slow setups, or hardware failure? Our seasoned techs execute clean upgrades (SSD/RAM) and board-level repairs in no time.
						</p>
					</div>
				</div>

				{/* Our Story / Brand Narrative */}
				<div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800/60 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
					<div className="w-full md:w-1/2 space-y-6">
						<div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent border border-accent/10 font-medium">
							<LuSparkles size={12} />
							<span>The TechNova Promise</span>
						</div>
						<h2 className="text-3xl font-bold text-white">Crafted by Enthusiasts, Built for Performers</h2>
						<p className="text-slate-400 text-sm leading-relaxed">
							Founded by hardware builders, TechNova started with a singular vision: to make top-tier gaming equipment and hardware servicing reliable, transparent, and accessible to everyone. We believe a PC is not just a tool, but an extension of your creative and competitive capabilities. 
						</p>
						<p className="text-slate-400 text-sm leading-relaxed">
							We carefully source all components, subject custom rigs to rigorous stress-testing, and handle customer repairs with extreme precision. We are committed to transparency, clear diagnostics advice, and excellent post-purchase support.
						</p>
					</div>
					
					<div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
						<div className="h-40 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-slate-800/80 flex flex-col justify-center p-6 text-center">
							<span className="text-3xl font-bold text-white mb-1">01</span>
							<span className="text-xs text-slate-400 uppercase tracking-wider">Quality First</span>
						</div>
						<div className="h-40 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-slate-800/80 flex flex-col justify-center p-6 text-center">
							<span className="text-3xl font-bold text-white mb-1">02</span>
							<span className="text-xs text-slate-400 uppercase tracking-wider">Custom Tailored</span>
						</div>
						<div className="h-40 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-slate-800/80 flex flex-col justify-center p-6 text-center">
							<span className="text-3xl font-bold text-white mb-1">03</span>
							<span className="text-xs text-slate-400 uppercase tracking-wider">Transparent Advice</span>
						</div>
						<div className="h-40 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-slate-800/80 flex flex-col justify-center p-6 text-center">
							<span className="text-3xl font-bold text-white mb-1">04</span>
							<span className="text-xs text-slate-400 uppercase tracking-wider">Reliable Support</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
