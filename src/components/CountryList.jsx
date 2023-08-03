import { useState } from "react"
import { Link } from "react-router-dom"

function CountryList({ countries }) {
  const [filterLetter, setFilterLetter] = useState("")

  if (!countries || countries.length === 0) {
    return <div>No countries found</div>
  }

  const filteredCountries = filterLetter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(filterLetter.toLowerCase())
      )
    : countries

  const handleFilterChange = (letter) => {
    setFilterLetter(letter)
  }

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className={`mr-2 ${
            filterLetter === "" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => handleFilterChange("")}
        >
          All
        </button>
        {[...Array(26)].map((_, index) => (
          <button
            key={index}
            className={`mr-2 ${
              filterLetter === String.fromCharCode(index + 97)
                ? "text-blue-500 font-mono"
                : ""
            }`}
            onClick={() => handleFilterChange(String.fromCharCode(index + 97))}
          >
            {String.fromCharCode(index + 65)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            className="bg-gray-50 border-2 rounded-lg shadow-lg hover:shadow-2xl duration-300 cursor-pointer"
          >
            <Link to={`/country/${country.name.common}`}>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-full h-48  shadow-2xl object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-mono mb-2 flex justify-center">
                  {country.name.common}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountryList
