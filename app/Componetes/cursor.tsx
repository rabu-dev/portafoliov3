'use client'

import { useEffect, useRef } from 'react'

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: -100, y: -100 })
  const currentPositionRef = useRef({ x: -100, y: -100 })
  const isMoving = useRef(false)
  const mouseDownRef = useRef(false)

  useEffect(() => {
    document.body.style.cursor = 'none'
    
    const style = document.createElement('style')
    style.textContent = `
      a, button, textarea, input, label, [role="button"] {
        cursor: none !important;
      }
      label {
        cursor: none !important;
        user-select: none;
      }
      .cursor-hover-button {
        transform: translate3d(var(--x), var(--y), 0) scale(1.2) !important;
        background-color: rgba(220, 38, 38, 0.5) !important;
      }
      .cursor-hover-button.clicked {
        transform: translate3d(var(--x), var(--y), 0) scale(0.9) !important;
        transition: transform 0.1s ease-out !important;
      }
      .cursor-hover-input {
        transform: translate3d(var(--x), var(--y), 0) !important;
        width: 2px !important;
        height: 20px !important;
        border-radius: 0 !important;
        background-color: rgb(220, 38, 38) !important;
      }
      .cursor-outer-hover {
        transform: translate3d(var(--x), var(--y), 0) scale(1.4) !important;
        opacity: 0.3 !important;
      }
    `
    document.head.appendChild(style)
    
    const cursor = cursorRef.current
    const cursorOuter = cursorOuterRef.current
    if (!cursor || !cursorOuter) return

    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursorPosition = () => {
      if (!isMoving.current) return

      const { x: targetX, y: targetY } = positionRef.current
      const { x: currentX, y: currentY } = currentPositionRef.current

      const newX = lerp(currentX, targetX, 0.15)
      const newY = lerp(currentY, targetY, 0.15)

      currentPositionRef.current = { x: newX, y: newY }
      
      // Actualizar variables CSS personalizadas
      cursor.style.setProperty('--x', `${newX}px`)
      cursor.style.setProperty('--y', `${newY}px`)
      cursorOuter.style.setProperty('--x', `${newX - 5}px`)
      cursorOuter.style.setProperty('--y', `${newY - 5}px`)
      
      cursor.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
      cursorOuter.style.transform = `translate3d(${newX - 5}px, ${newY - 5}px, 0)`
      
      animationFrameId = requestAnimationFrame(updateCursorPosition)
    }

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { 
        x: e.clientX - cursor.offsetWidth / 2, 
        y: e.clientY - cursor.offsetHeight / 2 
      }
      
      if (!isMoving.current) {
        isMoving.current = true
        currentPositionRef.current = positionRef.current
        updateCursorPosition()
      }
    }

    const handleMouseDown = () => {
      mouseDownRef.current = true
      if (cursor.classList.contains('cursor-hover-button')) {
        cursor.classList.add('clicked')
        cursorOuter.classList.add('cursor-outer-hover')
      }
    }

    const handleMouseUp = () => {
      mouseDownRef.current = false
      cursor.classList.remove('clicked')
      cursorOuter.classList.remove('cursor-outer-hover')
    }

    const handleMouseEnter = (e: Event) => {
      const element = e.target as HTMLElement
      if (element.tagName.toLowerCase() === 'button' || element.getAttribute('role') === 'button') {
        cursor.classList.add('cursor-hover-button')
        cursorOuter.classList.add('cursor-outer-hover')
        if (mouseDownRef.current) {
          cursor.classList.add('clicked')
        }
      } else if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
        cursor.classList.add('cursor-hover-input')
      }
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('cursor-hover-button', 'cursor-hover-input', 'clicked')
      cursorOuter.classList.remove('cursor-outer-hover')
    }

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, label, [role="button"]')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.body.style.cursor = 'auto'
      document.head.removeChild(style)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(animationFrameId)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorOuterRef}
        className="w-7 h-7 bg-red-500 rounded-full fixed pointer-events-none z-[9998] opacity-20 will-change-transform transition-all duration-300 ease-out"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
      <div
        ref={cursorRef}
        className="w-3 h-3 bg-red-500 rounded-full fixed pointer-events-none z-[9999] will-change-transform transition-all duration-200 ease-out"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </>
  )
}

export default Cursor
