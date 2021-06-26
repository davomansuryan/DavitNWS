import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const CatList = () => {
    const [page, setPage] = useState(1)
    const { id } = useParams()
    const Cats = useSelector((state) => state)
    const dispatch = useDispatch()
    useEffect(() => {
        let ignor = false
        const getCats = async () => {
            try {
                const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${id}`)
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
    }, [id, dispatch])

    const addCats = async () => {
        try {
            const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page + 1}&category_ids=${id}`)
            if (res.status > 200 || res.status >= 300) {
                throw new Error()
            }
            const data = await res.json()
            setPage((prevState) => prevState + 1)
            dispatch({ type: "MORE_CAT_IMAGES", payload: data })
        } catch (error) {
            console.error(error)
        }

    }
    return (
    <>
        
        <div className="imagescontainer">
            <ul className="catsimagelist">{Cats.map((e, i) => <li key={i}><img src={e.url} className="catsimg" width={"100px"} height={"100px"} alt={e.id} /></li>)}</ul> 
            <button onClick={addCats} className="addimages">MORE CAT IMAGES</button>
        </div>
    </>)
}
export default CatList