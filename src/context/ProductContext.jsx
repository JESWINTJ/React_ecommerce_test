import { useState, useEffect } from 'react';
import { ProductContext } from './productContextObject';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Create [cite: 22]
  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }; // Fake ID
    setProducts([productWithId, ...products]);
  };

  // Update 
  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === parseInt(id) ? { ...p, ...updatedProduct, id: parseInt(id) } : p));
  };

  // Delete [cite: 34]
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== parseInt(id)));
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
