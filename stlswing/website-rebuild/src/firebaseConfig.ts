import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const devConfig = {
  apiKey: 'AIzaSyBxz3kCWoDr0hRoRvrTr9v6jJpq9TKK9PE',
  authDomain: 'stlswingdev.firebaseapp.com',
  projectId: 'stlswingdev',
  storageBucket: 'stlswingdev.appspot.com',
  messagingSenderId: '1035348409584',
  appId: '1:1035348409584:web:6a1fea7ec6c0c22fe49635',
  measurementId: 'G-2HSLWSXR2V'
}

const prodConfig = {
  apiKey: 'AIzaSyBPUAoSuOdLRfg7LR1Oey-MQFFHj6ExGgU',
  authDomain: 'stl-swing-dance.firebaseapp.com',
  projectId: 'stl-swing-dance',
  storageBucket: 'stl-swing-dance.appspot.com',
  messagingSenderId: '683859120154',
  appId: '1:683859120154:web:354883694379ca7b5801a3',
  measurementId: 'G-MC5XJDYGJ5'
}

// const config = devConfig

export const firebaseApp = initializeApp(devConfig)
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
export const analytics = getAnalytics(firebaseApp)
export const performance = getPerformance(firebaseApp)
