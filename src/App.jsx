import { useState, useEffect } from 'react'

const TOTAL_CHARACTERS = 29
const DEFAULT_CHARACTERS = [2, 7, 9, 16, 17, 19, 22, 24, 29]

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

function App() {
  const [availableCharacters, setAvailableCharacters] = useState([])
  const [team1, setTeam1] = useState([])
  const [team2, setTeam2] = useState([])
  const allCharacters = Array(TOTAL_CHARACTERS).fill().map((c, i) => 'Character' + (i+1) + '.webp')
  
  var teams = "No Teams Currently"

  useEffect(()=>{
    if(localStorage.getItem("characters") === null) {
      localStorage.setItem("characters", JSON.stringify(DEFAULT_CHARACTERS))
      
    }
    else {
      setAvailableCharacters(JSON.parse(localStorage.getItem("characters") || "[]"))
    }
  },[])

  const handleClick = (e) => {
    e.preventDefault()

    if(e.target.className.includes("bg-amber-400")) {
      const n = availableCharacters
      const remove = n.indexOf(parseInt(e.target.id))
      n.splice(remove, 1)
      localStorage.setItem("characters", JSON.stringify(n))
      setAvailableCharacters(JSON.parse(localStorage.getItem("characters") || "[]"))
      e.target.className = "icon"
    }
    else {
      e.target.className += "bg-amber-400"
      const n = availableCharacters
      n.push(parseInt(e.target.id))
      localStorage.setItem("characters", JSON.stringify(n))
      setAvailableCharacters(JSON.parse(localStorage.getItem("characters") || "[]"))
    }

  }

  const generateTeams = () => {
    const n = JSON.parse(JSON.stringify(availableCharacters))
    shuffle(n)

    let team1 = Array(4)
    let team2 = Array(4)
    const totalLength = availableCharacters.length < 8 ? availableCharacters.length : 8
    const team1Length = Math.round(totalLength/2)
    const team2Length = totalLength - team1Length

    for(let i = 0; i < team1Length; i++) {
      team1[i] = n.pop(i)
    }

    for(let i = 0; i < team2Length; i++) {
      team2[i] = n.pop(i)
    }
    
    setTeam1(team1)
    setTeam2(team2)
    
  }
  console.log(team1, team2)
  teams = (
    <>
      <div className='team1 flex flex-wrap'>
        {team1.map((n)=> {
          return <img src={`src/assets/Character`+n+`.webp`}/>
        })}
      </div>
      <div className='team2 flex flex-wrap'>
        {team2.map((n)=> {
          return <img src={`src/assets/Character`+n+`.webp`}/>
        })}
      </div>
      </>
  )
  const characterButtons = allCharacters.map((char,i) => (
    <button key={i} className='' onClick={handleClick}>
      <div className=''>
       
        <img className={availableCharacters.includes(i+1) ? "icon bg-amber-400" : "icon"} src={`src/assets/`+char} id={i+1}/>
      </div>
    </button>
  ))
  return (
    <>
    <div className='flex flex justify-center mt-3'>
      <a href='https://www.google.com' target='_blank'>Github</a>
    </div>
  

<div className='flex flex-col'>
        <h1 className="text-4xl m-6 text-center">Honkai Star Rail Team Randomizer</h1>

      <div className='mb-6 flex justify-around'>{teams}</div>
        

      
    <button className='mb-6 bg-lime-500 m-auto' onClick={generateTeams}>Generate Teams</button>
    </div>
    <div className='flex flex-wrap justify-center'>
      
      {characterButtons}
    </div>
    
    </>
  )
}

export default App
