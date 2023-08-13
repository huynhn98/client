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
  const allCharacters = ['Character1', 'Character2', 'Character3', 'Character4', 'Character5', 'Character6', 'Character7', 'Character8', 'Character9','Character10',
                          'Character11', 'Character12', 'Character13', 'Character14', 'Character15', 'Character16', 'Character17', 'Character18', 'Character19','Character20',
                          'Character21', 'Character22', 'Character23', 'Character24', 'Character25', 'Character26', 'Character27', 'Character28', 'Character29']
  
  var teams = "No Teams Currently"

  useEffect(()=>{
    console.log("hi")
    if(localStorage.getItem("characters") === null || localStorage.getItem("characters") === "[]") {
      localStorage.setItem("characters", JSON.stringify(DEFAULT_CHARACTERS))
      
    }
      setAvailableCharacters(JSON.parse(localStorage.getItem("characters") || "[]"))
    

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
  teams = (
    <>
      <div className='team1 flex flex-wrap justify-center'>
        {team1.map((n)=> {
          return <img src={new URL(`/src/assets/Character${n}.webp`, import.meta.url).href}/>
        })}
      </div>
      <div className='team2 flex flex-wrap justify-center'>
        {team2.map((n)=> {
          return <img src={new URL(`/src/assets/Character${n}.webp`, import.meta.url).href}/>
        })}
      </div>
      </>
  )
  console.log("there")
  
  const characterList = allCharacters.map((char,i) => (
    
    <button key={i} className='' onClick={handleClick}>
      <div className=''>
       
        <img className={availableCharacters.includes(i+1) ? "icon bg-amber-400" : "icon"} src={new URL(`/src/assets/${char}.webp`, import.meta.url).href} id={i+1}/>
      </div>
    </button>))
  return (
    <>
    <div className='flex flex justify-center mt-3'>
      <a href='https://github.com/huynhn98/hsr-team-randomizer' target='_blank'>Github</a>
    </div>
  

<div className='flex flex-col'>
        <h1 className="text-4xl m-6 text-center">Honkai Star Rail Team Randomizer</h1>

      <div className='mb-6 flex flex-col  '>{teams}</div>
        

      
    <button className='mb-6 bg-lime-500 m-auto' onClick={generateTeams}>Generate Teams</button>
    </div>
    <div className='flex flex-wrap justify-center'>
      
      {characterList}
    </div>
    
    </>
  )
}

export default App
