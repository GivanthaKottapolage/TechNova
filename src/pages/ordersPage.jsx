import axios from "axios";
import { useEffect, useState } from "react";
import ViewOrderInfo from "../components/viewOrderInfo";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
        const token = localStorage.getItem("token");
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
				.then((response) => {
					console.log(response.data);
					setOrders(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-[#0D1117] text-[#E6EDF3] py-16 px-4 md:px-8">
			{loaded ? (
				<div className="max-w-6xl mx-auto space-y-6">
					<div>
						<h1 className="text-3xl font-extrabold tracking-tight text-white">My Orders</h1>
						<p className="text-sm text-slate-400 mt-1">Review your hardware purchase logs and track shipment statuses.</p>
					</div>

					{orders.length === 0 ? (
						<div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 backdrop-blur-md shadow-lg">
							<p className="text-lg font-semibold text-slate-400">No orders found.</p>
							<p className="text-xs text-slate-500 mt-1">Your orders will show up here after completing a purchase.</p>
						</div>
					) : (
						<div className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-900/35 backdrop-blur-md shadow-2xl">
							<div className="overflow-x-auto">
								<table className="w-full table-auto text-left border-collapse">
									<thead>
										<tr className="bg-slate-950/80 border-b border-slate-850 text-slate-300 text-xs font-bold uppercase tracking-wider">
											<th className="px-6 py-4">Order ID</th>
											<th className="px-6 py-4">Customer Email</th>
											<th className="px-6 py-4">Customer Name</th>
											<th className="px-6 py-4">Date</th>
											<th className="px-6 py-4">Status</th>
											<th className="px-6 py-4">Total Amount</th>
											<th className="px-6 py-4">Actions</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-850">
										{orders.map((order, index) => {
											return (
												<tr
													key={index}
													className="odd:bg-slate-900/25 even:bg-slate-950/20 hover:bg-slate-900/50 transition-colors text-slate-300 border-b border-slate-850/50"
												>
													<td className="px-6 py-4 text-sm font-semibold text-white">
														{order.orderId}
													</td>
													<td className="px-6 py-4 text-sm text-slate-400">
														{order.email}
													</td>
													<td className="px-6 py-4 text-sm text-slate-300 font-medium">
														{order.name}
													</td>
													<td className="px-6 py-4 text-sm text-slate-400">
														{new Date(order.date).toLocaleDateString()}
													</td>
													<td className="px-6 py-4 text-sm">
														<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
															order.status === "completed" 
																? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
																: order.status === "pending" 
																? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
																: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
														}`}>
															{order.status}
														</span>
													</td>
													<td className="px-6 py-4 text-sm font-bold text-white">
														LKR. {order.total.toFixed(2)}
													</td>
													<td className="px-6 py-4 text-sm">
														<ViewOrderInfoCustomer order={order} />
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="py-20 flex justify-center"><Loader /></div>
			)}
		</div>
	);
}