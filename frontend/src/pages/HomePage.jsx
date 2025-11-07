import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const HomePage = () => {

  const{theme,setTheme}=useThemeStore();
  return (
    <div>
       <h1>Home</h1>
       <button onClick={()=>setTheme("night")}>Change the theme</button>
    </div>
  )
}

export default HomePage
