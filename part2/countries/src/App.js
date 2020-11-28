import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import Display from "./components/Display"
import axios from "axios"

const App = () => {
	const [countries, setCountries] = useState([])
	const [input, setInput] = useState("")

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then((response) => setCountries(response.data))
	}, [])

	const handleInput = (e) => setInput(e.target.value)

	const filterCountry = (arr) =>
		arr.filter((country) =>
			country.name.toLowerCase().includes(input.toLowerCase())
		)

	return (
		<div>
			<Search value={input} onChange={handleInput} />{" "}
			<Display value={filterCountry(countries)} />
		</div>
	)
}

export default App
