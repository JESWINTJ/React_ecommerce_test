import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-blue-600 p-4 text-white shadow-md flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Online Store</Link>
            <Link to="/add-product" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">Add Product</Link>
          </nav>
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<ProductForm />} />
              <Route path="/edit-product/:id" element={<ProductForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;