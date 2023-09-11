
import {BiSolidCircleThreeQuarter} from 'react-icons/bi'
import {BsFillCircleFill} from 'react-icons/bs'

import Styles from './pac.module.css'
import { useEffect, useState } from 'react';

interface Props{
    direction : string;
}

const Pac = ({direction}:Props) => {
  const [change,setChange] = useState(false);
  useEffect(()=>{
    let inter = setInterval(()=>{
      setChange(!change)
    },30)
    return () => clearInterval(inter)
  },[direction])

  return (
    <div className={Styles[direction]}>
    {
      change ?   <BiSolidCircleThreeQuarter size={32} color='orange'></BiSolidCircleThreeQuarter> : 
      <BsFillCircleFill size={26} color='orange'></BsFillCircleFill>
    }
    </div>
  )
}


export default Pac