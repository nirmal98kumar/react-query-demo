import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError
  })
}

const addSuperHero = hero => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()

  return useMutation(addSuperHero, {
    // onSuccess: data => {
      /** Query Invalidation*/
      // queryClient.invalidateQueries('super-heroes')

      /** Handling Mutation Response Start */
      /* queryClient.setQueryData('super-heroes', (oldQueryData) => {    //REPLACING old query data in cache
          return {
            ...oldQueryData,
            data: [...oldQueryData.data, data.data]
          }
        }) 
      },*/

    /**Optimistic Update */
    onMutate: async (newHero)  => {                          /* called before mutation function fires */
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', oldQueryData => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      })
      return { previousHeroData }
    },
    onError: (_err, _newTodo, context) => {                 /* called when mutation fails */   
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {                                      /* called when mutation either succeeds or fails */  
      queryClient.invalidateQueries('super-heroes')         // fetch data to keep client side data in sync with server data  
    }
  }
  )
}
