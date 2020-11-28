import axios from "axios"

const baseurl = "http://localhost:3001/persons"

const getAll = () => {
	const request = axios.get(baseurl)
	return request.then((response) => response.data)
}

const create = (obj) => {
	const request = axios.post(baseurl, obj)
	return request.then((response) => response.data)
}

const deleteID = (id) => {
	return axios.delete(`${baseurl}/${id}`)
}

const update = (id, obj) => {
	const request = axios.put(`${baseurl}/${id}`, obj)
	return request.then((response) => response.data)
}

const personServices = {
	getAll,
	create,
	deleteID,
	update,
}

export default personServices
