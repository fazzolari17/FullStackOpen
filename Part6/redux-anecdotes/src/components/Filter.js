import React from 'react'
import { useDispatch } from 'react-redux'
import { filterText }from '../reducers/filterSlice'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = e => {
    const filter = e.target.value.toLowerCase()

    filter.length > 0
      ? dispatch(filterText(filter))
      : dispatch(filterText('ALL'))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter