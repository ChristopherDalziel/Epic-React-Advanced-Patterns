// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'
import { Switch } from '../switch'

const ToggleContext = React.createContext()

function Toggle({ onToggle, children }) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{ on, toggle }}>{children}</ToggleContext.Provider>
  // return React.Children.map(children, child => {
  //   return typeof child.type === 'string'
  //     ? child
  //     : React.cloneElement(child, {on, toggle})
  // })
}

const useToggle = () => {
  const context = React.useContext(ToggleContext)
  if (!context) {
    // Displays uncaught error in console
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

// function ToggleOn({on, children}) {
//   return on ? children : null
// }

function ToggleOn({ children }) {
  const { on } = useToggle()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
// function ToggleOff({on, children}) {
//   return on ? null : children
// }

function ToggleOff({ children }) {
  const { on } = useToggle()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
// function ToggleButton({on, toggle, ...props}) {
//   return <Switch on={on} onClick={toggle} {...props} />
// }

function ToggleButton({ ...props }) {
  const { on, toggle } = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

// Functioning component
function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

// Erroring component
// const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
