import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";

export default function AdminOrdersPage() {
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
		<div className="w-full min-h-full bg-slate-50 text-slate-800 p-6 md:p-10 flex flex-col">
			<div className="max-w-7xl w-full mx-auto space-y-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200">
					<div>
						<h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
						<p className="text-sm text-slate-500 mt-1">Review orders, track completion statuses, and inspect details.</p>
					</div>
					<div className="mt-2 md:mt-0 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
						Total Orders: {orders.length}
					</div>
				</div>

				{loaded ? (
					<div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
						<div className="overflow-x-auto">
							<table className="w-full table-auto text-left border-collapse">
								<thead>
									<tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
										<th className="px-6 py-4">Order ID</th>
										<th className="px-6 py-4">Customer Email</th>
										<th className="px-6 py-4">Customer Name</th>
										<th className="px-6 py-4">Date</th>
										<th className="px-6 py-4">Status</th>
										<th className="px-6 py-4">Total Amount</th>
										<th className="px-6 py-4">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-150">
									{orders.map((order, index) => {
										return (
											<tr
												key={index}
												className="odd:bg-white even:bg-slate-50/50 hover:bg-slate-100/30 transition-colors text-slate-700"
											>
												<td className="px-6 py-4 text-sm font-semibold text-slate-900">
													{order.orderId}
												</td>
												<td className="px-6 py-4 text-sm text-slate-600">
													{order.email}
												</td>
												<td className="px-6 py-4 text-sm text-slate-700 font-medium">
													{order.name}
												</td>
												<td className="px-6 py-4 text-sm text-slate-500">
													{new Date(order.date).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 text-sm">
													<span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full ${
														order.status === "completed" 
															? "bg-emerald-100 text-emerald-800" 
															: order.status === "pending" 
															? "bg-amber-100 text-amber-800" 
															: "bg-slate-100 text-slate-700"
													}`}>
														{order.status}
													</span>
												</td>
												<td className="px-6 py-4 text-sm font-bold text-slate-900">
													LKR. {order.total.toFixed(2)}
												</td>
												<td className="px-6 py-4 text-sm">
													<ViewOrderInfo order={order} />
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
			</div>
		</div>
	);
}