"use client";

import { useState } from "react";
import Modal from "./Modal";

interface Fasilitas {
  id: number;
  nama: string;
  gambar: string; // URL gambar
}

export const DataTableFasilitas = () => {
  const [list, setList] = useState<Fasilitas[]>([
    { id: 1, nama: "WiFi", gambar: "https://via.placeholder.com/80" },
    { id: 2, nama: "Dapur Bersama", gambar: "https://via.placeholder.com/80" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Fasilitas | null>(null);

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (item: Fasilitas) => {
    setEditData(item);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus fasilitas ini?")) {
      setList(list.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
      >
        + Tambah Fasilitas
      </button>

      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700">
  <tr>
    <th className="py-3 px-4 text-left">ID</th>
    <th className="py-3 px-4 text-left">Gambar</th>
    <th className="py-3 px-4 text-left">Nama Fasilitas</th>
    <th className="py-3 px-4 text-center">Actions</th>
  </tr>
</thead>


        <tbody>
          {list.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.id}</td>
              <td className="p-3">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-16 h-16 rounded object-cover"
                />
              </td>
              <td className="p-3">{item.nama}</td>

              <td className="p-3 text-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          title={editData ? "Edit Fasilitas" : "Tambah Fasilitas"}
          onClose={() => setShowModal(false)}
        >
          <form
  onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const file = formData.get("gambar") as File;
    let imageUrl = editData?.gambar || "";

    if (file && file.size > 0) {
      imageUrl = URL.createObjectURL(file);
    }

    const newData = {
      id: editData ? editData.id : list.length + 1,
      nama: formData.get("nama") as string,
      gambar: imageUrl,
    };

    if (editData) {
      setList(list.map((item) => (item.id === editData.id ? newData : item)));
    } else {
      setList([...list, newData]);
    }

    setShowModal(false);
  }}
>
  <label className="block">Nama Fasilitas</label>
  <input
    name="nama"
    defaultValue={editData?.nama || ""}
    className="border p-2 rounded w-full"
    required
  />

  <label className="block mt-2">Upload Gambar</label>
  <input
    type="file"
    accept="image/*"
    name="gambar"
    className="border p-2 rounded w-full"
  />

  <button
    type="submit"
    className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
  >
    Simpan
  </button>
</form>

        </Modal>
      )}
    </>
  );
};
