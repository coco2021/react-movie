
import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'


const Card =({title}) =>{

  const [count, setCount] = useState(0);

  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]);



  // // run only onece on the mounting of that component
  // useEffect( () =>{
  //   console.log('CARD RENDERED')
  // }, [])

  

  return (
    // <div className='card' onClick={()=> setCount( (prevState) => prevState + 1  )}>
    <div className='card' onClick={()=> setCount( count + 1)}>
  
      {/* //conditional rendering */}
      {/* <h2>{title} <br /> {count ? count : null}</h2> */}
      <h2>{title} <br /> {count || null}</h2>

      {/* <button onClick={()=> setHasLiked(!hasLiked)}> */}

      <button onClick={()=> setHasLiked( (prevState) => !prevState)}>
        {hasLiked ? "❤️" : '🤍'}
      </button>
    </div>
  )
}

const App = () =>{


  return (
    <div className='card-container'>
      <Card title='Star Wars' rating={5} isCool={true} />
      <Card title='Avatar'/>
      <Card title='The Lion King' />
    </div>
    
  )
}

export default App
