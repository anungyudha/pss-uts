"use client";

import { useState } from "react";
import { authApi } from "../lib/api/auth";
import { authHelpers } from "../lib/utils/auth";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [registerStep, setRegisterStep] = useState(1);

  // State untuk form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk feedback
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // === LOGIN ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Login dan dapatkan token
      const loginResponse = await authApi.login({ email, password });
      const { token } = loginResponse.datas;

      // Simpan token
      authHelpers.setToken(token);

      // Ambil data user untuk cek role
      const meResponse = await authApi.me();
      const userData = meResponse.datas;

      // Simpan data user
      authHelpers.setUserData(userData);

      alert(`Login sukses! Selamat datang, ${userData.username}`);
      onClose();

      // Redirect berdasarkan role
      if (userData.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || err.message || "Login gagal";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // === REGISTER TAHAP 1: Request OTP ===
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.requestOTP({ email });
      alert("OTP telah dikirim ke email Anda!");
      setRegisterStep(2);
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || err.message || "Gagal mengirim OTP";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // === REGISTER TAHAP 2: Verifikasi OTP ===
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.verifyOTP({ email, otp });
      alert("Verifikasi berhasil!");
      setRegisterStep(3);
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || err.message || "Kode OTP salah";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // === REGISTER TAHAP 3: Complete Registration ===
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      await authApi.completeRegistration({ email, username, password, confPassword: confirmPassword });
      alert("Registrasi berhasil! Silakan login.");
      
      // Reset form dan switch ke login
      setIsLogin(true);
      setRegisterStep(1);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || err.message || "Registrasi gagal";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Reset state saat pindah mode
  const switchToRegister = () => {
    setIsLogin(false);
    setRegisterStep(1);
    setError("");
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setRegisterStep(1);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#DAD7CD] rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        {/* Judul */}
        <h2 className="text-2xl font-bold text-center mb-2 text-[#97A87A]">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Progress Bar untuk Register */}
        {!isLogin && (
          <div className="mb-4">
            <p className="text-center text-sm text-[#97A87A] mb-2">
              Tahap {registerStep} dari 3
            </p>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-[#97A87A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(registerStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* === FORM LOGIN === */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#97A87A]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Masukkan email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#97A87A]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Masukkan password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#97A87A] hover:bg-[#7f8d67] text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center text-sm text-[#97A87A] mt-4">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={switchToRegister}
                className="text-[#687454] hover:underline font-semibold"
              >
                Daftar
              </button>
            </p>
          </form>
        ) : (
          // === FORM REGISTER ===
          <>
            {/* TAHAP 1: Input Email */}
            {registerStep === 1 && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#97A87A]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#97A87A] hover:bg-[#7f8d67] text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
                >
                  {loading ? "Mengirim..." : "Kirim Kode OTP"}
                </button>

                <p className="text-center text-sm text-[#97A87A] mt-4">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-[#687454] hover:underline font-semibold"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}

            {/* TAHAP 2: Input OTP */}
            {registerStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <p className="text-sm text-[#97A87A] mb-3">
                  Kode OTP telah dikirim ke <strong>{email}</strong>
                </p>
                <div>
                  <label className="block text-sm font-medium text-[#97A87A]">
                    Kode OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                    placeholder="Masukkan 6 digit kode"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#97A87A] hover:bg-[#7f8d67] text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
                >
                  {loading ? "Memverifikasi..." : "Verifikasi Kode"}
                </button>

                <button
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  className="w-full text-[#687454] hover:underline text-sm"
                >
                  ← Kembali ubah email
                </button>
              </form>
            )}

            {/* TAHAP 3: Form Lengkap */}
            {registerStep === 3 && (
              <form onSubmit={handleCompleteRegistration} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#97A87A]">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                    placeholder="Username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#97A87A]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                    placeholder="Minimal 6 karakter"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#97A87A]">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                    placeholder="Masukkan ulang password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#97A87A] hover:bg-[#7f8d67] text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
                >
                  {loading ? "Mendaftar..." : "Daftar Sekarang"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}