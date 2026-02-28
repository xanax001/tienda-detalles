import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL } from '../constants';

export default function Layout({ children }) {
  const { totalItems, totalPrecio } = useCarrito();
  const location = useLocation();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const nav = [
    { path: '/', label: 'Inicio' },
    { path: '/rosas-eternas', label: 'Ramos eternos' },
    { path: '/maquillaje', label: 'Maquillaje' },
    { path: '/carrito', label: 'Carrito' },
  ];

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) navigate('/rosas-eternas');
    else navigate('/');
  };

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">Ir al contenido</a>
      <header className="header header--estilo">
        <div className="container header-inner">
          <Link to="/" className="logo-wrap">
            <span className="logo">GEYDABLOOMS</span>
            <span className="logo-tagline">Detalles y flores eternas</span>
          </Link>
          <nav className="nav">
            {nav.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <form className="header-buscar" onSubmit={handleBuscar} role="search" aria-label="Buscar productos">
            <input
              type="search"
              placeholder="Buscar por..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="header-buscar-input"
              aria-label="Buscar"
            />
            <button type="submit" className="header-buscar-btn" aria-label="Buscar">Buscar</button>
          </form>
          <Link to="/carrito" className="header-carrito-wrap" aria-label="Ver carrito">
            <span className="header-carrito-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </span>
            <span className="header-carrito-texto">Carrito</span>
            <span className="header-carrito-total">S/ {totalPrecio.toFixed(2)}</span>
            {totalItems > 0 && <span className="badge-carrito">{totalItems}</span>}
          </Link>
        </div>
      </header>
      <main id="main-content" className="main" tabIndex={-1}>{children}</main>
      <footer className="footer footer--estilo">
        <div className="footer-inner container">
          <div className="footer-sobre">
            <h3 className="footer-titulo">Sobre nosotros</h3>
            <p className="footer-desc">Somos tu tienda de detalles y arreglos de flores eternas. Rosas preservadas y maquillaje para fechas especiales. Arma tu detalle y envíanos tu pedido por WhatsApp.</p>
          </div>
          <div className="footer-contacto">
            <h3 className="footer-titulo">Pedidos y consultas</h3>
            <p className="footer-desc">¿Dudas, cotización o quieres hacer tu pedido? Escríbenos por WhatsApp y te atendemos.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primario footer-btn-wa">
              Escribir por WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-redes">
            <span className="footer-redes-texto">Síguenos</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-redes-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="footer-redes-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} GEYDABLOOMS — Detalles y flores eternas</p>
        </div>
      </footer>
    </div>
  );
}
