import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);

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
	}, []);

	return (
		<div className="w-full h-[calc(100vh-100px)]">
			{!loaded ? (
				<Loader />
			) : (
				<div className="w-full flex justify-center p-4 flex-row flex-wrap  ">
					<div className="w-full h-[100px] sticky top-0 bg-primary flex justify-center items-center mb-4 shadow-md z-10 border-b border-slate-800">
						<input
							type="text"
							placeholder="Search products..."
							className="w-1/2 px-4 py-2 border border-slate-700 bg-slate-900 text-white rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent"							
							onChange={async (e) => {

								if (e.target.value == "") {
                                    setLoaded(false);
									await axios
										.get(import.meta.env.VITE_BACKEND_URL + "/products")
										.then((response) => {
											console.log(response.data);
											setProducts(response.data);
											setLoaded(true);
										});
                                    setLoaded(true);
								}else{
                                    await axios
                                        .get(
                                            import.meta.env.VITE_BACKEND_URL +
                                                "/products/search/" +
                                                e.target.value
                                        )
                                        .then((response) => {
                                            console.log(response.data);
                                            setProducts(response.data);
                                        });
                                    setLoaded(true);
                                }
							}}
						/>
					</div>

					{products.map((item) => {
						return <ProductCard key={item.productID} product={item} />;
					})}
				</div>
			)}
		</div>
	);
}