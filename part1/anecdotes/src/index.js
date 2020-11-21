import React, { useState } from "react"
import ReactDOM from "react-dom"

const Heading = (props) => {
	return <h1>{props.text}</h1>
}

const Button = (props) => {
	return (
		<div>
			<button onClick={props.handleClick}>{props.text}</button>
		</div>
	)
}

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

	const randomAnecdote = () => {
		const random = Math.floor(Math.random() * anecdotes.length)
		setSelected(random)
	}

	const voteIncrease = () => {
		let copy = [...votes]
		copy[selected] += 1
		setVotes(copy)
	}

	const mostVotes = () => {
		let max = 0,
			pos = 0
		for (let i = 0; i < anecdotes.length; i++) {
			if (votes[i] > max) {
				max = votes[i]
				pos = i
			}
		}
		return anecdotes[pos]
	}

	return (
		<div>
			<Heading text="Anecdote of the day" />
			<p>{props.anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>

			<Button handleClick={voteIncrease} text="vote" />
			<Button handleClick={randomAnecdote} text="next anecdote" />
			<Heading text="Anecdote with most votes" />
			<p>{mostVotes()}</p>
		</div>
	)
}

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
