const Header = ({ course }) => {
    return (<h1>{course.name}</h1>)
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>{parts.map(part => <Part part={part} key={part.id} />)}</div>
    )
}

const Total = ({parts}) => {
    let number = parts.reduce((number, part) => number = number + part.exercises, 0)
    return (
        <p>Total = {number}</p>
    )
}



const Course = ({ course }) => {    
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}


export default Course