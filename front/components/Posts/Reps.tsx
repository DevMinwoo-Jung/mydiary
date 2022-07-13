import React, { FC } from 'react'
import Rep from './Rep'
import shortid from 'shortid'

type RepsProps = {
  exercise: object;
}

export type exerciseType = {
  kind: string;
  reps: [Object];
}

const Reps:FC<RepsProps> = (props) => {
  const exercise:exerciseType = props.exercise;

  return (
    <>
      <div>{exercise.kind}</div>
      <div>
        {
          exercise.reps.map((element) => {
            return (
              <Rep key={shortid.generate()} rep={element}/>
            )
          })
        }
      </div>
    </>
  )
}

export default Reps