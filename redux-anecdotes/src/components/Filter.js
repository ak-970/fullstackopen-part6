import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    const content = event.target.value
    dispatch(filterChange(content))
  }

  return (
    <div style={style}>
      <label htmlFor='filter'>filter </label>
      <input name='filter' type='search' onChange={handleChange} />
    </div>
  )
}

export default Filter