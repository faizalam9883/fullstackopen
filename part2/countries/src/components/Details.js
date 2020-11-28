import React, { useState, useEffect } from "react"
import axios from "axios"

const Details = (props) => {
	const [weather, setWeather] = useState([])
	const [isLoading, setLoading] = useState(true)

	const city = props.value[0].capital

	const params = {
		access_key: process.env.REACT_APP_API_KEY,
		query: city,
	}

	useEffect(() => {
		axios
			.get("http://api.weatherstack.com/current", { params })
			.then((response) => {
				setWeather(response.data)
				setLoading(false)
			})
	}, [])

	if (isLoading) {
		return <h3>Loading...</h3>
	}

	return (
		<div>
			{props.value.map((country) => (
				<div key={country.name}>
					<h1>{country.name}</h1>
					<p>capital: {country.capital}</p>
					<p>population: {country.population}</p>
					<h3>Spoken Languages</h3>
					<ul>
						{country.languages.map((language) => (
							<li key={language.name}>{language.name}</li>
						))}
					</ul>
					<div>
						<img
							src={country.flag}
							alt="flag"
							width="100px"
							height="100px"
						/>
					</div>
					<div>
						<h2>Weather in {country.capital}</h2>
						<p>Temperature: {weather.current.temperature} *C</p>
						<img
							src={weather.current.weather_icons[0]}
							alt="weather conditions"
						/>
						<p>
							Wind: {weather.current.wind_speed} kph direction{" "}
							{weather.current.wind_dir}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Details
