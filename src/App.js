import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import SearchCountry from "./components/SearchCountry"
import FilterRegion from "./components/FilterRegion"
import Country from "./components/Country"
import CountryList from "./components/CountryList"
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className=" m-auto justify-center">
      <div class="flex justify-center gap-10 text-center p-4">
        <div class="pt-10">
          <Link to="/">
            <button class="bg-indigo-800 hover:bg-white text-white hover:text-indigo-800  font-bold py-2 px-4 rounded">
              Countries App
            </button>
          </Link>
        </div>
        <div class="pt-10">
          <Link to="/filter-region">
            <button class="bg-indigo-800 hover:bg-white text-white hover:text-indigo-800 font-bold py-2 px-4 rounded">
              FilterRegion
            </button>
          </Link>
        </div>
        <div class="pt-10">
          <Link to="/search-country">
            <button class="bg-indigo-800 hover:bg-white text-white hover:text-indigo-800 font-bold py-2 px-4 rounded">
              SearchCountry
            </button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<CountryList countries={countries} />} />
        <Route path="/country/:countryName" element={<Country />} />
        <Route path="/search-country" element={<SearchCountry />} />
        <Route path="/filter-region" element={<FilterRegion />} />
      </Routes>
    </div>
  )
}

export default App
