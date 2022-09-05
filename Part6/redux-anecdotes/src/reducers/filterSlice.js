import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
  name: 'filter',
  initialState:  'ALL',
  reducers: {
    filterText(state, action) {
      return state = action.payload
    }
  }

})

export const { filterText } = filterSlice.actions
export default filterSlice.reducer