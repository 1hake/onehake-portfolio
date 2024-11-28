import Crypto from '../pages/Crypto'
import Home from '../pages/Home'
import HowlMoving from '../pages/HowlMoving'
import Kiki from '../pages/Kiki'

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
  },
  {
    name: 'home',
    path: '/kiki',
    component: <Kiki />,
    hasFooter: true
  },
  {
    name: 'crypto',
    path: 'crypto',
    component: <Crypto />
  }
]
