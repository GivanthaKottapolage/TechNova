import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log(response.data);
					setUsers(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div className="w-full min-h-full bg-slate-50 text-slate-800 p-6 md:p-10 flex flex-col">
			<div className="max-w-7xl w-full mx-auto space-y-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200">
					<div>
						<h1 className="text-2xl font-bold text-slate-900">User Management</h1>
						<p className="text-sm text-slate-500 mt-1">Monitor users, view verification states, and manage access privileges.</p>
					</div>
					<div className="mt-2 md:mt-0 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
						Total Users: {users.length}
					</div>
				</div>

				{loaded ? (
					<div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
						<div className="overflow-x-auto">
							<table className="w-full table-auto text-left border-collapse">
								<thead>
									<tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
										<th className="px-6 py-4 w-16">Profile</th>
										<th className="px-6 py-4">Email</th>
										<th className="px-6 py-4">First Name</th>
										<th className="px-6 py-4">Last Name</th>
										<th className="px-6 py-4">Role</th>
										<th className="px-6 py-4">Status</th>
										<th className="px-6 py-4 text-center">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-150">
									{users.map((item, index) => {
										return (
											<tr
												key={index}
												className="odd:bg-white even:bg-slate-50/50 hover:bg-slate-100/30 transition-colors text-slate-700"
											>
												<td className="px-6 py-4 align-middle">
													<img
														src={item.image}
														alt=""
														className="w-[36px] h-[36px] rounded-full object-cover border border-slate-200 shadow-xs"
													/>
												</td>
												<td className="px-6 py-4 text-sm font-semibold text-slate-900 flex items-center gap-1.5 pt-6">
													{item.email}
													{item.isEmailVerified && (
														<GoVerified className="text-cyan-500" title="Verified User" />
													)}
												</td>
												<td className="px-6 py-4 text-sm text-slate-600">{item.firstName}</td>
												<td className="px-6 py-4 text-sm text-slate-600">{item.lastName}</td>
												<td className="px-6 py-4 text-sm text-slate-600">
													<span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full ${
														item.role === "admin" ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-700"
													}`}>
														{item.role}
													</span>
												</td>
												<td className="px-6 py-4 text-sm">
													<span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
														item.isBlocked ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
													}`}>
														{item.isBlocked ? "Blocked" : "Active"}
													</span>
												</td>
												<td className="px-6 py-4 text-sm text-center">
													<button
														className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
															item.isBlocked 
																? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/50" 
																: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100/50"
														}`}
														onClick={async () => {
															await axios.put(
																import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${item.email}`,
																{ isBlocked: !item.isBlocked },
																{
																	headers: {
																		Authorization: `Bearer ${localStorage.getItem("token")}`,
																	},
																}
															);
															setLoaded(false);
														}}
													>
														{item.isBlocked ? "Unblock User" : "Block User"}
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="py-20 flex justify-center"><Loader /></div>
				)}

				<Link
					to="/admin/add-product"
					className="fixed right-[30px] bottom-[30px] w-[56px] h-[56px] flex justify-center items-center text-3xl rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
					title="Add New Product"
				>
					<BiPlus />
				</Link>
			</div>
		</div>
	);
}