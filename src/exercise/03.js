// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
const ToggleContext = React.createContext()
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return <ToggleContext.Provider value={{on, toggle}}>{children}</ToggleContext.Provider>
  // return React.Children.map(children, child => {
  //   return typeof child.type === 'string'
  //     ? child
  //     : React.cloneElement(child, {on, toggle})
  // })
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = useContext(ToggleContext)`
// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext

const useToggle = () => {
  return React.useContext(ToggleContext)
}

// function ToggleOn({on, children}) {
//   return on ? children : null
// }

function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
// function ToggleOff({on, children}) {
//   return on ? null : children
// }

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
// function ToggleButton({on, toggle, ...props}) {
//   return <Switch on={on} onClick={toggle} {...props} />
// }

function ToggleButton({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

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

export default App

/*
eslint
  no-unused-vars: "off",
*/
