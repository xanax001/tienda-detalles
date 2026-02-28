import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import FloresEternasIndex from './pages/FloresEternasIndex';
import SeccionFlores from './pages/SeccionFlores';
import Maquillaje from './pages/Maquillaje';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rosas-eternas" element={<FloresEternasIndex />} />
        <Route path="/rosas-eternas/:seccionId" element={<SeccionFlores />} />
        <Route path="/maquillaje" element={<Maquillaje />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Layout>
  );
}
