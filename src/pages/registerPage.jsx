import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading , setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function register() {


        if(firstName.trim()== ""){
            toast.error("First name is required");
            return;
        }
        if(lastName.trim()== ""){
            toast.error("Last name is required");
            return;
        }
        if(email.trim()== ""){
            toast.error("Email is required");
            return;
        }
        if(password.trim()== ""){
            toast.error("Password is required");
            return;
        }   
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        if(password != confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/",
				{
					email: email.trim(),
					password: password.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
				}
			);
			console.log();
            navigate("/login");
			//alert("Login successful! Welcome back.");

			toast.success("Registration successful! Welcome to I computers.");
            setIsLoading(false);
		} catch (err) {
			//alert("Login failed! Please check your credentials and try again.");
			toast.error("Registration failed! Please check your data and try again.");
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
						Register
					</h1>
					<input
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						type="text"
						placeholder="your first name"
						className="w-full h-[46px] mb-[12px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
					/>
                    <input
                        onChange={(e) => {  
                            setLastName(e.target.value);
                        }}
                        type="text"
                        placeholder="your last name"
                        className="w-full h-[46px] mb-[12px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    />
					<input
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						type="email"
						placeholder="your email"
						className="w-full h-[46px] mb-[12px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
					/>
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						placeholder="your password"
						className="w-full h-[46px] mb-[12px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
					/>
                    <input
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="confirm your password"
                        className="w-full h-[46px] mb-[20px] rounded-xl border border-slate-850 p-[10px] text-[16px] bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    />
					
					<button
						onClick={register}
						className="w-full h-[50px] mb-[16px] bg-accent text-slate-950 font-bold text-[18px] rounded-xl border-2 border-accent hover:bg-slate-900 hover:text-accent transition-all duration-200 cursor-pointer"
					>
						Register Now
					</button>
					<p className="text-white/80 text-sm">
						Already have an account?{" "}
						<Link to="/login" className="text-gold font-semibold hover:underline">
							Login here
						</Link>
					</p>
				</div>
			</div>
            {isLoading && <Loader />}
		</div>
	);
}