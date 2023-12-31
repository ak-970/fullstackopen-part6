import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message : '',
  type : ''
}

const notificationSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    setType(state, action) {
      state.type = action.payload
    },
    reset(state, action) {
      return initialState
    }
  },
})

export const { setMessage, setType, reset } = notificationSlice.actions

export const setNotification = (message, seconds, type = '') => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    dispatch(setType(type))
    window.setTimeout(function() {
      dispatch(reset())
    }, seconds * 1000)    
  }
}

export default notificationSlice.reducer