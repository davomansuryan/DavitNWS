import React, { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from "./components/Home"
import CatList from "./components/CatList"

const App = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    let ignor = false
    const getCategories = async () => {
      try {
        const res = await fetch("https://api.thecatapi.com/v1/categories")
        if (res.status > 200 || res.status >= 300) {
          throw new Error()
        }
        const data = await res.json()
        if (!ignor) {
          setCategories(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getCategories()
    return () => {
      ignor = true
    }
  }, [])
  // return <Router>
  //   <div className="allcontainer">
  //     <ul className="catslist">{
  //       categories.map(e => <li key={e.id}>  <Link className="categorieslink" to={{ pathname: `/cats/${e.name}`, categorieId: e.id }} >{e.name}</Link></li>)
  //     }
  //     </ul>
  //     <Switch>
  //       <Route exact path="/" component={Home} />
  //       <Route path="/cats/:categorie" component={CatList} />
  //     </Switch>
  //   </div >
  // </Router >
  return ( <Router> 
    <div className="allcontainer"> 
      <ul className="catslist">{ 
        categories.map(e => <li key={e.id}>  <Link className="categorieslink" to={`/cats/${e.name}/${e.id}`} >{e.name}</Link></li>) 
      } 
      </ul> 
 
      <Switch> 
        <Route exact path="/" component={Home} /> 
        <Route path="/cats/:categorie/:id" component={CatList} /> 
      </Switch> 
    </div > 
  </Router > 
  )
}

export default App