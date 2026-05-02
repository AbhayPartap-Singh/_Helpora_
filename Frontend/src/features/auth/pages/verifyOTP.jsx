import React, { useState, useRef, useEffect } from 'react';

const VerifyOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto jump to next input
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Jump to previous on backspace if current is empty
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6).split('');
        
        if (pastedData.length === 0) return;
        
        const newOtp = [...otp];
        pastedData.forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        
        // Focus the next empty input or the last one
        const nextFocusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextFocusIndex].focus();
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Verify Your Email</h1>
                    <p className="text-sm text-slate-500">
                        We sent a 6-digit verification code to<br />
                        <span className="font-medium text-slate-700">john@company.com</span>
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="flex justify-between gap-2 sm:gap-3 mb-8" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                />
                            ))}
                        </div>

                        <button 
                            type="submit" 
                            disabled={otp.some(d => d === '')}
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] active:scale-[0.98] border border-transparent"
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className="text-center space-y-4">
                        <div className="text-sm">
                            <span className="text-slate-500">Didn't receive the code? </span>
                            {timeLeft > 0 ? (
                                <span className="text-slate-400 font-medium">Resend in {formatTime(timeLeft)}</span>
                            ) : (
                                <button onClick={() => setTimeLeft(30)} className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
                                    Resend OTP
                                </button>
                            )}
                        </div>
                        
                        <div>
                            <button className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Change email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;