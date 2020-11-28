import React, { useState } from "react"
import Details from "./Details"

const Display = (props) => {
	const [country, setCountry] = useState(null)

	const handleClick = (name) => {
		setCountry(name)
	}
	if (country) {
		return <Details value={[country]} />
	}

	if (props.value.length < 1 || props.value.length > 240) {
		return <div></div>
	}
	if (props.value.length > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	}
	if (props.value.length === 1) {
		return (
			<div>
				<Details value={props.value} />
			</div>
		)
	}
	return props.value.map((country) => (
		<p key={country.name}>
			{country.name}
			{"  "}
			<button onClick={() => handleClick(country)}>show</button>
		</p>
	))
}

export default Display
