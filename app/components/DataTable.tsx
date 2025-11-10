"use client";

import { useState } from "react";
import Modal from "./Modal";

interface Kost {
  id: number;
  nomor: string;
  harga: string;
  deskripsi: string;
  status: "Tersedia" | "Terisi";
}

export const DataTable = () => {
  const [list, setList] = useState<Kost[]>([
    { id: 1, nomor: "A01", harga: "1.500.000", deskripsi: "Kamar dengan AC dan WiFi", status: "Tersedia" },
    { id: 2, nomor: "B07", harga: "1.200.000", deskripsi: "Kamar nyaman dengan lemari", status: "Terisi" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Kost | null>(null);

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (kost: Kost) => {
    setEditData(kost);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setList(list.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newData = {
      id: editData ? editData.id : list.length + 1,
      nomor: formData.get("nomor") as string,
      harga: formData.get("harga") as string,
      deskripsi: formData.get("deskripsi") as string,
      status: formData.get("status") as "Tersedia" | "Terisi",
    };

    if (editData) {
      setList(list.map((item) => (item.id === editData.id ? newData : item)));
    } else {
      setList([...list, newData]);
    }

    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
      >
        + Tambah Kost
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-3">ID</th>
            <th className="p-3">Nomor Kost</th>
            <th className="p-3">Harga</th>
            <th className="p-3">Deskripsi</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.nomor}</td>
              <td className="p-3">{item.harga}</td>
              <td className="p-3">{item.deskripsi}</td>
              <td className={`p-3 font-medium ${item.status === "Tersedia" ? "text-green-600" : "text-red-600"}`}>
                {item.status}
              </td>
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
          title={editData ? "Edit Kost" : "Tambah Kost"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label>Nomor Kost</label>
              <input
                name="nomor"
                defaultValue={editData?.nomor || ""}
                className="border p-2 rounded"
                required
              />

              <label>Harga</label>
              <input
                name="harga"
                defaultValue={editData?.harga || ""}
                className="border p-2 rounded"
                required
              />

              <label>Deskripsi</label>
              <textarea
                name="deskripsi"
                defaultValue={editData?.deskripsi || ""}
                className="border p-2 rounded"
                required
              />

              <label>Status</label>
              <select
                name="status"
                defaultValue={editData?.status || "Tersedia"}
                className="border p-2 rounded"
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Terisi">Terisi</option>
              </select>
            </div>

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
