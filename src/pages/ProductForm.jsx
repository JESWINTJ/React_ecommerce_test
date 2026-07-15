import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/productContextObject';

export default function ProductForm() {
  const { id } = useParams(); // If ID exists, we are in Edit mode
  const { products, loading, addProduct, updateProduct } = useProducts();
  const existingProduct = id ? products.find(p => p.id === parseInt(id)) : null;

  if (id && loading) {
    return <div className="text-center text-xl mt-10">Loading product...</div>;
  }

  if (id && !existingProduct) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <ProductFormFields
      key={id || 'new-product'}
      id={id}
      initialData={existingProduct}
      addProduct={addProduct}
      updateProduct={updateProduct}
    />
  );
}

function ProductFormFields({ id, initialData, addProduct, updateProduct }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    category: initialData?.category || ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = 'Enter a valid positive number'; // [cite: 58]
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        updateProduct(id, formData);
        navigate(`/product/${id}`);
      } else {
        addProduct(formData);
        navigate('/'); // [cite: 22]
      }
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>} {/* [cite: 59] */}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows="3"></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border rounded p-2" placeholder="https://..." />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border rounded p-2" />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
          {id ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
