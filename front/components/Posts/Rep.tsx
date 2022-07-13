import React, { FC } from 'react'

type RepProps = {
  rep: {}
}

const Rep:FC<RepProps> = (props) => {
  const rep = props.rep
  console.log(rep)
  return (
    <div>
      {Object.keys(rep)} / {Object.values(rep)}
    </div>
  )
}

export default Rep