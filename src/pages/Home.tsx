import 'tailwindcss/tailwind.css'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import back from '../images/back.png'
import front from '../images/front.png'
import middle from '../images/middle.png'

const Layer: React.FC<{ speed: number; image: string; zIndex: number }> = ({ speed, image, zIndex }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500 * speed])

  return (
    <motion.div
      className="absolute inset-0 h-screen bg-cover bg-center"
      style={{
        y,
        backgroundImage: `url(${image})`,
        zIndex
      }}
    />
  )
}

const Layerfront: React.FC<{ speed: number; image: string; zIndex: number }> = ({ speed, image, zIndex }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500 * speed])

  return (
    <motion.div
      className="absolute inset-0 h-[200vh] bg-cover bg-center"
      style={{
        y,
        backgroundImage: `url(${image})`,
        zIndex
      }}
    />
  )
}

const BackgroundLayer: React.FC<{ speed: number }> = ({ speed }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500 * speed])

  return (
    <motion.div
      className=" inset-0 bg-cover bg-center"
      style={{
        y,
        backgroundColor: 'black',
        zIndex: 5
      }}
    />
  )
}

export function Home() {
  const ref = useRef(null)

  return (
    <div ref={ref} className="w-full h-[300vh]  overflow-hidden bg-black">
      <Layer speed={0.2} image={back} zIndex={2} />
      {/* <Layer speed={0.8} image={back2} zIndex={3} /> */}
      <Layer speed={3} image={middle} zIndex={5} />
      <Layer speed={6} image={front} zIndex={20} />
      {/* <Layerfront speed={3} image={front} zIndex={5} /> */}

      <div className="absolute inset-0  flex items-center justify-center">
        <motion.div
          className="flex items-center justify-center absolute font-bold text-white text-7xl md:text-9xl z-10 h-screen w-full"
          style={{ translateY: useTransform(useScroll().scrollYProgress, [0, 1], [0, 200]) }}
        >
          ONEHAKE
        </motion.div>
      </div>
      <BackgroundLayer speed={0.1} />
    </div>
  )
}

export default Home
