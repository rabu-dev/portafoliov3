'use client';


import { motion, AnimatePresence } from 'framer-motion';

export default function AnimacionProyectos() {
    
  const proyectos = ["Proyecto Alpha", "Proyecto Beta", "Proyecto Gamma"];

  const proyectoAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      },
    }),
};

  return (
    <>
    
      <AnimatePresence mode="wait">
              
                <motion.div
                  key="proyectos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  className="mt-10 flex flex-col gap-6"
                >
                  {proyectos.map((nombre, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={proyectoAnim}
                      initial="hidden"
                      animate="visible"
                      className="p-6 bg-white text-black rounded-xl shadow-lg max-w-md"
                    >
                      <h2 className="text-xl font-bold">{nombre}</h2>
                      <p className="text-sm mt-2">Descripción breve del proyecto {i + 1}.</p>
                    </motion.div>
                  ))}
      
                  <motion.button
                    onClick={() => {window.location.href = '/';}}
                    className="mt-8 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    Volver
                  </motion.button>
                </motion.div>
              
        </AnimatePresence>
    
    </>
  );
}
