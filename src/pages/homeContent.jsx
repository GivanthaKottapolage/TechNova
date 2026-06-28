// src/pages/homeContent.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar, FaTrash } from "react-icons/fa";
import { 
    LuCpu, 
    LuGamepad, 
    LuMonitor, 
    LuShieldCheck, 
    LuActivity, 
    LuClock, 
    LuChevronRight, 
    LuMessageSquare, 
    LuFlame, 
    LuCheck, 
    LuSparkles 
} from "react-icons/lu";

const SLOGANS = [
    "Custom-built rigs for work, study, and play.",
    "Genuine parts. Reliable service. Zero drama.",
    "From student laptops to pro workstations — we’ve got you."
];

// Specifications blueprint for interactive hero demo
const MOCK_SPECS = {
    gaming: {
        title: "Overlord Alpha Rig",
        cpu: "AMD Ryzen 7 7800X3D (8 Cores, 16 Threads)",
        gpu: "NVIDIA RTX 4080 Super 16GB GDDR6X",
        ram: "32GB Corsair Vengeance DDR5 6000MHz",
        storage: "2TB Kingston KC3000 PCIe 4.0 NVMe",
        cooling: "360mm ARGB Liquid AIO Cooler"
    },
    creator: {
        title: "Genesis Creator Pro",
        cpu: "Intel Core i9-14900K (24 Cores, 32 Threads)",
        gpu: "NVIDIA RTX 4090 24GB Founders Edition",
        ram: "64GB G.Skill Trident Z5 DDR5 6400MHz",
        storage: "4TB Samsung 990 Pro Gen4 NVMe (2x2TB)",
        cooling: "Custom Hardline Liquid Cooling Loop"
    },
    workstation: {
        title: "Apex Threadripper Station",
        cpu: "AMD Threadripper 7960X (24 Cores, 48 Threads)",
        gpu: "NVIDIA RTX A6000 Ada Generation 48GB",
        ram: "128GB Kingston FURY Renegade DDR5 ECC",
        storage: "8TB High-Speed RAID Gen5 NVMe Storage",
        cooling: "Dual-Pump Silent Workstation Cooler"
    }
};

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // UI state for the interactive hero panel
    const [activeSpecCategory, setActiveSpecCategory] = useState("gaming");

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
        }, 3000); // change slogan every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchCurrentUser = () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(() => {
                setCurrentUser(null);
            });
        } else {
            setCurrentUser(null);
        }
    };

    const fetchReviews = () => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/reviews")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchReviews();
    }, []);

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newReviewText.trim()) {
            toast.error("Please enter your review text");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to leave a review");
            return;
        }
        setIsSubmitting(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/reviews", {
                text: newReviewText,
                rating: newRating
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Review posted successfully!");
            setNewReviewText("");
            setNewRating(5);
            fetchReviews();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + `/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Review deleted successfully");
            fetchReviews();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete review");
        }
    };

    const activeSpecs = MOCK_SPECS[activeSpecCategory];

    return (
        <div className="w-full flex flex-col bg-[#0D1117] text-[#E6EDF3] overflow-x-hidden">
            
            {/* Version 2 - Split Cyber Hero Section */}
            <section className="relative w-full min-h-[calc(100vh-100px)] flex items-center justify-center py-12 px-4 border-b border-cyan-500/10 overflow-hidden">
                {/* Abstract Glowing Grid Background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,180,216,0.35),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(72,202,228,0.2),transparent_40%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
                
                <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Dynamic Copywriting block */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                            <LuSparkles size={14} className="animate-spin-slow" />
                            <span>Ultimate Hardware Hub</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Build Your Dream <br className="hidden sm:inline" />
                            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                                Computing Engine
                            </span>
                        </h1>

                        <p className="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                            We design performance-tuned custom rigs, diagnostic repairs, and supply warranty-backed components with complete tech precision.
                        </p>

                        {/* Slogans Rotator Console */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-md max-w-md mx-auto lg:mx-0 flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                            <span className="text-sm italic text-slate-300 font-medium">
                                "{SLOGANS[activeIndex]}"
                            </span>
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3.5 text-sm font-semibold tracking-wide shadow-lg shadow-cyan-500/20 transition-all duration-200"
                            >
                                Browse Catalogue
                                <LuChevronRight className="ml-1" size={16} />
                            </Link>

                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center rounded-full border border-slate-700 hover:border-cyan-400 bg-transparent hover:bg-cyan-500/5 text-white px-8 py-3.5 text-sm font-semibold transition-all duration-200"
                            >
                                Discover TechNova
                            </Link>
                        </div>
                    </div>

                    {/* Right: Interactive PC Hardware Configurator Panel */}
                    <div className="lg:col-span-6 w-full max-w-lg mx-auto">
                        <div className="bg-slate-900/80 border border-cyan-500/10 rounded-3xl p-6 shadow-2xl backdrop-blur-lg relative overflow-hidden">
                            {/* Panel Glow */}
                            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                            
                            {/* Panel Tab Selector */}
                            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/80 rounded-xl mb-6 border border-slate-800">
                                {Object.keys(MOCK_SPECS).map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveSpecCategory(category)}
                                        className={`py-2 px-3 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                            activeSpecCategory === category
                                                ? "bg-cyan-500 text-slate-950 shadow-md"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Active Rig Specification Details */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                    <h3 className="font-bold text-white text-lg tracking-wide flex items-center gap-2">
                                        <LuGamepad className="text-cyan-400" />
                                        {activeSpecs.title}
                                    </h3>
                                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-0.5 rounded-full">
                                        Active Build
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-lg bg-slate-950 text-cyan-400 mt-0.5 shrink-0 border border-slate-800">
                                            <LuCpu size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Processor Unit</p>
                                            <p className="text-xs text-white mt-0.5 font-medium">{activeSpecs.cpu}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-lg bg-slate-950 text-cyan-400 mt-0.5 shrink-0 border border-slate-800">
                                            <LuMonitor size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Graphics Card</p>
                                            <p className="text-xs text-white mt-0.5 font-medium">{activeSpecs.gpu}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-lg bg-slate-950 text-cyan-400 mt-0.5 shrink-0 border border-slate-800">
                                            <LuActivity size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">System Memory</p>
                                            <p className="text-xs text-white mt-0.5 font-medium">{activeSpecs.ram}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-lg bg-slate-950 text-cyan-400 mt-0.5 shrink-0 border border-slate-800">
                                            <LuShieldCheck size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">NVMe Drive</p>
                                            <p className="text-xs text-white mt-0.5 font-medium">{activeSpecs.storage}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-medium">Build Status: Ready</span>
                                    <Link to="/contact" className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1">
                                        Get Custom Quote <LuChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Operational Dashboard Statistics Section */}
            <section className="py-8 px-4 bg-slate-950/40 border-b border-cyan-500/10">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="p-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Builds Queued</p>
                        <h4 className="text-2xl font-bold mt-1 text-white flex items-center justify-center gap-2">
                            <LuFlame className="text-orange-400 animate-pulse" size={18} />
                            <span>14 Active</span>
                        </h4>
                    </div>
                    <div className="p-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Repairs Completed</p>
                        <h4 className="text-2xl font-bold mt-1 text-white flex items-center justify-center gap-2">
                            <LuCheck className="text-emerald-400" size={18} />
                            <span>820+ Total</span>
                        </h4>
                    </div>
                    <div className="p-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Diagnoses Lead time</p>
                        <h4 className="text-2xl font-bold mt-1 text-white flex items-center justify-center gap-2">
                            <LuClock className="text-cyan-400" size={18} />
                            <span>&lt; 24 Hours</span>
                        </h4>
                    </div>
                    <div className="p-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Genuine Warranty</p>
                        <h4 className="text-2xl font-bold mt-1 text-white flex items-center justify-center gap-2">
                            <LuShieldCheck className="text-indigo-400" size={18} />
                            <span>100% Guaranteed</span>
                        </h4>
                    </div>
                </div>
            </section>

            {/* Core Capabilities Showcase */}
            <section className="py-20 px-4 bg-slate-950/20">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Core Services</p>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                            Engineered for Maximum Output
                        </h2>
                        <p className="text-slate-400 text-sm">
                            We don't just sell computers. We provide precision hardware assembly and high-grade diagnostics systems to optimize daily operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 hover:border-cyan-500/20 transition-all duration-300 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                                <LuCpu size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Custom Built Workstations</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Tailored configurations equipped with optimal thermal management and airflow, configured for gaming, video rendering, and database analysis.
                            </p>
                        </div>

                        <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 hover:border-cyan-500/20 transition-all duration-300 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                                <LuActivity size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Gen-4 Diagnostic Service</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Advanced stress testing and data-safe upgrades (SSDs, memory updates, motherboard diagnostics) designed to boost load time.
                            </p>
                        </div>

                        <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 hover:border-cyan-500/20 transition-all duration-300 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/20">
                                <LuShieldCheck size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Enterprise Hardware Partner</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Direct authorization pathways with major global distributors ensures all PC parts are 100% genuine and fully warranty-covered.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials / Reviews Section */}
            <section className="py-20 px-4 bg-slate-950 border-t border-slate-800/60 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                            Client Feedback
                        </p>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                            What Our Customers Say
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Read reviews from verified TechNova customers or log in to post your custom experience.
                        </p>
                    </div>

                    {/* Reviews Display Grid */}
                    {reviews.length === 0 ? (
                        <div className="text-center py-12 border border-slate-850 rounded-2xl bg-slate-900/10 max-w-2xl mx-auto mb-12">
                            <p className="text-slate-500 text-sm">No reviews yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {reviews.map((rev) => (
                                <div
                                    key={rev._id}
                                    className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3.5">
                                            <div className="flex flex-col">
                                                <h4 className="text-sm font-semibold text-white">
                                                    {rev.firstName} {rev.lastName}
                                                </h4>
                                                <p className="text-[10px] text-slate-500">
                                                    {new Date(rev.date).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {currentUser && currentUser.email === rev.email && (
                                                <button
                                                    onClick={() => handleDeleteReview(rev._id)}
                                                    className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                                    title="Delete Review"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Star Rating Icons */}
                                        <div className="flex text-amber-500 gap-0.5 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    size={12}
                                                    className={i < rev.rating ? "text-amber-400" : "text-slate-700"}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-xs text-slate-300 leading-relaxed italic">
                                            "{rev.text}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Write a Review Submission Form */}
                    <div className="max-w-2xl mx-auto rounded-3xl border border-white/5 bg-slate-900/40 p-6 md:p-8 backdrop-blur-lg shadow-2xl">
                        {currentUser ? (
                            <form onSubmit={handleAddReview} className="space-y-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <LuMessageSquare className="text-cyan-400" size={18} />
                                    Submit Client Review
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Signed in as <span className="text-cyan-400">{currentUser.firstName} {currentUser.lastName}</span>
                                </p>

                                <div className="flex items-center gap-2 py-1">
                                    <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Select Rating:</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewRating(star)}
                                                className="text-lg transition hover:scale-110 cursor-pointer"
                                            >
                                                <FaStar
                                                    className={star <= newRating ? "text-amber-400" : "text-slate-700"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="review-text" className="sr-only">Review details</label>
                                    <textarea
                                        id="review-text"
                                        rows={4}
                                        value={newReviewText}
                                        onChange={(e) => setNewReviewText(e.target.value)}
                                        placeholder="Briefly describe your hardware purchase or servicing experience..."
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center rounded-full bg-cyan-500 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400 disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? "Uploading feedback..." : "Submit Review"}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <h3 className="text-lg font-bold text-white mb-2">Help Us Improve Our Hardware Service</h3>
                                <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
                                    Only registered clients can post system reviews. Authenticate to share custom rig feedback.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        to="/login"
                                        className="rounded-full bg-cyan-500 px-8 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="rounded-full border border-slate-700 bg-transparent px-8 py-2.5 text-xs font-bold text-white transition hover:border-cyan-400 hover:bg-cyan-500/5"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}