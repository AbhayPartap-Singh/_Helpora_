import React, { useState } from 'react';
import useAuth from '../hook/useAuth.js';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {handleRegister} = useAuth()

    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        password:'',
        companyName: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleRegister({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            companyName: formData.companyName
        })

        navigate("/")
    }

    }

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Left Column: Brand Highlights & Visual */}
            <section className="hidden lg:flex flex-1 relative flex-col justify-center p-12 bg-gradient-to-br from-indigo-50/80 via-white to-slate-100/50 overflow-hidden border-r border-slate-200">
                {/* Brand Identity */}
                <div className="z-10">
                    <span className="text-indigo-600 font-extrabold text-2xl tracking-tight">Helpora</span>
                </div>

                {/* Value Proposition Cluster */}
                <div className="z-10 max-w-lg space-y-8 mb-16">
                    <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900">
                        Deliver world-class support with precision.
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Join 2,500+ high-growth teams using Helpora to turn customer support into a competitive advantage.
                    </p>

                    {/* Feature List */}
                    <div className="grid gap-5 pt-4">
                        {[
                            'Enterprise-grade security standards',
                            'Real-time collaboration for distributed teams',
                            'Predictive analytics and reporting'
                        ]
                        .map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100/80 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-slate-700 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Visualization Card Overlay (Decorative) */}
                <div className="absolute bottom-0 right-0 w-[120%] h-1/2 translate-x-20 translate-y-16">
                    <div className="w-full h-full rounded-tl-[2rem] bg-slate-50 border border-slate-200 shadow-xl p-6 overflow-hidden relative">
                        {/* Mock UI Header */}
                        <div className="w-full h-12 border-b border-slate-200 flex items-center gap-3 mb-4">
                             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                        </div>
                        {/* Mock UI Content */}
                        {/* <div className="flex gap-4">
                            <div className="w-48 h-64 bg-white border border-slate-100 rounded-lg shadow-sm"></div>
                            <div className="flex-1 space-y-4">
                                <div className="w-full h-24 bg-white border border-slate-100 rounded-lg shadow-sm"></div>
                                <div className="w-full h-32 bg-white border border-slate-100 rounded-lg shadow-sm"></div>
                            </div>
                        </div> */}
                    </div>
                </div>

                Abstract Decorative Elements
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]"></div>
            </section>

            {/* Right Column: Registration Form */}
            <section className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white lg:bg-slate-50 relative">
                <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header */}
                    <div className="text-center lg:text-left mb-8">
                        {/* Mobile Brand (visible only on mobile) */}
                        <div className="lg:hidden mb-8">
                            <span className="text-indigo-600 font-extrabold text-3xl tracking-tight">Helpora</span>
                        </div>
                        
                        <h2 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">Create your workspace</h2>
                        <p className="text-slate-500">Start your 14-day free trial. No credit card required.</p>
                    </div>

                    {/* Registration Card */}
                    <div className="bg-white lg:border lg:border-slate-200 lg:p-8 lg:rounded-2xl lg:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-6">
                        
                        {/* Social Login */}
                        <button className="w-full h-11 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors focus:ring-4 focus:ring-slate-100 outline-none">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span className="font-medium text-slate-700">Continue with Google</span>
                        </button>

                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">or use email</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-1" htmlFor="full_name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="full_name" 
                                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 text-sm" 
                                    placeholder="John Doe" 
                                    name="name"
                                    value={formdata.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-1" htmlFor="work_email">Work Email</label>
                                <input 
                                    type="email" 
                                    id="work_email" 
                                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 text-sm" 
                                    placeholder="john@company.com"
                                    value={formdata.email}
                                    onChange={handleChange}
                                    name="email" 
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-1" htmlFor="company_name">Company / Workspace Name</label>
                                <input 
                                    type="text" 
                                    id="company_name" 
                                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 text-sm" 
                                    placeholder="Acme Inc." 
                                    name="companyName"
                                    value={formdata.companyName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-1" htmlFor="password">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        id="password" 
                                        className="w-full h-11 pl-4 pr-11 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 text-sm" 
                                        placeholder="••••••••" 
                                        name="password"
                                        value={formdata.password}
                                        onChange={handleChange}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] active:scale-[0.98] border border-transparent flex items-center justify-center gap-2">
                                    Create Workspace
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer Sign In */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline underline-offset-4 transition-all">Sign in</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;