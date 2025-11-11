"use client";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg text-black">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {children}
      </div>
    </div>
  );
}
