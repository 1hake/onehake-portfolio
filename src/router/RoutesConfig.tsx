import React from 'react'

import Home from '../pages/Home'
import HowlMoving from '../pages/HowlMoving'

interface Route {
  name: string
  path: string
  component: JSX.Element
  isAnonymous?: boolean
  isProtected?: boolean
  hasFooter?: boolean
}

export const routesConfig: Route[] = [
  {
    name: 'home',
    path: '/',
    component: <Home />,
    hasFooter: true
  },
  {
    name: 'home',
    path: '/howl',
    component: <HowlMoving />,
    hasFooter: true
  }
]
