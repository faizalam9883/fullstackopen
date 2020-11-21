import React, { useState } from "react"
import ReactDOM from "react-dom"

const Heading = (props) => {
	return <h1>{props.text}</h1>
}

const Buttons = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>
}

const Statistics = (props) => {
	return (
		<tbody>
			<tr>
				<td>{props.text}</td>
				<td>{props.value}</td>
			</tr>
		</tbody>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const all = good + neutral + bad

	const average = (good - bad) / all || 0

	const positive = (good / all) * 100 || 0

	if (good === 0 && neutral === 0 && bad === 0) {
		return (
			<div>
				<Heading text="give feedback" />
				<Buttons onClick={() => setGood(good + 1)} text="good" />
				<Buttons
					onClick={() => setNeutral(neutral + 1)}
					text="neutral"
				/>
				<Buttons onClick={() => setBad(bad + 1)} text="bad" />
				<Heading text="statistics" />
				<p>No feedback given</p>
			</div>
		)
	}
	return (
		<div>
			<Heading text="give feedback" />
			<Buttons onClick={() => setGood(good + 1)} text="good" />
			<Buttons onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Buttons onClick={() => setBad(bad + 1)} text="bad" />
			<Heading text="statistics" />
			<table>
				<Statistics text="good" value={good} />
				<Statistics text="neutral" value={neutral} />
				<Statistics text="bad" value={bad} />
				<Statistics text="all" value={all} />
				<Statistics text="average" value={average} />
				<Statistics text="positive" value={positive + " %"} />
			</table>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))
