"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#97A87A] text-[#DAD7CD] py-10 mt-20" id="footer">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Gsuites</h2>
          <p className="text-sm leading-relaxed">
            Tempat penginapan nyaman dan modern di jantung Kota Semarang.  
            Nikmati pengalaman menginap terbaik dengan layanan premium kami.
          </p>
        </div>

        {/* Kolom 2 - Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#rooms" className="hover:underline">
                Rooms
              </Link>
            </li>
            <li>
              <Link href="#location" className="hover:underline">
                Location
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3 - Kontak & Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Kontak Kami</h3>
          <p className="text-sm mb-2">Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131</p>
          <p className="text-sm mb-4">Email: info@gsuites.com</p>
          <div className="flex space-x-4 text-xl">
            <Link href="https://instagram.com" target="_blank" className="hover:text-white">
              <FaInstagram />
            </Link>
            <Link href="https://facebook.com" target="_blank" className="hover:text-white">
              <FaFacebook />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-white">
              <FaTwitter />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-[#DAD7CD]/30 pt-4 text-center text-sm text-[#DAD7CD]/80">
        © {new Date().getFullYear()} Gsuites. All rights reserved.
      </div>
    </footer>
  );
}
