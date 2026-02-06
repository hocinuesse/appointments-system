import React, { useEffect, useState } from "react";
import "./test.css";
import { HiArrowRight, HiCheckCircle, HiMenu, HiX } from "react-icons/hi";
import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineChartBar,
} from "react-icons/hi";
import { FiNavigation2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAppointmentsStore from "../store/appointmentsStore";

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const appointmentsCount = useAppointmentsStore(
    (state) => state.appointmentsCount,
  );

  useEffect(() => {
    appointmentsCount();
  }, [appointmentsCount]);

  return (
    <>
      {/* for testing */}
      <div class="demo-account-card">
        <div class="card-header">
          <span class="pulse-icon"></span>
          <h3>Fast testing (Nexus)</h3>
        </div>

        <div class="account-details">
          <div class="detail-item" onclick="copyToClipboard('demo@nexus.com')">
            <label>Email</label>
            <div class="value-box">
              <span>test@gmail.com</span>
            </div>
          </div>

          <div class="detail-item" onclick="copyToClipboard('123456')">
            <label>Password</label>
            <div class="value-box">
              <span>testmyproject</span>
            </div>
          </div>
        </div>
      </div>

      <div className="warning">Under development</div>
      <div className="min-h-screen bg-white text-[#1a1a1a] font-['Plus_Jakarta_Sans'] antialiased">
        {/* --- 1. Navbar --- */}
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0081ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
                <FiNavigation2 className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#0081ff]">
                Nexus
              </span>
            </div>

            {/* Desktop Links - تظهر من md فأكبر */}
            <div className="hidden md:flex! gap-10 font-medium text-slate-500 text-sm">
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

            {/* Desktop Auth & Mobile Toggle */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex! items-center gap-6">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  // to="/signup"
                  className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200"
                >
                  Get Started <HiArrowRight />
                </Link>
              </div>

              {/* Mobile Button - يظهر تحت md */}
              <button
                className="md:hidden text-2xl text-slate-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 md:hidden shadow-2xl">
              <div className="flex flex-col gap-5 font-bold text-slate-600 text-lg">
                <a href="#features" onClick={() => setIsMenuOpen(false)}>
                  Features
                </a>
                <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>
                  Testimonials
                </a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </a>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="text-center py-2 font-bold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  // to="/signup"
                  className="bg-[#0081ff] text-white py-4 rounded-xl text-center font-bold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* --- 2. Hero Section --- */}
        <section
          className="pt-24 sm:pt-28 pb-20 px-6 relative overflow-hidden text-center"
          data-aos="fade-down"
        >
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-200 h-100 bg-blue-100/50 blur-[120px] -z-10 rounded-full"></div>

          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#0081ff] text-[10px] sm:text-xs font-bold mb-10 uppercase tracking-widest mx-auto"
            data-aos="zoom-in"
            data-aos-delay="50"
          >
            <HiCheckCircle /> Trusted by 10,000+ businesses worldwide
          </div>

          <h1
            className="text-4xl sm:text-7xl md:text-8xl font-black text-[#1a1a1a] leading-[1] tracking-tighter mb-10 font-['Playfair_Display']"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Future of <br className="hidden sm:block" />
            <span className="font-['Plus_Jakarta_Sans'] italic bg-linear-to-r from-[#0061ff] via-[#60efff] to-[#00dbde] bg-clip-text text-transparent px-2">
              Business Management
            </span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-base sm:text-xl text-slate-500 font-medium leading-relaxed mb-12 opacity-90"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Nexus empowers modern businesses with intelligent scheduling, deep
            analytics, and seamless client management.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link
              // to="/signup"
              className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-xl shadow-blue-100 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              Start Free Trial <HiArrowRight />
            </Link>
            <button className="w-full sm:w-auto bg-slate-50 text-slate-800 px-6 py-3 sm:px-10 sm:py-4 rounded-xl text-base sm:text-lg font-bold border border-slate-200 hover:bg-white transition-all active:scale-95">
              Watch Demo
            </button>
          </div>
        </section>

        {/* --- 3. Stats Section --- */}
        <section className="max-w-7xl mx-auto px-6 py-10" data-aos="fade-up">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[11px] sm:text-sm font-bold text-emerald-500 mb-10 text-center">
            <span className="flex items-center gap-1">
              <HiCheckCircle size={18} /> 14-day free trial
            </span>
            <span className="flex items-center gap-1">
              <HiCheckCircle size={18} /> No credit card required
            </span>
            <span className="flex items-center gap-1">
              <HiCheckCircle size={18} /> Cancel anytime
            </span>
          </div>

          <div className="bg-linear-to-r from-slate-400/20 to-slate-400/5 p-4 sm:p-8 rounded-[2.5rem] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border border-slate-100 shadow-2xl shadow-slate-200">
            {[
              { label: "Total Revenue", val: "N/A" },
              { label: "Active Clients", val: "N/A" },
              { label: "Appointments", val: "N/A" },
              { label: "Satisfaction", val: "N/A%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-left"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {stat.label}
                </p>
                <h3 className="text-xl sm:text-3xl font-black text-slate-800 mb-1">
                  {stat.val}
                </h3>
                <p className="text-[10px] font-bold text-emerald-500">+N/A%</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. Features Section --- */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-6 py-24"
          data-aos="fade-up"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
              Everything you need to{" "}
              <span className="text-blue-500">scale</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base">
              Powerful features designed to streamline operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <HiOutlineCalendar />,
                title: "Smart Scheduling",
                desc: "AI-powered appointment management.",
              },
              {
                icon: <HiOutlineUserGroup />,
                title: "Client Insights",
                desc: "Deep analytics on client behavior.",
              },
              {
                icon: <HiOutlineChartBar />,
                title: "Revenue Analytics",
                desc: "Real-time dashboards and growth strategies.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-2xl border border-slate-50 shadow-sm hover:shadow-md transition-all group text-left"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-extrabold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. Testimonials --- */}
        <section
          id="testimonials"
          className="py-24 bg-slate-50 px-6 text-center"
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
              Loved by
              <span className="text-blue-500 italic uppercase">
                industry leaders
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
              <TestimonialCard
                name="David Chen"
                role="Director, Elite Medical"
                text="The analytics alone are worth it."
                color="bg-cyan-500"
              />
              <TestimonialCard
                name="David Chen"
                role="Director, Elite Medical"
                text="The analytics alone are worth it."
                color="bg-cyan-500"
              />
              <TestimonialCard
                name="David Chen"
                role="Director, Elite Medical"
                text="The analytics alone are worth it."
                color="bg-cyan-500"
              />
            </div>
          </div>
        </section>

        {/* --- 6. Pricing Section (Original Layout) --- */}
        <section id="pricing" className="py-32 px-6" data-aos="fade-up">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Starter"
                price="29"
                features={["Up to 5 team members", "500 appointments/month"]}
              />
              <PricingCard
                title="Professional"
                price="79"
                features={["Unlimited appointments", "Advanced analytics"]}
                popular
              />
              <PricingCard
                title="Enterprise"
                price="199"
                features={["Dedicated manager", "Custom integrations"]}
              />
            </div>
          </div>
        </section>

        {/* --- 7. CTA Section --- */}
        <section className="px-6 py-12" data-aos="fade-up">
          <div className="max-w-6xl mx-auto bg-linear-to-br from-blue-600 to-cyan-500 rounded-[2.5rem] p-8 sm:p-16 text-center text-white">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">
              Ready to transform your business?
            </h2>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
              Start Your Free Trial <HiArrowRight />
            </button>
          </div>
        </section>

        {/* --- 8. Footer --- */}
        <footer className="py-12 border-t border-slate-100 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-8 text-slate-500 text-sm text-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0081ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
              <FiNavigation2 className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-bold text-[#0081ff]">Nexus</span>
          </div>
          <div className="flex gap-8 font-bold">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms
            </a>
          </div>
          <p>© 2026 Nexus. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

// Reusable Components to keep code clean as per World-Class Project criteria
const TestimonialCard = ({ name, role, text, color }) => (
  <div
    className="bg-white p-10 rounded-2xl shadow-sm border border-slate-50"
    data-aos="fade-up"
  >
    <div className="flex text-amber-400 mb-6">★★★★★</div>
    <p className="text-slate-700 font-medium mb-8 leading-relaxed italic">
      "{text}"
    </p>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full ${color}`}></div>
      <div>
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {role}
        </p>
      </div>
    </div>
  </div>
);

const PricingCard = ({ title, price, features, popular }) => (
  <div
    className={`p-10 rounded-3xl border ${popular ? "border-blue-500 shadow-xl relative" : "border-slate-100 shadow-sm"} flex flex-col`}
  >
    {popular && (
      <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-extrabold mb-1">{title}</h3>
    <div className="mb-8 flex items-baseline gap-1">
      <span className="text-5xl font-black text-slate-900">${price}</span>
      <span className="text-slate-400 font-bold">/month</span>
    </div>
    <button
      className={`w-full py-4 rounded-xl font-extrabold text-sm mb-10 transition-colors ${popular ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
    >
      Get Started ❯
    </button>
    <ul className="space-y-4">
      {features.map((f, i) => (
        <li
          key={i}
          className="flex items-center gap-3 text-sm text-slate-500 font-bold"
        >
          <HiCheckCircle className="text-emerald-500" /> {f}
        </li>
      ))}
    </ul>
  </div>
);

export default MainPage;
