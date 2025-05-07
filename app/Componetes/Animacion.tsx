'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './fondo/Background';


  


export default function HeroWithProyectos() {
  const [mostrarProyectos, setMostrarProyectos] = useState(false);
  const nombre = "Rabudev";
  
    const letrasAnim = {
        hidden: { opacity: 0, y: 5 },
        visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { 
            delay: i * 0.08,
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
        },
        }),
    };


  return (
    <section className="min-h-screen flex flex-col items-center justify-center  text-white px-4 text-center">
      <AnimatePresence mode="wait">
        
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ 
              duration: 1.0,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold tracking-widest text-red-600 drop-shadow-lg flex flex-wrap justify-center"
            >
              {nombre.split("").map((letra, i) => (
                <motion.span key={i} custom={i} variants={letrasAnim} initial="hidden" animate="visible">
                  {letra}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 text-xl md:text-2xl text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5,
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              Desarrollador web creativo y apasionado por la tecnología
            </motion.p>
          <motion.div
                className="mt-8 flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
             <motion.button
              onClick={() => window.location.href = "/proyectos"}
              className="mt-8 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Ver proyectos
            </motion.button>
            <motion.button
              onClick={() => window.location.href = "/Contactarme"}
              className="mt-8 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Contactarme
            </motion.button>
            <motion.button
              onClick={() => window.location.href = "/RedeSociales"}
              className="mt-8 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Ver Redes Sociales
            </motion.button>
          </motion.div>
                
                <motion.div
                  className="mt-12 w-full max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>React</span>
                        <span>90%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-red-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "90%" }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>TypeScript</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-red-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.9 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Node.js</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-red-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "80%" }}
                          transition={{ duration: 1, delay: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Pnpm</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-red-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 1, delay: 1.1 }}
                        />
                      </div>
                    </div>
                  </div>
                  
                </motion.div>
            
          </motion.div>
        
      </AnimatePresence>
      {/* Eliminar esta línea: */}
      {/* <Background /> */}
      
    </section>
  );
}