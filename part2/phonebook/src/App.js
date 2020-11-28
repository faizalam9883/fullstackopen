import React, { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Notification from "./components/Notification"
import Error from "./components/Error"
import personServices from "./services/personBackend"
import "./index.css"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [inputName, setInputName] = useState("") // input of filtered names
	const [msg, setMsg] = useState(null)
	const [error, setError] = useState(null)

	// fetch data from the db.json file and assign it to persons state
	useEffect(() => {
		personServices
			.getAll()
			.then((initialPersons) => setPersons(initialPersons))
	}, [])

	// add person to persons state
	const addPerson = (e) => {
		e.preventDefault()
		// this checks whether name is already in persons array
		let i = 0,
			id = 0
		persons.forEach((person) => {
			if (person.name === newName || !newName) {
				i++
				id = person.id
			}
		})
		if (i > 0) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with the new one?`
				)
			) {
				// update the person number
				const newObj = { name: newName, number: newNumber }
				personServices
					.update(id, newObj)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : returnedPerson
							)
						)
						setMsg(`Updated ${returnedPerson.name}`)
						setTimeout(() => {
							setMsg(null)
						}, 3500)
						setNewName("")
						setNewNumber("")
					})
					.catch((error) => {
						setError(
							`Information of ${newObj.name} has already been removed from server`
						)
						setTimeout(() => {
							setError(null)
						}, 3500)
						setNewName("")
						setNewNumber("")
						setPersons(persons.filter((person) => person.id !== id))
					})
			}
		} else {
			const obj = {
				name: newName,
				number: newNumber,
			}
			// add persons to backend server
			personServices.create(obj).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson))
				setMsg(`Added ${returnedPerson.name}`)
				setTimeout(() => {
					setMsg(null)
				}, 3500)
				setNewName("")
				setNewNumber("")
			})
		}
	}

	// logic for filtering names by input value
	const filterNames = (arr) =>
		arr.filter((person) =>
			person.name.toLowerCase().includes(inputName.toLowerCase())
		)

	const handleName = (e) => {
		setNewName(e.target.value)
	}

	const handleNumber = (e) => {
		setNewNumber(e.target.value)
	}

	const handleFilter = (e) => {
		setInputName(e.target.value)
	}

	// deleting person from backend server
	const deletePerson = (id) => {
		const person = persons.find((p) => p.id === id)
		if (window.confirm(`Delete ${person.name} ?`)) {
			personServices.deleteID(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id))
			})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification msg={msg} />
			<Error msg={error} />
			<Filter value={inputName} onChange={handleFilter} />
			<h2>Add a new</h2>
			<PersonForm
				onSubmit={addPerson}
				newName={newName}
				handleName={handleName}
				newNumber={newNumber}
				handleNumber={handleNumber}
			/>
			<h2>Numbers</h2>
			<ul>
				{filterNames(persons).map((person) => (
					<Persons
						key={person.id}
						person={person}
						onClick={() => deletePerson(person.id)}
					/>
				))}
			</ul>
		</div>
	)
}

export default App
