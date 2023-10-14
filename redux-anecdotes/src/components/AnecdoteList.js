import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setMessage, setType, reset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => 
    anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => b.votes - a.votes)
  )

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
    dispatch(setMessage(`You voted '${ anecdotes.find(a => a.id === id).content }'.`))
    dispatch(setType('success'))
    window.setTimeout(function() {
      dispatch(reset())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}&nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
  
}

export default AnecdoteList