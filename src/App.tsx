import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Card from "./components/Card/Card.tsx";
import {FcAdvertising} from 'react-icons/fc';

function App() {
  // const [count, setCount] = useState(0)
    const icon = FcAdvertising;

  return (
    <>

        <Card id={1} icon={icon} />
    </>
  )
}

export default App
