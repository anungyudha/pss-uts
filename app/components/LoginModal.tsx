"use client";

import { useState } from "react";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#DAD7CD] rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Judul */}
        <h2 className="text-2xl font-bold text-center mb-6 text-[#97A87A] ">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* FORM LOGIN */}
        {isLogin ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#97A87A]    ">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Masukkan email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#97A87A]">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Masukkan password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#97A87A] hover:bg-[#7f8d67] text-white font-semibold py-2 rounded-lg transition"
            >
              Masuk
            </button>

            <p className="text-center text-sm text-[#97A87A] mt-4">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-[#687454] hover:underline font-semibold"
              >
                Daftar
              </button>
            </p>
          </form>
        ) : (
          // FORM REGISTER
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#97A87A]">
                Nama
              </label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#97A87A]">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Masukkan email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#97A87A]">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97A87A] bg-[#DAD7CD]"
                placeholder="Buat password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#97A87A] hover:bg-[#7f8d67] text-white font-semibold py-2 rounded-lg transition"
            >
              Daftar
            </button>

            <p className="text-center text-sm text-[#97A87A] mt-4">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-[#687454] hover:underline font-semibold"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
