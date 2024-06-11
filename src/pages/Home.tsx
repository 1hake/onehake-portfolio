import 'tailwindcss/tailwind.css'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import backBIG from '../images/backBIG.png'
import flyingBIG from '../images/flyingBIG.png'
import frontBig from '../images/frontBIG.png'
import middleBIG from '../images/middleBIG.png'

interface LayerProps {
  speed: number
  image: string
  zIndex: number
}

const Layer: React.FC<LayerProps> = ({ speed, image, zIndex }) => {
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

const LayerFront: React.FC<LayerProps> = ({ speed, image, zIndex }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500 * speed])

  return (
    <motion.div
      className="absolute inset-0 h-[200vh] bg-cover bg-center shadow-xl"
      style={{
        y,
        backgroundImage: `url(${image})`,
        zIndex
      }}
    />
  )
}

const BackgroundLayer: React.FC<{ speed: number }> = ({ speed, reverse }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, reverse ? 500 : -500 * speed])

  return (
    <motion.div
      className="inset-0 bg-cover bg-center"
      style={{
        y,
        backgroundColor: 'black',
        zIndex: 5
      }}
    />
  )
}

const Home: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="w-full h-[300vh] overflow-hidden bg-black">
      <Layer speed={2} image={backBIG} zIndex={2} />
      <Layer speed={3} image={middleBIG} zIndex={5} />
      <Layer reverse speed={5} image={flyingBIG} zIndex={6} />
      <LayerFront speed={8} image={frontBig} zIndex={7} />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="p-20 mt-[30rem] lg:mb-[9rem] flex items-start lg:items-start justify-end absolute font-bold text-white lg:text-9xl text-8xl z-[4] lg:z-[4] h-screen w-full"
          style={{ translateY: useTransform(useScroll().scrollYProgress, [0, 1], [0, 200]) }}
        >
          COLIN
        </motion.div>
        <motion.div
          className="p-20 mb-[3rem] lg:mt-[40rem] flex items-center lg:items-start justify-end font-bold text-white text-4xl z-[4] lg:z-[4] h-screen w-full"
          style={{ translateY: useTransform(useScroll().scrollYProgress, [0, 1], [0, 400]) }}
        >
          CHAMPDAVOINE
        </motion.div>
      </div>
      <BackgroundLayer speed={0.1} />
    </div>
  )
}

export default Home
