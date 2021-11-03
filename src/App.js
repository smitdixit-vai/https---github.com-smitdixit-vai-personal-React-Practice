import React from 'react'

class Developer {
  
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  getName() {
    return this.firstName + " " + this.lastName
  }

}

const useSemiPersistentState = (key, initialState) => {
  
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]

}

const App = () => {

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectId: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectId: 1
    }
  ]

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (

    <>
      <h2>React Practice</h2>
      <hr />

      <InputWithLabel
        id="search" 
        value={searchTerm} onInputChange={handleSearch}
        isFocused="true"
      >
        <strong>Search: </strong> 
      </InputWithLabel>
      
      <p>You typed: { searchTerm }</p>

      <List list={searchedStories}/>

    </>
  );
}

const InputWithLabel = ({id, type="text", value, onInputChange, isFocused, children}) => (
    <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input type={type} id={id} value={value} onChange={onInputChange} autoFocus={isFocused}></input>
    </>
)

const List = ({ list }) => (
  list.map(({objectId, ...item}) => <Item key={objectId} {...item}/>)
)

const Item = ({ key, url, title, num_comments, points, author }) => (
  <div key={key}>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
)


export default App