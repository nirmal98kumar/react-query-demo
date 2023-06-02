import { useQuery } from "react-query"
import axios from "axios"


const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    return useQuery(
        ['super-hero', heroId],         //to maintain seperate query for each hero
        () => fetchSuperHero(heroId)    //fetcher function
    )

}