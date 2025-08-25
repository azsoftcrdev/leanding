import React from "react";

const LandingPage: React.FC = () => {


 const API_BASE = import.meta.env.VITE_API_BASE ?? "api.emercadocr.com";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Objeto legible (solo para validar y loguear)
    const data: Record<string, string> = {};
    formData.forEach((v, k) => (data[k] = v.toString().trim()));

    // Validaciones mínimas
    if (!data.nombre) return alert("Por favor ingresa tu nombre.");
    if (!data.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo))
      return alert("Por favor ingresa un correo válido.");
    if (!data.mensaje) return alert("Por favor ingresa un mensaje.");

    console.log("Datos del formulario:", data);

    try {
      // IMPORTANTE: no pongas Content-Type aquí; el navegador lo arma con boundary
      const resp = await fetch(`${API_BASE}/api/contactos/crear`, {
        method: "POST",
        body: formData,
      });

      const json = await resp.json();
      if (!resp.ok || json?.success === false) {
        throw new Error(json?.message || "Error al enviar el contacto");
      }

      alert("Formulario enviado correctamente ✅");
      form.reset(); // limpia el formulario
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Ocurrió un error al enviar el formulario");
    }



    console.log("Datos del formulario:", data);
    alert("Formulario enviado correctamente ✅");
  };

  return (
    <div className="bg-gradient-to-b from-[#E3F2FD] via-white to-[#F5F5F5] min-h-screen flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 lg:px-16 py-6 bg-white shadow-lg border-b border-[#E3F2FD] sticky top-0 z-50">
        <div className="text-[#2196F3] font-extrabold text-2xl">eMercado</div>
        <nav className="hidden md:flex space-x-8 text-[#424242] font-medium">
          <a href="#modules" className="hover:text-[#1565C0] transition-colors">Modulos</a>
          <a href="#pricing" className="hover:text-[#1565C0] transition-colors">Precios</a>
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
          <button className="bg-[#FF5722] hover:bg-[#FF8A65] text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
            Comenzá hoy
          </button>
        </div>
        <div className="flex-1 relative flex justify-center animate-fadeInDelay">
          <div className="absolute -top-12 -left-12 w-72 h-72 bg-[#BBDEFB] rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFCCBC] rounded-full blur-3xl opacity-30"></div>
          <img src="/logotipo.svg" alt="Logo eMercado" className="relative w-80 drop-shadow-2xl" />
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

    {/* Pricing */}
    <section id="pricing" className="py-20 px-8 lg:px-16 text-center bg-white">
      <h2 className="text-3xl font-bold text-[#424242] mb-12">Planes y Precios</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Plan Emprende */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6 shadow-card shadow-card-hover border border-[#0D47A1]">
          <h3 className="text-2xl font-bold text-[#2196F3]">Plan Emprende</h3>
          <p className="text-3xl font-extrabold text-[#424242] my-4">₡0 / mes</p>
          <ul className="text-[#616161] list-disc list-inside space-y-1 text-left">
            <li>Comisión Ecommerce: 5% por venta</li>
            <li>Facturación electrónica: 30 facturas/mes, luego ₡20 c/u</li>
            <li>Usuarios: 1</li>
            <li>Inventario básico: hasta 100 productos</li>
            <li>Pedidos activo siempre</li>
            <li>Ecommerce básico: catálogo, carrito, envío básico</li>
            <li>Reportes básicos: ventas y pedidos</li>
            <li>Soporte: Email</li>
          </ul>
        </div>

        {/* Plan Negocio */}
        <div className="bg-[#64B5F6] rounded-2xl p-6 shadow-card shadow-card-hover border-2 border-[#0D47A1] relative text-white">
          <span className="absolute top-0 right-0 bg-[#0D47A1] text-white text-xs px-3 py-1 rounded-bl-lg">
            Más Popular
          </span>
          <h3 className="text-2xl font-bold">Plan Negocio</h3>
          <p className="text-3xl font-extrabold my-4">₡9,900 / mes</p>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>Comisión Ecommerce: 3% por venta</li>
            <li>Facturación electrónica: Ilimitada (₡15 c/u si excede 1,000 docs)</li>
            <li>Usuarios: 1</li>
            <li>Inventario avanzado: productos ilimitados, alertas de stock</li>
            <li>Pedidos con estados y seguimiento</li>
            <li>Ecommerce estándar: catálogo, carrito, pagos (Tarjeta y Sinpe)</li>
            <li>Reportes avanzados: ventas, gastos, impuestos</li>
            <li>Soporte: Email y WhatsApp (24h)</li>
          </ul>
        </div>

        {/* Plan Pro */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6 shadow-card shadow-card-hover border border-[#0D47A1]">
          <h3 className="text-2xl font-bold text-[#2196F3]">Plan Pro – Crecimiento</h3>
          <p className="text-3xl font-extrabold text-[#424242] my-4">₡19,900 / mes</p>
          <ul className="text-[#616161] list-disc list-inside space-y-1 text-left">
            <li>Comisión Ecommerce: 1.5% por venta</li>
            <li>Facturación electrónica: Ilimitada</li>
            <li>Usuarios: hasta 2</li>
            <li>Inventario avanzado: multi-bodega, multi-sucursal</li>
            <li>Pedidos multicanal: tienda, ecommerce, POS</li>
            <li>Ecommerce avanzado: pagos múltiples, dominio propio</li>
            <li>Analítica avanzada: dashboard, tendencias, KPIs</li>
            <li>Reportes personalizados por fecha y sucursal</li>
            <li>Soporte prioritario: Email y WhatsApp (12h)</li>
          </ul>
        </div>

        {/* Plan Empresa */}
        <div className="bg-[#F5F5F5] rounded-2xl p-6 shadow-card shadow-card-hover border border-[#0D47A1]">
          <h3 className="text-2xl font-bold text-[#2196F3]">Plan Empresa – Escala</h3>
          <p className="text-3xl font-extrabold text-[#424242] my-4">₡39,900 / mes</p>
          <ul className="text-[#616161] list-disc list-inside space-y-1 text-left">
            <li>Comisión Ecommerce: 0.5% por venta</li>
            <li>Facturación electrónica: Ilimitada</li>
            <li>Usuarios: 3</li>
            <li>Inventario empresarial: multi-bodega, multi-sucursal</li>
            <li>Pedidos multicanal: tienda, ecommerce, POS</li>
            <li>Ecommerce premium: pasarelas múltiples, dominio y diseño personalizado</li>
            <li>Analítica empresarial: reportes avanzados, exportación Excel/PDF</li>
            <li>Capacitación y soporte: onboarding completo, soporte Teléfono/WhatsApp/Email</li>
          </ul>
        </div>
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
