"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useFacility } from "../lib/hooks/useFacility";
import type { Fasilitas } from "../lib/types/facility";

export const DataTableFasilitas = () => {
  const {
    facilities,
    loading,
    error,
    fetchFacilities,
    addFacility,
    editFacility,
    deleteFacility,
  } = useFacility();

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Fasilitas | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setImagePreview(null);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleEdit = (item: Fasilitas) => {
    setEditData(item);
    setImagePreview(item.icon);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus fasilitas ini?")) {
      const result = await deleteFacility(id);
      if (result.success) {
        alert("Fasilitas berhasil dihapus!");
      } else {
        alert(result.error || "Gagal menghapus fasilitas");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const namaFasilitas = formData.get("nama") as string;

    try {
      if (editData) {
        // Edit existing facility
        const result = await editFacility(editData.id, {
          namaFasilitas,
          iconFile: selectedFile || undefined,
        });

        if (result.success) {
          alert("Fasilitas berhasil diperbarui!");
          setShowModal(false);
        } else {
          alert(result.error || "Gagal memperbarui fasilitas");
        }
      } else {
        // Add new facility
        if (!selectedFile) {
          alert("Gambar icon wajib diupload!");
          setFormLoading(false);
          return;
        }

        const result = await addFacility({
          namaFasilitas,
          iconFile: selectedFile,
        });

        if (result.success) {
          alert("Fasilitas berhasil ditambahkan!");
          setShowModal(false);
        } else {
          alert(result.error || "Gagal menambahkan fasilitas");
        }
      }
    } catch (err) {
      alert("Terjadi kesalahan");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
        disabled={loading}
      >
        + Tambah Fasilitas
      </button>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && facilities.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Memuat data fasilitas...</p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Icon</th>
                <th className="py-3 px-4 text-left">Nama Fasilitas</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Belum ada data fasilitas. Tambahkan fasilitas pertama Anda!
                  </td>
                </tr>
              ) : (
                facilities.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 text-gray-600">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">
                      <img
                        src={item.icon}
                        alt={item.nama_fasilitas}
                        className="w-16 h-16 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Cpath d="M9 9h6v6H9z"/%3E%3C/svg%3E';
                        }}
                      />
                    </td>
                    <td className="p-3 capitalize">{item.nama_fasilitas}</td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
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

      {/* Modal Form */}
      {showModal && (
        <Modal
          title={editData ? "Edit Fasilitas" : "Tambah Fasilitas"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Fasilitas
                </label>
                <input
                  name="nama"
                  type="text"
                  defaultValue={editData?.nama_fasilitas || ""}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Contoh: WiFi, AC, Kulkas"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Icon {!editData && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={!editData}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: JPG, PNG. Maks 2MB
                </p>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <label className="block text-sm font-medium mb-1">Preview</label>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 rounded border object-cover"
                  />
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