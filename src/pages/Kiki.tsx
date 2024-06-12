import 'tailwindcss/tailwind.css'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import first from '../images/kiki/1.png'
import two from '../images/kiki/2.png'
import three from '../images/kiki/3.png'
import four from '../images/kiki/4.png'
import five from '../images/kiki/5.png'
import backBIG from '../images/kiki/back.png'

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
      className="absolute inset-0 h-[100dvh] bg-cover bg-center"
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

const Kiki: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="w-full h-[150dvh] overflow-hidden bg-black relative">
      <Layer speed={1} image={backBIG} zIndex={2} />
      <Layer speed={6} image={five} zIndex={4} />
      <Layer speed={7} image={four} zIndex={4} />
      <Layer speed={6} image={two} zIndex={5} />
      <Layer speed={8} image={three} zIndex={4} />
      <Layer speed={10} image={first} zIndex={7} />
      {/* <Layer speed={5} image={middleBIG} zIndex={5} /> */}
      {/* <LayerFront speed={8} image={frontBig} zIndex={7} /> */}

      <div className="absolute  grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 z-[4] ">
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
      {/* <BackgroundLayer speed={0.1} /> */}
    </div>
  )
}

export default Kiki
