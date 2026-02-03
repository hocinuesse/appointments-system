import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FiNavigation2 } from "react-icons/fi";
import { HiArrowRight, HiOutlineMail, HiEye } from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginUI = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", email);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("SUCCESS:", result.user.uid);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Email or password incorrect. Please try again.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Check your connection.");
      } else {
        setError("Access Denied. Internal security error.");
        console.log("THE REAL ERROR CODE IS:", err.code);
      }
    }
  };
  return (
    <div className="h-screen w-full flex bg-white font-['Plus_Jakarta_Sans',sans-serif] antialiased overflow-hidden">
      <div className="hidden md:flex! md:w-1/2 md:order-1! relative bg-[#0a192f] p-12 flex-col justify-between overflow-hidden" data-aos="fade-right">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-cyan-500/10 blur-[80px] rounded-full"></div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0081ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
            <FiNavigation2 className="w-5 h-5 fill-white transition-transform" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            Nexus
          </span>
        </div>

        {/* Content - نص ترحيبي مختلف قليلاً للـ Login */}
        <div className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4 tracking-tighter uppercase italic">
            Welcome Back to <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              The Nexus Core
            </span>
          </h1>
          <p className="text-base text-slate-400 font-medium max-w-md leading-relaxed">
            Access your professional workspace and manage your global projects
            with ultimate performance and security.
          </p>
        </div>

        {/* Branding Footer */}
        <div className="relative z-10 border-t border-white/5 pt-8">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            Precision Engineering • Qatar & UAE Standards
          </p>
        </div>
      </div>

      {/* --- الجهة اليمنى: نموذج تسجيل الدخول --- */}
      <div className="w-full md:w-1/2 md:order-2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto md:overflow-hidden" data-aos="fade-left">
        {/* زر العودة */}
        <div className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs cursor-pointer transition-colors">
          <Link
            to={"/"}
            className=" l flex items-center gap-2 hover:text-blue-600 font-bold text-xs cursor-pointer transition-colors"
          >
            <HiArrowRight className="rotate-180" /> Back
          </Link>
        </div>

        <div className="w-full max-w-95 flex flex-col justify-center h-full">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Sign In
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handelLogin}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Business Email
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <HiOutlineMail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="admin@nexus.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-200 outline-none transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  {/* <HiOutlineLock size={18} /> */}
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-50/50 focus:border-blue-200 outline-none transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                >
                  <HiEye size={18} />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full bg-[#0061ff] cursor-pointer text-white py-4 rounded-xl text-base font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
              Sign In <HiArrowRight />
            </button>
          </form>
          {/* Error Display Box */}
          {error && (
            <div className=" mt-2.5 flex items-start gap-3 p-3.5 bg-red-50/50 border-l-4 border-red-500 rounded-r-xl rounded-l-sm transition-all duration-300 animate-in fade-in slide-in-from-left-2">
              <div className="mt-0.5 text-red-600">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-black uppercase tracking-widest text-red-500/70">
                  Error Detected
                </span>
                <p className="text-[13px] font-bold text-red-700 leading-snug">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Social Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="bg-white px-3">secure connect</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center cursor-pointer gap-2 py-2.5 bg-white border border-slate-100 rounded-xl text-[12px] font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <FaGoogle className="text-red-500 " /> <span>Google</span>
            </button>
            <button className="flex items-center justify-center cursor-pointer gap-2 py-2.5 bg-white border border-slate-100 rounded-xl text-[12px] font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <FaGithub className="text-slate-900 " /> <span>GitHub</span>
            </button>
          </div>

          <p className="mt-10 text-center text-[13px] font-bold text-slate-500">
            Don't have an account?
            <Link
              to={"/signup"}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;



