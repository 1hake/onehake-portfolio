import 'tailwindcss/tailwind.css'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import backBIG from '../images/howl/back.png'
import frontBig from '../images/howl/front.png'
import middleBIG from '../images/howl/middle.png'

interface LayerProps {
  speed: number
  image: string
  zIndex: number
  reverse?: boolean
}

const Layer: React.FC<LayerProps> = ({ speed, image, zIndex, reverse = false }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, reverse ? 500 * speed : -500 * speed])

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

const BackgroundLayer: React.FC<{ speed: number }> = ({ speed }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500 * speed])

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

const HowlMoving: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="w-full h-[300vh] overflow-hidden bg-black relative">
      <Layer speed={2} image={backBIG} zIndex={2} />
      <Layer speed={5} image={middleBIG} zIndex={5} />
      <LayerFront speed={8} image={frontBig} zIndex={7} />

      <div className="absolute inset-0 grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 z-[4] h-screen">
        <div className="col-start-2  row-start-1 flex items-end md:items-center  justify-center">
          <motion.div
            className="p-14 font-bold text-white text-8xl md:text-9xl "
            style={{ translateY: useTransform(useScroll().scrollYProgress, [0, 1], [0, 200]) }}
          >
            COLIN
          </motion.div>
        </div>
        <div className="mt-40 col-start-2 row-start-1 flex items-end md:items-center  justify-center">
          <motion.div
            className="md:p-14 font-bold text-white text-4xl "
            style={{ translateY: useTransform(useScroll().scrollYProgress, [0, 1], [0, 400]) }}
          >
            CHAMPDAVOINE
          </motion.div>
        </div>
      </div>
      <BackgroundLayer speed={0.1} />
    </div>
  )
}

export default HowlMoving
