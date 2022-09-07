import React from 'react'
import { connect } from 'react-redux'
import { filterText }from '../reducers/filterSlice'

const Filter = ({ dispatch }) => {

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

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect(mapStateToProps)(Filter)
export default ConnectedFilter