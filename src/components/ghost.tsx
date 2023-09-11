
import Styles from './ghost.module.css'

interface Porps{
  color : string,
}


export const Ghost = ({color}:Porps) => {
  return (
    <div>
      <img src={`src/Ghosts/${color}.png`} alt="" className={Styles[`ghost`]}/>
    </div>
  )
}
