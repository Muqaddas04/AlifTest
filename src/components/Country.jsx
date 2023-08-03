import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"

function Country({ country }) {
  const { countryName } = useParams()
  const [currentCountry, setCurrentCountry] = useState(null)

  useEffect(() => {
    if (!country) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          if (response.data.length > 0) {
            setCurrentCountry(response.data[0])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setCurrentCountry(country)
    }
  }, [country, countryName])

  if (!currentCountry) {
    return <div>Loading...</div>
  }

  return (
    <div className=" mx-auto bg-gray-50 rounded-xl shadow-xl mt-10 overflow-hidden md:max-w-2xl">
      <div className="md:flex w-96 h-60 m-16">
        <div className="md:flex-shrink-0">
          <img
            className="h-52 w-52 object-cover md:w-48 rounded-lg shadow-2xl "
            src={currentCountry.flags.png}
            alt={`${currentCountry.name.common} flag`}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-mono">
            {currentCountry.name.common}
          </div>
          <p className="mt-2 text-gray-500">
            Столица: {currentCountry.capital && currentCountry.capital[0]}
          </p>
          <p className="mt-2 text-gray-500">Регион: {currentCountry.region}</p>
          <p className="mt-2 text-gray-500">
            Население: {currentCountry.population}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Country
