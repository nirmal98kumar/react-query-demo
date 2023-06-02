import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {

  const onSuccess = () => {
    console.log("Success")
  }
  
  const onError = () => {
    console.log("Error")
  }

  const { isLoading, data, isError, error, isFetching  } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess:onSuccess,   // { onSuccess , onError } also works
      onError:onError
    },
  )

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map(hero => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}
