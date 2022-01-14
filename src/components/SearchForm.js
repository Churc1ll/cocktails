import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  const searchValue = React.useRef('');
  const SearchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  }
  React.useEffect(() => {
    searchValue.current.focus();
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <section className='section search'>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search</label>
          <input type="text" name='id' ref={searchValue} onChange={SearchCocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
