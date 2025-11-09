export function DataTable() {
  const data = [
    ["Etiam purus in", "Curabitur donec duis", "Morbi pharetra, accumsan"],
    ["Duis eget habitant", "At amet odio", "Commodo eget scelerisque"],
    ["Aliquam velit lacus", "Pellentesque egestas placerat", "Tortor habitant sit"],
    ["Fermentum scelerisque", "Morbi sagittis nulla", "Quam semper quis"],
  ];

  return (
    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-2 text-left">Table Title</th>
          <th className="px-4 py-2 text-left">Table Title</th>
          <th className="px-4 py-2 text-left">Table Title</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2">{cell}</td>
            ))}
            <td className="px-4 py-2 flex gap-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
              <button className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
