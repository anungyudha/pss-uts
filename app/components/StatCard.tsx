export function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
