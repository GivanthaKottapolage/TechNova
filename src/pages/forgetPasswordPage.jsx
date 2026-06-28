import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
	const [otpSent, setOtpSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	async function resetPassword() {
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		setLoading(true);
		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/validate-otp",
				{
					email: email,
					otp: otp,
					newPassword: newPassword,
				}
			);
			toast.success("Password reset successful");
			setLoading(false);
			navigate("/login");
		} catch (err) {
			console.log(err);
			toast.error("Error resetting password. Try again later");
			setLoading(false);
		}
	}

	async function sendOtp() {
		setLoading(true);
		try {
			await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email
			);
			toast.success("OTP sent to your email");
			setLoading(false);
			setOtpSent(true);
		} catch (err) {
			console.log(err);
			toast.error("Error sending OTP Try again later");
			setLoading(false);
		}
	}

	return (
		<div className="w-full min-h-[calc(100vh-100px)] flex flex-col justify-center items-center bg-primary">
			{loading && <Loader />}
			{otpSent ? (
				<div className="w-[400px] h-[500px] flex flex-col justify-center items-center bg-slate-900/60 border border-slate-800/80 text-white rounded-3xl p-8 backdrop-blur-md shadow-2xl">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Enter OTP and New Password
					</h2>
					<input
						type="text"
						placeholder="Enter OTP"
						className="w-full p-3 mb-4 rounded-xl border border-slate-700 bg-slate-950 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
						onChange={(e) => setOtp(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Enter New Password"
						className="w-full p-3 mb-4 rounded-xl border border-slate-700 bg-slate-950 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Confirm New Password"
						className="w-full p-3 mb-6 rounded-xl border border-slate-700 bg-slate-950 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button
						onClick={resetPassword}
						className="w-full bg-accent text-slate-950 font-bold p-3 rounded-full hover:bg-accent/90 transition cursor-pointer"
					>
						Reset Password
					</button>
				</div>
			) : (
				<div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-slate-900/60 border border-slate-800/80 text-white rounded-3xl p-8 backdrop-blur-md shadow-2xl">
					<h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
					<input
						type="email"
						placeholder="Enter your email"
						className="w-full p-3 mb-6 rounded-xl border border-slate-700 bg-slate-950 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						onClick={sendOtp}
						className="w-full bg-accent text-slate-950 font-bold p-3 rounded-full hover:bg-accent/90 transition cursor-pointer"
					>
						Send OTP
					</button>
				</div>
			)}
		</div>
	);
}