import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
export default function AdminPage() {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            window.location.href = "/";
            return;
        }
        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            if(response.data.role == "admin"){
                setUser(response.data);
            }else{
                window.location.href = "/";
            }
        }).catch(()=>{
            window.location.href = "/login";
        })
    },[])
	return (
		<div className="w-full h-screen flex bg-[#0D1117] text-[#E6EDF3] overflow-hidden">
            {user ?
			<>
				<div className="w-[280px] bg-[#0D1117] h-full flex flex-col border-r border-slate-800 shrink-0">
					<div className="w-full h-[80px] flex items-center px-6 gap-3 border-b border-slate-800">
						<img src="/logo.png" className="h-10 w-10 object-contain rounded-lg" />
						<h1 className="text-xl font-bold tracking-wide text-white">Admin Panel</h1>
					</div>
					<div className="w-full py-6 px-4 text-slate-300 text-base flex flex-col gap-1">
						<Link
							to="/admin"
							className="w-full flex items-center h-[48px] px-3 gap-3 rounded-xl hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-150"
						>
							<LuClipboardList size={18} />
							<span>Orders</span>
						</Link>
						<Link
							to="/admin/products"
							className="w-full flex items-center h-[48px] px-3 gap-3 rounded-xl hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-150"
						>
							<LuBoxes size={18} />
							<span>Products</span>
						</Link>
						<Link
							to="/admin/users"
							className="w-full flex items-center h-[48px] px-3 gap-3 rounded-xl hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-150"
						>
							<FiUsers size={18} />
							<span>Users</span>
						</Link>
						<Link
							to="/admin/reviews"
							className="w-full flex items-center h-[48px] px-3 gap-3 rounded-xl hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-150"
						>
							<MdOutlineRateReview size={18} />
							<span>Reviews</span>
						</Link>
					</div>
				</div>
				<div className="w-[calc(100%-280px)] h-full bg-slate-50 overflow-y-auto">
					<Routes>
						<Route path="/" element={<AdminOrdersPage />} />
						<Route path="/products" element={<AdminProductsPage />} />
						<Route path="/add-product" element={<AdminAddProductPage />} />
						<Route
							path="/update-product"
							element={<AdminUpdateProductPage />}
						/>
						<Route path="/users" element={<AdminUsersPage />} />
						<Route path="/reviews" element={<AdminReviewsPage />} />
					</Routes>
				</div>
			</>:
            <Loader />
}
		</div>
	);
}