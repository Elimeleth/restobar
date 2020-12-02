import React from "react"
import ContentLoader from "react-content-loader"

export const OccupiedTableLoader = (props) => (
  <ContentLoader 
    speed={2}
    viewBox="0 0 400 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ width: '100%' }}
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width='400' height="160" /> 
    
  </ContentLoader>
)

export const FreeTableLoader = (props) => (
    <ContentLoader 
      speed={2}
      width={350}
      height={100}
      viewBox="0 0 400 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="390" height="100" /> 
      
    </ContentLoader>
  )
  

 