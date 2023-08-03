import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import SearchCountry from "./SearchCountry"

function FilterRegion() {
  const [region, setRegion] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (region) {
      axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => {
          setCountries(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [region])

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value
    setRegion(selectedRegion)

    if (selectedRegion === "region") {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
          setCountries(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .get(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((response) => {
          setCountries(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className="container pt-8 flex justify-center">
      <div className="mb-12">
        <select
          id="region-select"
          className=" w-48  border bg-indigo-800 border-white hover:bg-white text-white hover:text-indigo-800 shadow-lg rounded-md p-2 ml-48"
          onChange={handleRegionChange}
        >
          <option value="region">Regions</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      {countries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {countries.map((country) => (
            <Link to={`/country/${country.name.common}`}>
              <div
                key={country.name.common}
                className="border border-gray-200 rounded-md overflow-hidden shadow-lg hover:shadow-xl"
              >
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">
                    {country.name.common}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xl font-bold text-gray-400"></p>
      )}
    </div>
  )
}

export default FilterRegion
