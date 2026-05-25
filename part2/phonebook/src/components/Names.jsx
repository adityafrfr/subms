const ShowName = (props) => {
    return(
        <p>{props.personName} {props.personNumber} 
        <button onClick={props.onClick}>Delete</button></p>
    )
}

export default ShowName
