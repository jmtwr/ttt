import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Children } from '../types'

export const Portal: React.FC<Children> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)

    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}
