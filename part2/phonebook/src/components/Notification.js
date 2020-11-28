const Notification = ({ msg }) => {
	if (msg === null) {
		return null
	}
	return <div className="message">{msg}</div>
}

export default Notification
