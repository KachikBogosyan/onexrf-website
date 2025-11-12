import products from "../../data/products.json";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <li key={p.slug} className="p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
