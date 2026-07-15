import { useProducts } from '../context/productContextObject';
import { Link } from 'react-router-dom';

export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="text-center text-xl mt-10">Loading products...</div>; // [cite: 62]
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>; // [cite: 63]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Link to={`/product/${product.id}`} key={product.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center">
          <img src={product.image} alt={product.title} className="h-40 object-contain mb-4" />
          <h2 className="font-semibold text-gray-800 text-center line-clamp-2">{product.title}</h2>
          <p className="text-lg font-bold text-blue-600 mt-2">${product.price}</p>
        </Link>
      ))}
    </div>
  );
}