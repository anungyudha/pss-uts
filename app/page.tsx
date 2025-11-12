import Link from 'next/link';
import KostCard from './components/KostCard';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Metadata } from 'next';

// Definisikan tipe data kost agar konsisten
interface KostData {
  id: string;
  name: string;
  price: number;
  location: string;
  type: 'Putra' | 'Putri' | 'Campur';
  facilities: string[];
  imageUrl: string;
  isBooked: boolean;
}

// Metadata unik untuk halaman ini
export const metadata: Metadata = {
  title: "Gsuites - Temukan Kost Idaman Anda",
  description: "Pilihan kost eksklusif dengan desain modern di lokasi terbaik.",
};

// Data dummy
const dummyKostData: KostData[] = [
  {
    id: 'k001',
    name: 'Kost A Pilihan',
    price: 1800000,
    location: 'Bandung, Jawa Barat',
    type: 'Putri',
    facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Dapur'],
    imageUrl: 'https://placehold.co/600x400/97A87A/ffffff?text=Kost+A',
    isBooked: false,
  },
  {
    id: 'k002',
    name: 'Kost B Exclusive',
    price: 2500000,
    location: 'Jakarta Selatan',
    type: 'Campur',
    facilities: ['WiFi', 'AC', 'Parkir Mobil', 'Kolam Renang'],
    imageUrl: 'https://placehold.co/600x400/DAD7CD/000000?text=Kost+B',
    isBooked: true,
  },
  {
    id: 'k003',
    name: 'Kost C Murah',
    price: 1200000,
    location: 'Yogyakarta',
    type: 'Putra',
    facilities: ['WiFi', 'Kamar Mandi Luar', 'Kasur'],
    imageUrl: 'https://placehold.co/600x400/97A87A/ffffff?text=Kost+C',
    isBooked: false,
  },
  {
    id: 'k004',
    name: 'Kost D Elite',
    price: 3500000,
    location: 'Surabaya Pusat',
    type: 'Campur',
    facilities: ['WiFi', 'AC', 'TV Kabel', 'Water Heater'],
    imageUrl: 'https://placehold.co/600x400/DAD7CD/000000?text=Kost+D',
    isBooked: false,
  },
];


export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className=" bg-[#DAD7CD] min-h-screen shadow-2xl rounded-t-3xl border-t border-gray-200">
        {/* HERO SECTION - Diubah untuk Gambar Latar Belakang dan Konten Kiri */}
        <header
          className="
                      h-[450px] bg-cover bg-center relative mb-12 shadow-inner 
                      // MEREFERENSIKAN FILE DARI FOLDER PUBLIC. Pastikan file hero-image.jpg ada di direktori public Anda.
                      bg-[url('/hero-image.jpg')]
                  "
        >
          {/* Overlay (untuk kontras teks) */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          {/* Konten Hero (Teks dan Search Bar) */}
          <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
            {/* Kontainer Teks disesuaikan untuk rata kiri (mx-0) */}
            <div className="max-w-2xl text-left mx-0">
              <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight text-shadow-md">
                Temukan "Rumah" Terbaik Anda
              </h1>
              <p className="text-xl text-gray-100 mb-8 text-shadow-sm">
                Pilihan kost eksklusif dengan desain modern, sesuai dengan selera Gsuites Anda.
              </p>

              {/* Search Bar Sederhana */}
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Cari lokasi, area, atau nama kost..."
                  className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#97A87A] focus:border-transparent transition-shadow"
                />
                <button className="bg-[#97A87A] text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-[#7D8F5C] transition duration-300">
                  Cari
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* KOST LIST SECTION */}
        <section id='rooms' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Warna teks diubah menjadi abu-abu gelap agar kontras dengan latar belakang putih */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-[#DAD7CD] pb-2">
            Rekomendasi Kost Pilihan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Mapping data ke KostCard */}
            {dummyKostData.map((kostItem) => (
              <KostCard key={kostItem.id} kost={kostItem} />
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <Link
              href="/search"
              className="inline-block px-8 py-3 bg-[#DAD7CD] text-[#97A87A] font-semibold rounded-full hover:bg-gray-200 transition duration-300 shadow-md"
            >
              Lihat Semua Kost
            </Link>
          </div> */}
        </section>

        <section id="location" className="bg-[#97A87A] py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#DAD7CD] mb-6">
              Lokasi Kami
            </h2>
            <p className="text-[#DAD7CD] max-w-2xl mx-auto mb-8">
              Gsuites berlokasi di <span className="font-semibold text-[#73805d]">
                Pendrikan Kidul, Semarang Tengah, Kota Semarang</span>  pusat aktivitas yang dekat dengan kampus, pusat perbelanjaan, dan transportasi umum.
            </p>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.958493518525!2d110.40987337499523!3d-6.989052293005875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4fbf9e3b1b%3A0xf5bba3f28cb38b89!2sPendrikan%20Kidul%2C%20Kec.%20Semarang%20Tengah%2C%20Kota%20Semarang%2C%20Jawa%20Tengah%2050131!5e0!3m2!1sen!2sid!4v1730641200000!5m2!1sen!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-[#DAD7CD] text-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Tentang Gsuites
            </h2>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-10">
              <span className="font-semibold text-[#97A87A]">Gsuites</span> adalah platform penyedia kost modern yang mengedepankan
              kenyamanan, keamanan, dan desain elegan. Kami berkomitmen menghadirkan hunian yang bukan hanya tempat tinggal,
              tetapi juga ruang untuk berkembang dan merasa seperti di rumah sendiri.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
              <div className="p-6 bg-[#F9FAF8] rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#97A87A] mb-3 text-center">Nyaman & Aman</h3>
                <p>Kami memastikan setiap kost memiliki fasilitas terbaik dengan sistem keamanan 24 jam dan lingkungan yang bersih.</p>
              </div>
              <div className="p-6 bg-[#F9FAF8] rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#97A87A] mb-3 text-center">Desain Modern</h3>
                <p>Setiap kamar dirancang dengan estetika modern dan minimalis, menciptakan suasana yang tenang dan produktif.</p>
              </div>
              <div className="p-6 bg-[#F9FAF8] rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#97A87A] mb-3 text-center">Pelayanan Ramah</h3>
                <p>Tim kami siap membantu Anda menemukan kost terbaik sesuai kebutuhan dan preferensi Anda.</p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
      
    </>
  );
}
