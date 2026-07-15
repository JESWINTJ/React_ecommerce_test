import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/productContextObject';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id); 
      navigate('/'); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow flex flex-col md:flex-row gap-8 mt-10">
      <div className="md:w-1/2 flex justify-center">
        <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
        <p className="text-sm text-gray-500 mb-6">Category: <span className="capitalize">{product.category}</span></p>
        
        <div className="flex gap-4">
          <Link to={`/edit-product/${product.id}`} className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">Edit</Link> {/* [cite: 28] */}
          <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Delete</button> {/* [cite: 32] */}
        </div>
      </div>
    </div>
  );
}