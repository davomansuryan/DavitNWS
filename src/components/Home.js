import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



const Home = () => {
    const Cats = useSelector((state) => state)
    const dispatch = useDispatch()
    useEffect(() => {
        let ignor = false
        const getCats = async () => {
            try {
                const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=1}`)
                if (res.status > 200 || res.status >= 300) {
                    throw new Error()
                }
                const data = await res.json()
                if (!ignor) {
                    dispatch({ type: "ADD_CATS", payload: data })
                }
            } catch (error) {
                console.error(error)
            }
        }
        getCats()
        return () => {
            ignor = true
        }
    })

    return (

        <ul className="catsimagelist">{Cats.map((e, i) => <li key={i}><img src={e.url} className="catsimg" width={"100px"} height={"100px"} alt={e.id} /></li>)}</ul>


    )
}

export default Home