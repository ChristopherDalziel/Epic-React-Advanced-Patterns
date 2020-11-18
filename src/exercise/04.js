// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import { Switch } from '../switch'

// *call all functions, function* - cleaner solution, allows you to call any number of functions with any number of arguments
function callAllFunctions(...fns) {
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // return {
  //   on, toggle, togglerProps: {
  //     'aria-pressed': on, onClick: toggle
  //   }
  // }

  // *extension*
  // function getTogglerProps({ onClick, ...props }) {
  //   return {
  //     'aria-pressed': on,
  //     onClick: () => {
  //       onClick && onClick()
  //       toggle()
  //     },
  //     ...props
  //   }
  // }

  // *callallfunctions* - onClick we call ALL our functions, and our callAllFunctions function, decides if it's just a standard onClick with one function or multiple. in our situation allowing our onClick console.log return as well as our toggle function.
  function getTogglerProps({ onClick, ...props }) {
    return {
      'aria-pressed': on,
      onClick: callAllFunctions(onClick, toggle),
      ...props,
    }
  }

  return {
    on, toggle, getTogglerProps
  }
}

// function App() {
//   const { on, togglerProps } = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button
//         aria-label="custom-button"
//         {...togglerProps}
//         onClick={() => console.info('onButtonClick')}
//       >
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// *extension*
function App() {
  const { on, getTogglerProps } = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
