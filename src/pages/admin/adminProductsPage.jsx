import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/products")
				.then((response) => {
					console.log(response.data);
					setProducts(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div className="w-full min-h-full bg-slate-50 text-slate-800 p-6 md:p-10 flex flex-col">
			<div className="max-w-7xl w-full mx-auto space-y-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200">
					<div>
						<h1 className="text-2xl font-bold text-slate-900">Product Inventory</h1>
						<p className="text-sm text-slate-500 mt-1">Manage items, stock quantities, and availability states.</p>
					</div>
					<div className="mt-2 md:mt-0 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
						Total Products: {products.length}
					</div>
				</div>

				{loaded ? (
					<div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
						<div className="overflow-x-auto">
							<table className="w-full table-auto text-left border-collapse">
								<thead>
									<tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
										<th className="px-6 py-4 w-20">Image</th>
										<th className="px-6 py-4">ID</th>
										<th className="px-6 py-4">Name</th>
										<th className="px-6 py-4">Price</th>
										<th className="px-6 py-4">Labelled</th>
										<th className="px-6 py-4">Category</th>
										<th className="px-6 py-4">Brand</th>
										<th className="px-6 py-4">Model</th>
										<th className="px-6 py-4 text-center">Stock</th>
										<th className="px-6 py-4">Availability</th>
										<th className="px-6 py-4 text-center">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-150">
									{products.map((item, index) => {
										return (
											<tr
												key={index}
												className="odd:bg-white even:bg-slate-50/50 hover:bg-slate-100/30 transition-colors text-slate-700"
											>
												<td className="px-6 py-4 align-middle">
													<img
														src={item.images[0]}
														className="w-[42px] h-[42px] rounded-lg object-cover border border-slate-200 shadow-xs bg-slate-50"
													/>
												</td>
												<td className="px-6 py-4 text-sm font-semibold text-slate-900">
													{item.productID}
												</td>
												<td className="px-6 py-4 text-sm text-slate-700 font-medium max-w-xs truncate" title={item.name}>
													{item.name}
												</td>
												<td className="px-6 py-4 text-sm font-bold text-slate-900">
													${item.price}
												</td>
												<td className="px-6 py-4 text-sm line-through text-slate-400">
													${item.labelledPrice}
												</td>
												<td className="px-6 py-4 text-sm text-slate-500">{item.category}</td>
												<td className="px-6 py-4 text-sm text-slate-500">{item.brand}</td>
												<td className="px-6 py-4 text-sm text-slate-500">{item.model}</td>
												<td className="px-6 py-4 text-sm text-center font-bold text-slate-700">
													{item.stock}
												</td>
												<td className="px-6 py-4 text-sm">
													<span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
														item.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
													}`}>
														{item.isAvailable ? "Available" : "Unavailable"}
													</span>
												</td>
												<td className="px-6 py-4 text-sm text-center">
													<div className="inline-flex items-center gap-2">
														<button
															onClick={() => {
																navigate("/admin/update-product", { state: item });
															}}
															className="px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-600 bg-cyan-50 border border-cyan-150 hover:bg-cyan-100/50 hover:text-cyan-700 transition cursor-pointer"
														>
															Edit
														</button>
														<ProductDeleteButton
															productId={item.productID}
															reload={() => {
																setLoaded(false);
															}}
														/>
													</div>
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