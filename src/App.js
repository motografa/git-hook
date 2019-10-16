import React, {useState, useEffect} from 'react';

// useEffect substitui o componentDidMount, componentDidUpdate e componentWillUnmount

// Com hooks a gente praticamente para de usar classes
// passa a exportar função
export default function App(){

const [repositories, setrepositories] = useState([])

  useEffect(async() => {
    const response = await fetch(
      'http://api.github.com/users/motografa/repos')
      const data = await response.json();

      setrepositories(data);
  }, []) //useEffect só vai executar se a variavel dentro do [] mudar. Array vazio não executa mais de uma vez.

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories]); //Dispara toda vez que repositories mudar


function handleFavorite(id){
  const newRepositories = repositories.map(repo =>{
    return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
  })

  setrepositories(newRepositories);
}

  return (
      <ul>{repositories.map(repo =>(
        <li key={repo.id}>
        {repo.name}
        {repo.favorite && <span style={{color: 'red', padding:'0 0 0 5px'}}> Favorito </span>}
        <button onClick={() => handleFavorite(repo.id)} >Favoritar</button>
        </li>
      ))}</ul>
  );
}
