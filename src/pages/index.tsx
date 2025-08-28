import React, { useState } from "react";

const LandingPage: React.FC = () => {
  const API_BASE = "https://api.emercadocr.com";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: Record<string, string> = {};
    formData.forEach((v, k) => (data[k] = v.toString().trim()));

    if (!data.nombre) return alert("Por favor ingresa tu nombre.");
    if (!data.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo))
      return alert("Por favor ingresa un correo válido.");
    if (!data.mensaje) return alert("Por favor ingresa un mensaje.");

    try {
      const resp = await fetch(`${API_BASE}/api/contactos/crear`, {
        method: "POST",
        body: formData,
      });

      const json = await resp.json();
      if (!resp.ok || json?.success === false) {
        throw new Error(json?.message || "Error al enviar el contacto");
      }

      alert("Formulario enviado correctamente ✅");
      form.reset();
      setIsModalOpen(false); // Cierra el modal al enviar
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Ocurrió un error al enviar el formulario");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gradient-to-b from-[#E3F2FD] via-white to-[#F5F5F5] min-h-screen flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 lg:px-16 py-6 bg-white shadow-lg border-b border-[#E3F2FD] sticky top-0 z-50">
        <div className="text-[#2196F3] font-extrabold text-2xl">eMercado</div>
        <nav className="hidden md:flex space-x-8 text-[#424242] font-medium">
          <a href="#modules" className="hover:text-[#1565C0] transition-colors">Modulos</a>
          <a href="#contact" className="hover:text-[#1565C0] transition-colors">Contacto</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-20 gap-12 relative overflow-hidden bg-gradient-to-r from-[#E3F2FD] via-white to-[#F5F5F5] rounded-b-[40px] shadow-card">
        <div className="flex-1 space-y-6 relative z-10 animate-fadeIn">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#424242] leading-tight">
            eMercado: <span className="text-[#2196F3]">Tu negocio</span>, unificado y bajo control
          </h1>
          <p className="text-lg text-[#616161] max-w-lg">
            Administra ventas, pedidos, inventario, facturación electrónica y mucho más desde una interfaz intuitiva y centralizada.
          </p>
          <button onClick={openModal} className="bg-[#FF5722] hover:bg-[#FF8A65] text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
            Contáctanos
          </button>
        </div>
        <div className="flex-1 relative flex justify-center animate-fadeInDelay">
          <div className="absolute -top-12 -left-12 w-72 h-72 bg-[#BBDEFB] rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFCCBC] rounded-full blur-3xl opacity-30"></div>
          <img src="/logotipo.svg" alt="Logo eMercado" className="relative w-48 md:w-80 drop-shadow-2xl" />
        </div>
      </section>

      {/* Módulos */}
      <section id="modules" className="bg-white py-20 px-8 lg:px-16 text-center">
        <h2 className="text-3xl font-bold text-[#424242] mb-12">
          Módulos incluidos en eMercado
        </h2>
        <p className="text-[#616161] mb-12 max-w-3xl mx-auto">
          eMercado integra todos los módulos necesarios para administrar tu negocio de forma centralizada.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-left">
          {[
            { icon: "🛍️", title: "Ventas", desc: "Registro, control y seguimiento de ventas físicas y en línea." },
            { icon: "📥", title: "Compras", desc: "Gestión de órdenes de compra, proveedores y abastecimiento." },
            { icon: "📦", title: "Inventario", desc: "Control de existencias, multi-bodega y kardex completo." },
            { icon: "📑", title: "Pedidos", desc: "Pedidos físicos y online con seguimiento de estados." },
            { icon: "🧾", title: "Facturación electrónica", desc: "Facturas, tiquetes y notas de crédito integrados con MH." },
            { icon: "🌐", title: "Ecommerce", desc: "Tienda en línea integrada con pagos (Tarjeta, Sinpe)." },
            { icon: "👥", title: "Clientes", desc: "Gestión de clientes, historial de compras y fidelización." },
            { icon: "📜", title: "Proveedores", desc: "Administración de proveedores y control de compras." },
            { icon: "🔐", title: "Usuarios y roles", desc: "Control de accesos, roles personalizados y permisos." },
            { icon: "📊", title: "Reportes", desc: "Reportes de ventas, compras, impuestos y KPIs." },
            { icon: "📈", title: "Analítica", desc: "Dashboard avanzado con métricas clave de negocio." },
            { icon: "💳", title: "POS", desc: "Punto de venta integrado para ventas rápidas y tickets." }
          ].map((mod, i) => (
            <div
              key={i}
              className="bg-[#F5F5F5] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E3F2FD] flex flex-col items-start"
            >
              <div className="text-4xl mb-3">{mod.icon}</div>
              <h3 className="text-lg font-bold text-[#2196F3] mb-2">{mod.title}</h3>
              <p className="text-[#616161]">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-8 lg:px-16 bg-[#F5F5F5] text-center"
      >
        <h2 className="text-3xl font-bold text-[#424242] mb-8">Contacto</h2>
        <p className="text-[#616161] mb-6">
          ¿Listo para llevar tu negocio al siguiente nivel? Contáctanos.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-card shadow-card-hover space-y-4"
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="w-full border border-[#E3F2FD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            className="w-full border border-[#E3F2FD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            className="w-full border border-[#E3F2FD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-[#FF5722] hover:bg-[#FF8A65] text-white px-6 py-3 rounded-lg font-semibold w-full shadow-lg"
          >
            Enviar mensaje
          </button>
        </form>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#424242] mb-6 text-center">Contáctanos</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="w-full border border-[#E3F2FD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                className="w-full border border-[#E3F2FD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              />
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                className="w-full border border-[#E3F2FD] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="bg-[#FF5722] hover:bg-[#FF8A65] text-white px-6 py-3 rounded-lg font-semibold w-full shadow-lg"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white py-8 text-center text-[#757575] text-sm border-t">
        © {new Date().getFullYear()} eMercado – Todos los derechos reservados.
        <br />
        <a
          href="https://azsoftcr.com"
          target="_blank"
          className="text-[#2196F3] hover:text-[#1565C0] font-semibold transition-colors text-xs"
        >
          Powered by AzSoft
        </a>
      </footer>
      
    </div>
  );
};

export default LandingPage;