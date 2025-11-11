"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useRoom } from "../lib/hooks/useRoom";
import { useFacility } from "../lib/hooks/useFacility";
import type { Room } from "../lib/types/room";

type TabType = "info" | "facilities";

export const DataTable = () => {
  const { 
    rooms = [], 
    loading, 
    error, 
    fetchRooms, 
    addRoom, 
    editRoom, 
    deleteRoom,
    fetchRoomDetail 
  } = useRoom();

  const {
    facilities,
    fetchFacilities,
    syncFacilityToRoom,
  } = useFacility();
  
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [editData, setEditData] = useState<Room | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState<number[]>([]);
  const [facilityLoading, setFacilityLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  // Fetch facilities when detail modal opens
  useEffect(() => {
    if (showDetailModal && activeTab === "facilities") {
      fetchFacilities();
    }
  }, [showDetailModal, activeTab]);

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (room: Room, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditData(room);
    setShowModal(true);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Yakin ingin menghapus data kamar ini?")) {
      const result = await deleteRoom(id);
      if (result.success) {
        alert("Kamar berhasil dihapus!");
      } else {
        alert(result.error || "Gagal menghapus kamar");
      }
    }
  };

  const handleRowClick = async (room: Room) => {
    setDetailLoading(true);
    setShowDetailModal(true);
    setActiveTab("info"); // Reset to info tab
    
    const result = await fetchRoomDetail(room.id);
    if (result.success && result.data) {
      setSelectedRoom(result.data);
      // Set initial selected facilities
      setSelectedFacilityIds(result.data.fasilitas?.map(f => f.id) || []);
    } else {
      alert(result.error || "Gagal memuat detail kamar");
      setShowDetailModal(false);
    }
    setDetailLoading(false);
  };

  const handleToggleFacility = (id: number) => {
    setSelectedFacilityIds((prev) =>
      prev.includes(id)
        ? prev.filter((fId) => fId !== id)
        : [...prev, id]
    );
  };

  const handleSaveFacilities = async () => {
    if (!selectedRoom) return;

    setFacilityLoading(true);
    const result = await syncFacilityToRoom({
      kamarId: selectedRoom.id.toString(),
      fasilitasId: selectedFacilityIds,
    });

    if (result.success) {
      alert("Fasilitas kamar berhasil diperbarui!");
      // Refresh room detail
      await handleRowClick(selectedRoom);
      setActiveTab("info");
    } else {
      alert(result.error || "Gagal memperbarui fasilitas kamar");
    }
    setFacilityLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const noKamar = formData.get("nomor") as string;
    const harga = parseInt(formData.get("harga") as string);
    const deskripsi = formData.get("deskripsi") as string;
    const status = formData.get("status") as "tersedia" | "terisi";

    try {
      if (editData) {
        const result = await editRoom(editData.id, {
          noKamar,
          harga,
          deskripsi,
          status,
        });
        
        if (result.success) {
          alert("Kamar berhasil diperbarui!");
          setShowModal(false);
        } else {
          alert(result.error || "Gagal memperbarui kamar");
        }
      } else {
        const result = await addRoom({ noKamar, harga });
        
        if (result.success) {
          alert("Kamar berhasil ditambahkan!");
          setShowModal(false);
        } else {
          alert(result.error || "Gagal menambahkan kamar");
        }
      }
    } catch (err) {
      alert("Terjadi kesalahan");
    } finally {
      setFormLoading(false);
    }
  };

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "tersedia":
        return "text-green-600 bg-green-100";
      case "terisi":
        return "text-red-600 bg-red-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manajemen Kamar</h2>
          <p className="text-sm text-gray-600 mt-1">Klik baris untuk melihat detail kamar</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
          disabled={loading}
        >
          + Tambah Kamar
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && (!rooms || rooms.length === 0) ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Memuat data kamar...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nomor Kamar</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!rooms || rooms.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Belum ada data kamar. Tambahkan kamar pertama Anda!
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr 
                    key={room.id} 
                    onClick={() => handleRowClick(room)}
                    className="border-b hover:bg-indigo-50 text-gray-600 cursor-pointer transition-colors"
                  >
                    <td className="p-3">{room.id}</td>
                    <td className="p-3 font-medium">{room.nomer_kamar}</td>
                    <td className="p-3">{formatPrice(room.harga)}</td>
                    <td className="p-3">{room.deskripsi || "-"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={(e) => handleEdit(room, e)}
                        className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(room.id, e)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 text-sm"
                        disabled={loading}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal with Tabs */}
      {showDetailModal && (
        <Modal
          title={`Detail Kamar ${selectedRoom?.nomer_kamar || ""}`}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedRoom(null);
            setActiveTab("info");
          }}
        >
          {detailLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">Memuat detail...</p>
            </div>
          ) : selectedRoom ? (
            <>
              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    activeTab === "info"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Info Kamar
                </button>
                <button
                  onClick={() => setActiveTab("facilities")}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    activeTab === "facilities"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Fasilitas ({selectedRoom.fasilitas?.length || 0})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "info" ? (
                /* INFO TAB */
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ID Kamar</p>
                        <p className="font-semibold text-gray-800">{selectedRoom.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Nomor Kamar</p>
                        <p className="font-semibold text-gray-800">{selectedRoom.nomer_kamar}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Harga per Bulan</p>
                    <p className="text-2xl font-bold text-indigo-600">{formatPrice(selectedRoom.harga)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRoom.status)}`}>
                      {selectedRoom.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Deskripsi</p>
                    <p className="text-gray-700">{selectedRoom.deskripsi || "Tidak ada deskripsi"}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Dibuat</p>
                        <p className="text-gray-700">{formatDate(selectedRoom.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Diperbarui</p>
                        <p className="text-gray-700">{formatDate(selectedRoom.updated_at)}</p>
                      </div>
                    </div>
                  </div>

                  {selectedRoom.owner_id && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 mb-1">Owner ID</p>
                      <p className="text-sm text-gray-700 font-mono break-all">{selectedRoom.owner_id}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={(e) => {
                        setShowDetailModal(false);
                        handleEdit(selectedRoom, e as any);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit Kamar
                    </button>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : (
                /* FACILITIES TAB */
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Pilih fasilitas yang tersedia di kamar ini
                  </p>

                  {/* Current Facilities Preview */}
                  {selectedRoom.fasilitas && selectedRoom.fasilitas.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 mb-2">Fasilitas Saat Ini:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoom.fasilitas.map((f) => (
                          <span key={f.id} className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                            <img src={f.icon} alt={f.nama_fasilitas} className="w-4 h-4 object-contain" />
                            {f.nama_fasilitas}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facilities List */}
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {facilities.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        Belum ada fasilitas tersedia. Tambahkan fasilitas terlebih dahulu.
                      </p>
                    ) : (
                      facilities.map((facility) => (
                        <label
                          key={facility.id}
                          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedFacilityIds.includes(facility.id)
                              ? "bg-indigo-50 border-indigo-500"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedFacilityIds.includes(facility.id)}
                            onChange={() => handleToggleFacility(facility.id)}
                            className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                          />
                          <img
                            src={facility.icon}
                            alt={facility.nama_fasilitas}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3C/svg%3E';
                            }}
                          />
                          <span className="flex-1 font-medium capitalize">
                            {facility.nama_fasilitas}
                          </span>
                        </label>
                      ))
                    )}
                  </div>

                  {/* Selected Count */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{selectedFacilityIds.length}</span> fasilitas dipilih
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={handleSaveFacilities}
                      disabled={facilityLoading}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {facilityLoading ? "Menyimpan..." : "Simpan Fasilitas"}
                    </button>
                    <button
                      onClick={() => setActiveTab("info")}
                      disabled={facilityLoading}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </Modal>
      )}

      {/* Modal Form Edit/Add */}
      {showModal && (
        <Modal
          title={editData ? "Edit Kamar" : "Tambah Kamar"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nomor Kamar</label>
                <input
                  name="nomor"
                  type="text"
                  defaultValue={editData?.nomer_kamar || ""}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Contoh: A01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                <input
                  name="harga"
                  type="number"
                  defaultValue={editData ? Number(editData.harga) : ""}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Contoh: 300000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  defaultValue={editData?.deskripsi || ""}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Deskripsi kamar (opsional)"
                  rows={3}
                />
              </div>

              {editData && (
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editData?.status || "tersedia"}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="terisi">Terisi</option>
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formLoading}
            >
              {formLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};