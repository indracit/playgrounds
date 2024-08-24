

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment,fetchUserById } from '../toolkit/counterSlice'

import './index.css'

const Redux = () => {
  const count = useSelector((state) => state.counter.value)
  const data = useSelector((state) =>  state.counter.servdata)
  const dispatch = useDispatch()
  console.log(data)


  return (
    <div>
      <h1>Redux playground</h1>
      <div className='counter'>
        <button className='redux-button'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button className='redux-button'
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      {data.map((val,index) => (
        <p key={index}>{val['message']}</p>
      ))}
      <button className='redux-button'
      onClick={() => dispatch(fetchUserById())}
      >dispatch async thunk</button>
    </div>
  )
}

export default Redux