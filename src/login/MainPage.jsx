import React, { useEffect } from "react";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineChartBar,
} from "react-icons/hi";
import { FiNavigation2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAppointmentsStore from "../store/appointmentsStore";

const MainPage = () => {
  const appointmentsCount = useAppointmentsStore((state) => state.appointmentsCount);
  useEffect(() => {
    appointmentsCount();
  }, []);

  // إصلاح: استخدام مخزن المواعيد للحصول على إجمالي عدد المواعيد
  const AllAppointmentsCount = useAppointmentsStore(
    (state) => state.AllAppointmentsCount,
  );

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-['Plus_Jakarta_Sans'] antialiased">
      {/* --- 1. Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0081ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
              <FiNavigation2 className="w-5 h-5 fill-white transition-transform" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#0081ff]">
              Nexus
            </span>
          </div>
          <div className="md:flex gap-10 font-medium text-slate-500 text-sm">
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to={"/login"}
              className="text-sm font-bold text-slate-700 cursor-pointer hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className=" cursor-pointer bg-linear-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              Get Started <HiArrowRight />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- 2. Hero Section --- */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-100/50 blur-[120px] -z-10 rounded-full"></div>
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#0081ff] text-xs font-bold mb-10">
          <HiCheckCircle /> Trusted by 10,000+ businesses worldwide
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight mb-8">
          The Future of <br />
          <span className="bg-linear-to-r from-[#0061ff] to-[#60efff] bg-clip-text text-transparent italic">
            Business Management
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-500 font-medium leading-relaxed mb-12">
          Nexus empowers modern businesses with intelligent scheduling, deep
          analytics, and seamless client management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={"/signup"}
            className=" cursor-pointer bg-linear-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl shadow-blue-100 flex items-center gap-2"
          >
            Start Free Trial <HiArrowRight />
          </Link>
          <button className=" cursor-pointer bg-slate-50 text-slate-800 px-10 py-4 rounded-xl text-lg font-bold border border-slate-200 hover:bg-white transition-all">
            Watch Demo
          </button>
        </div>
      </section>

      {/* --- 3. Stats Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-center gap-8 text-sm font-bold text-emerald-500 mb-10">
          <span className="flex items-center gap-1 leading-none">
            <HiCheckCircle size={18} /> 14-day free trial
          </span>
          <span className="flex items-center gap-1 leading-none">
            <HiCheckCircle size={18} /> No credit card required
          </span>
          <span className="flex items-center gap-1 leading-none">
            <HiCheckCircle size={18} /> Cancel anytime
          </span>
        </div>

        <div className="bg-linear-to-r from-slate-400/20 to-slate-400/5 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-4 gap-6 border border-slate-100 shadow-2xl shadow-slate-200">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Total Revenue
            </p>
            <h3 className="text-3xl font-black text-slate-800 mb-1">N/A</h3>
            <p className="text-xs font-bold text-emerald-500">+N/A%</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Active Clients
            </p>
            <h3 className="text-3xl font-black text-slate-800 mb-1">N/A</h3>
            <p className="text-xs font-bold text-emerald-500">+N/A%</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Appointments
            </p>
            <h3 className="text-3xl font-black text-slate-800 mb-1">
              {/* {AllAppointmentsCount || 0} */}
              N/A
            </h3>
            <p className="text-xs font-bold text-emerald-500">+N/A%</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Satisfaction
            </p>
            <h3 className="text-3xl font-black text-slate-800 mb-1">N/A%</h3>
            <p className="text-xs font-bold text-emerald-500">+N/A%</p>
          </div>
        </div>
      </section>

      {/* --- 4. Features Section --- */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">
            Everything you need to <span className="text-blue-500">scale</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Powerful features designed to streamline operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-10 rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <HiOutlineCalendar />
            </div>
            <h3 className="text-xl font-extrabold mb-3">Smart Scheduling</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              AI-powered appointment management.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-10 rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <HiOutlineUserGroup />
            </div>
            <h3 className="text-xl font-extrabold mb-3">Client Insights</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Deep analytics on client behavior.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-10 rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <HiOutlineChartBar />
            </div>
            <h3 className="text-xl font-extrabold mb-3">Revenue Analytics</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Real-time dashboards and growth strategies.
            </p>
          </div>
        </div>
      </section>

      {/* --- 5. Testimonials --- */}
      <section id="testimonials" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">
            Loved by{" "}
            <span className="text-blue-500 italic uppercase">
              industry leaders
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            {/* Testimonial 1 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-50">
              <div className="flex text-amber-400 mb-6">★★★★★</div>
              <p className="text-slate-700 font-medium mb-8 leading-relaxed italic">
                "Nexus transformed how we manage our premium spa."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                <div>
                  <h4 className="font-bold text-slate-900">Sarah Mitchell</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    CEO, Luxe Wellness
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-50">
              <div className="flex text-amber-400 mb-6">★★★★★</div>
              <p className="text-slate-700 font-medium mb-8 leading-relaxed italic">
                "The analytics alone are worth it."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500"></div>
                <div>
                  <h4 className="font-bold text-slate-900">David Chen</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Director, Elite Medical
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-50">
              <div className="flex text-amber-400 mb-6">★★★★★</div>
              <p className="text-slate-700 font-medium mb-8 leading-relaxed italic">
                "The analytics alone are worth it."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500"></div>
                <div>
                  <h4 className="font-bold text-slate-900">David Chen</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Director, Elite Medical
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. Pricing Section --- */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1: Starter */}
            <div className="p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-extrabold mb-1">Starter</h3>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">$29</span>
                <span className="text-slate-400 font-bold">/month</span>
              </div>
              <button className="w-full cursor-pointer py-4 rounded-xl font-extrabold text-sm mb-10 bg-slate-50 text-slate-700 hover:bg-slate-100">
                Get Started ❯
              </button>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                  <HiCheckCircle className="text-emerald-500" /> Up to 5 team
                  members
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                  <HiCheckCircle className="text-emerald-500" /> 500
                  appointments/month
                </li>
              </ul>
            </div>

            {/* Plan 2: Professional (Popular) */}
            <div className="p-10 rounded-3xl border border-blue-500 shadow-xl shadow-blue-50 relative flex flex-col">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-xl font-extrabold mb-1">Professional</h3>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">$79</span>
                <span className="text-slate-400 font-bold">/month</span>
              </div>
              <button className="w-full cursor-pointer py-4 rounded-xl font-extrabold text-sm mb-10 bg-linear-to-r from-blue-600 to-cyan-500 text-white">
                Get Started ❯
              </button>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                  <HiCheckCircle className="text-emerald-500" /> Unlimited
                  appointments
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                  <HiCheckCircle className="text-emerald-500" /> Advanced
                  analytics
                </li>
              </ul>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-xl font-extrabold mb-1">Enterprise</h3>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">$199</span>
                <span className="text-slate-400 font-bold">/month</span>
              </div>
              <button className="w-full cursor-pointer py-4 rounded-xl font-extrabold text-sm mb-10 bg-slate-50 text-slate-700 hover:bg-slate-100">
                Get Started ❯
              </button>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                  <HiCheckCircle className="text-emerald-500" /> Dedicated
                  manager
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500 font-bold">
                  <HiCheckCircle className="text-emerald-500" /> Custom
                  integrations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. CTA Section --- */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto bg-linear-to-br from-blue-600 to-cyan-500 rounded-[2.5rem] p-16 text-center text-white">
          <h2 className="text-5xl font-extrabold mb-6">
            Ready to transform your business?
          </h2>
          <button className="bg-white cursor-pointer text-blue-600 px-10 py-4 rounded-xl text-lg font-bold flex items-center gap-2 mx-auto">
            Start Your Free Trial <HiArrowRight />
          </button>
        </div>
      </section>

      {/* --- 8. Footer --- */}
      <footer className="py-12 border-t border-slate-100 px-12 flex justify-between items-center text-slate-500 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0081ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
            <FiNavigation2 className="w-5 h-5 fill-white transition-transform" />
          </div>
          <span className="text-xl font-bold text-[#0081ff]">Nexus</span>
        </div>
        <div className="flex gap-8">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <p>© 2026 Nexus. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
