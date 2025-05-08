'use client';


import { motion, AnimatePresence } from 'framer-motion';


export default function AnimacionProyectos() {
    
  const proyectos = [
    { 
      nombre: "Proyecto Alpha", 
      descripcion: "Sistema de IA avanzada.", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-alpha"
    },
    { 
      nombre: "Proyecto Beta", 
      descripcion: "Red social descentralizada.", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-beta"
    },
    { 
      nombre: "Proyecto Gamma", 
      descripcion: "RapidTikets Help", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-gamma"
    },
    { 
      nombre: "Proyecto Alpha", 
      descripcion: "Sistema de IA avanzada.", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-alpha"
    },
    { 
      nombre: "Proyecto Beta", 
      descripcion: "Red social descentralizada.", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-beta"
    },
    { 
      nombre: "Proyecto Gamma", 
      descripcion: "RapidTikets Help", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-gamma"
    },
    ,
    { 
      nombre: "Proyecto Beta", 
      descripcion: "Red social descentralizada.", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-beta"
    },
    { 
      nombre: "Proyecto Gamma", 
      descripcion: "RapidTikets Help", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-gamma"
    }
    ,
    { 
      nombre: "Proyecto Gamma", 
      descripcion: "RapidTikets Help", 
      estado: "pendiente",
      github: "https://github.com/tu_usuario/proyecto-gamma"
    }
  ];

  const proyectoAnim = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.18,
        duration: 0.9,
        ease: [0.43, 0.13, 0.23, 0.96]
      },
    }),
  };

  const estadoStyles = {
    pendiente: {
      color: "bg-red-500/80 text-red-100",
      icon: <span className="inline mr-1" role="img" aria-label="pendiente">⏳</span>
    },
    terminado: {
      color: "bg-black/80 text-red-400 border border-red-400",
      icon: <span className="inline mr-1" role="img" aria-label="terminado">✅</span>
    },
    eliminado: {
      color: "bg-red-900/80 text-red-200",
      icon: <span className="inline mr-1" role="img" aria-label="eliminado">🗑️</span>
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        <div className="flex-grow">
          <motion.div
            key="proyectos"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ 
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
          >
            {proyectos.map((proy, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={proyectoAnim}
                initial="hidden"
                animate="visible"
                className="p-6 bg-gradient-to-br from-black via-red-900 to-red-700 text-white rounded-2xl shadow-2xl w-full max-w-sm border border-red-900 hover:shadow-neon transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-extrabold tracking-wide neon-text">{proy.nombre}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${estadoStyles[proy.estado].color}`}>
                    {estadoStyles[proy.estado].icon}
                    {proy.estado.charAt(0).toUpperCase() + proy.estado.slice(1)}
                  </span>
                </div>
                <p className="text-base opacity-80">{proy.descripcion}</p>
                {proy.github && (
                  <a
                    href={proy.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-5 py-2 bg-black text-red-400 border border-red-700 rounded-xl font-semibold shadow-lg hover:bg-red-900 hover:text-white transition-all neon-border text-center"
                    style={{ textDecoration: 'none' }}
                  >
                    Ver en GitHub
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-16 mb-8 flex justify-center">
          <motion.button
            onClick={() => {window.location.href = '/';}}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg neon-border"
            whileHover={{ scale: 1.07, boxShadow: '0 0 16px #ff003c' }}
            transition={{ duration: 0.3 }}
          >
            Volver
          </motion.button>
        </div>
      </AnimatePresence>
      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 8px #ff003c, 0 0 2px #fff;
        }
        .neon-border {
          box-shadow: 0 0 8px #ff003c, 0 0 2px #fff;
        }
        .hover\\:shadow-neon:hover {
          box-shadow: 0 0 24px #ff003c, 0 0 8px #fff;
        }
      `}</style>
    </div>
  );
}
