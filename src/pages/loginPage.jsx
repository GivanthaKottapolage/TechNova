import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const googleLogin = useGoogleLogin({
		onSuccess: (response) => { 
			setIsLoading(true);
			axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
				token: response.access_token,
			}).then((res) => {
				localStorage.setItem("token", res.data.token);
				if (res.data.role == "admin") {
					navigate("/admin");
				} else {
					navigate("/");
				}
				toast.success("Login successful!.");
				setIsLoading(false);
			}).catch((err) => {
				console.log(err);
			});
			setIsLoading(false);
		 },
		onError: () => { toast.error("Google Login Failed"); },
		onNonOAuthError: () => { toast.error("Google Login Failed"); },
	})

	async function login() {
		console.log("Login button clicked");
		console.log("Email:", email);
		console.log("Password:", password);
		setIsLoading(true);
		try {
			const res = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/login",
				{
					email: email,
					password: password,
				}
			);

			console.log(res.data.token);

			localStorage.setItem("token", res.data.token);
			console.log();
			if (res.data.role == "admin") {
				//window.location.href = "/admin";
				navigate("/admin");
			} else {
				//window.location.href = "/";
				navigate("/");
			}

			//alert("Login successful! Welcome back.");

			toast.success("Login successful! Welcome back.");
			setIsLoading(false);
		} catch (err) {
			//alert("Login failed! Please check your credentials and try again.");
			toast.error("Login failed! Please check your credentials and try again.");

			console.log("Error during login:");
			console.log(err);
			setIsLoading(false);
		}
	}

	return (
		<div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col md:flex-row">
			<div className="w-full md:w-[50%] h-1/2 md:h-full flex justify-center items-center flex-col p-[30px] md:p-[50px] bg-slate-950/40 backdrop-blur-xs">
				<img
					src="/logo.png"
					alt="logo"
					className="w-[120px] h-[120px] mb-4 object-contain rounded-2xl shadow-lg border border-slate-700/50 bg-slate-900/10 p-2"
				/>
				<h1 className="text-[32px] md:text-[42px] leading-tight text-gold text-center font-extrabold tracking-tight mb-2">
					Plug In. Power Up. Play Hard.
				</h1>
				<p className="text-[18px] md:text-[22px] text-white/95 font-medium italic text-center max-w-md">
					Your Ultimate Destination for Gaming Gear
				</p>
			</div>
			<div className="w-full md:w-[50%] h-1/2 md:h-full flex justify-center items-center p-4">
				<div className="w-[450px] max-w-full h-[580px] bg-slate-950/80 border border-slate-800/80 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col justify-center items-center p-[30px] md:p-[40px]">
					<h1 className="text-[32px] font-bold mb-[24px] text-white">
						Login
					</h1>
					<input
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						placeholder="your email"
						className="w-full h-[50px] mb-[16px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
					/>
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						placeholder="your password"
						className="w-full h-[50px] mb-[12px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
					/>
					<p className="text-white/80 text-xs w-full mb-[24px] text-right">
						Forget your password?{" "}
						<Link to="/forgot-password" className="text-gold font-semibold hover:underline">
							Reset it here
						</Link>
					</p>

					<button
						onClick={login}
						className="w-full h-[50px] mb-[16px] bg-accent text-slate-950 font-bold text-[18px] rounded-xl border-2 border-accent hover:bg-slate-900 hover:text-accent transition-all duration-200 cursor-pointer"
					>
						Login
					</button>
					<button 
						onClick={googleLogin} 
						className="w-full h-[50px] mb-[20px] bg-accent text-slate-950 font-bold text-[18px] rounded-xl border-2 border-accent hover:bg-slate-900 hover:text-accent transition-all duration-200 cursor-pointer"
					>
						Login with <GrGoogle className="inline ml-1 mb-0.5" />
					</button>
					<p className="text-white/80 text-sm">
						Don't have an account?{" "}
						<Link to="/register" className="text-gold font-semibold hover:underline">
							Register here
						</Link>
					</p>
				</div>
			</div>
			{isLoading && <Loader />}
		</div>
	);
}