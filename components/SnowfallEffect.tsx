"use client"

import Snowfall from "react-snowfall"

export default function SnowfallEffect() {
  return (
    <Snowfall 
      snowflakeCount={300} 
      wind={[-1, 1]} 
      speed={[0.5, 2]} 
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} 
    />
  )
}