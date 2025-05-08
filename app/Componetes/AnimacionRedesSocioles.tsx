'use client';
import { motion, AnimatePresence } from "framer-motion";



export default function AnimacionRedeSociales() {
    const nombre1 = "Redes Sociales";
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
    <>
     <section className="min-h-screen flex flex-col items-center justify-center  text-white px-4 text-center">

     <AnimatePresence mode="wait">
        <motion.div
          key="redes"
          initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
                
            }}
            className="flex flex-col items-center justify-center gap-6"
        >
                  <motion.h1 
            className=" text-6xl md:text-8xl font-extrabold tracking-widest text-red-600 drop-shadow-lg flex flex-wrap justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {nombre1.split("").map((letra, i) => (
                <motion.span key={i} custom={i} variants={letrasAnim} initial="hidden" animate="visible">
                  {letra}
                </motion.span>
              ))}
        </motion.h1>
        <motion.p 
            className="mt-6 text-xl md:text-2xl text-white/80"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            ¡Conéctate conmigo!
        </motion.p>
        <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {[
                { href: "https://www.linkedin.com/in/rabudev", src: "/vercel.svg", alt: "LinkedIn" },
                { href: "https://github.com/rabu-dev", src: "/vercel.svg", alt: "GitHub" }
            ].map((social, index) => (
                <motion.a
                    key={social.alt}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.6 + index * 0.2
                    }}
                    whileHover={{ 
                        scale: 1.2,
                        rotate: 15,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={social.src} alt={social.alt} className="w-12 h-12" />
                </motion.a>
            ))}
        </motion.div>
            <motion.button
                onClick={() => {window.location.href = '/';}}
                className="mt-8 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                Volver al Inicio
            </motion.button>
        </motion.div>
    </AnimatePresence>
     </section>
    
      
    
    </>
  );
}
