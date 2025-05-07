'use client';
import { motion } from 'framer-motion';
// Eliminar AnimatePresence si no se usa
// import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || 'Hubo un error al enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen  p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-zinc-900 rounded-lg shadow-xl p-6"
      >
        <h1 className="text-3xl font-bold text-red-600 mb-6">Contact Me</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-red-500 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full  border border-red-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-red-500 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full  border border-red-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-red-500 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full  border border-red-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-900/20 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm text-center p-2 bg-green-900/20 rounded">
              ¡Mensaje enviado con éxito!
            </div>
          )}
          
          <button
            type="submit"
            disabled={sending}
            className={`w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300 ${
              sending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {sending ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
        
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="block mt-6 text-center text-red-500 hover:text-red-400 transition duration-300"
        >
          Volver al Inicio
        </motion.a>
      </motion.div>
    </div>
  );
}
