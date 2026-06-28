import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { FaStar } from "react-icons/fa";

export default function AdminReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const fetchReviews = () => {
		axios.get(import.meta.env.VITE_BACKEND_URL + "/reviews")
			.then((response) => {
				setReviews(response.data);
				setLoaded(true);
			})
			.catch((error) => {
				console.error("Error fetching reviews:", error);
				setLoaded(true);
			});
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<div className="w-full min-h-full bg-slate-50 text-slate-800 p-6 md:p-10 flex flex-col">
			<div className="max-w-7xl w-full mx-auto space-y-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200">
					<div>
						<h1 className="text-2xl font-bold text-slate-900">Customer Reviews</h1>
						<p className="text-sm text-slate-500 mt-1">View and monitor feedback submitted by registered customers.</p>
					</div>
					<div className="mt-2 md:mt-0 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
						Total Reviews: {reviews.length}
					</div>
				</div>

				{loaded ? (
					reviews.length === 0 ? (
						<div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-slate-300 rounded-2xl bg-white shadow-xs">
							<p className="text-lg font-semibold text-slate-600">No reviews found.</p>
							<p className="text-xs text-slate-400 mt-1">Reviews submitted by clients will show up here.</p>
						</div>
					) : (
						<div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
							<div className="overflow-x-auto">
								<table className="w-full table-auto text-left border-collapse">
									<thead>
										<tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
											<th className="px-6 py-4">Name</th>
											<th className="px-6 py-4">Email</th>
											<th className="px-6 py-4">Review Text</th>
											<th className="px-6 py-4 text-center">Rating</th>
											<th className="px-6 py-4">Date</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-150">
										{reviews.map((item, index) => (
											<tr
												key={item._id || index}
												className="odd:bg-white even:bg-slate-50/50 hover:bg-slate-100/30 transition-colors text-slate-700"
											>
												<td className="px-6 py-4 text-sm font-semibold text-slate-900">
													{item.firstName} {item.lastName}
												</td>
												<td className="px-6 py-4 text-sm text-slate-600">{item.email}</td>
												<td className="px-6 py-4 text-sm max-w-sm break-words text-slate-600">
													{item.text}
												</td>
												<td className="px-6 py-4 text-sm text-center">
													<div className="flex justify-center text-amber-500 gap-0.5">
														{[...Array(5)].map((_, i) => (
															<FaStar key={i} size={13} className={i < item.rating ? "text-amber-400" : "text-slate-300"} />
														))}
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-slate-500">
													{new Date(item.date).toLocaleDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)
				) : (
					<div className="py-20 flex justify-center"><Loader /></div>
				)}
			</div>
		</div>
	);
}
