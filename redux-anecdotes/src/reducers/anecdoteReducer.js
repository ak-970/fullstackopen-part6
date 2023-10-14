import anecdoteService from '../services/anecdotes'

import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const newAnecdote = action.payload.newAnecdote
      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    }
  },
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = id => {
  return async (dispatch, getState) => {
    const anecdoteToUpvote = getState().anecdotes.find(a => a.id === id)
    const upvotedAnecdote = { ...anecdoteToUpvote, votes : anecdoteToUpvote.votes + 1 }
    const newAnecdote = await anecdoteService.update(id, upvotedAnecdote)
    dispatch(updateAnecdote({ id, newAnecdote }))
  }
}

export default anecdoteSlice.reducer