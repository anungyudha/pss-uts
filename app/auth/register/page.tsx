// app/register/page.tsx
"use client";

import { useState } from "react";

export default function RegisterPage() {
  // State untuk tahapan
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Form Lengkap

  // State untuk form
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk feedback
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // TAHAP 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Gagal mengirim OTP");

      alert("OTP telah dikirim ke email Anda!");
      setStep(2); // Pindah ke tahap verifikasi OTP
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // TAHAP 2: Verifikasi OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Kode OTP salah");

      alert("Verifikasi berhasil! Silakan lengkapi data Anda.");
      setStep(3); // Pindah ke tahap form lengkap
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // TAHAP 3: Complete Registration
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registrasi gagal");

      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Daftar Akun
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Tahap {step} dari 3
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* TAHAP 1: Input Email */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Mengirim..." : "Kirim Kode OTP"}
            </button>
          </form>
        )}

        {/* TAHAP 2: Input OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p className="text-sm text-gray-600 mb-4">
              Kode OTP telah dikirim ke <strong>{email}</strong>
            </p>
            <label className="block text-gray-700 font-medium mb-2">
              Kode OTP
            </label>
            <input
              type="text"
              placeholder="Masukkan 6 digit kode"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={6}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 mb-3"
            >
              {loading ? "Memverifikasi..." : "Verifikasi Kode"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-blue-600 hover:underline"
            >
              ← Kembali ubah email
            </button>
          </form>
        )}

        {/* TAHAP 3: Form Lengkap */}
        {step === 3 && (
          <form onSubmit={handleCompleteRegistration}>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <label className="block text-gray-700 font-medium mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              placeholder="Masukkan ulang password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-600 mt-6">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  );
}