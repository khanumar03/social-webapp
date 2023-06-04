import React from 'react'
import "./Style2.css"

const ComBox = (props) => {
  return (
    <div className='ComBox'>
       {"@" + props.name + " :- " + props.com}
    </div>
  )
}

export default ComBox