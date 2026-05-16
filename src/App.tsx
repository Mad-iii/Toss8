import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import Home from './pages/Home.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Checkout from './pages/Checkout.tsx';
import { CartProvider } from './context/CartContext.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <ScrollToTop />
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <footer className="bg-darker py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img 
            src="/images/Toss8_Text.png" 
            alt="TOSS 8" 
            className="mb-4 h-20 w-auto object-contain mx-auto"
          />
          <p className="text-gray-500 text-sm">© 2026 Toss 8 Pakistan. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-6">
             <a href="https://www.instagram.com/toss8pakistan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // @ts-ignore - satisfying strict type check for toast container
        aria-label="Notifications"
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
