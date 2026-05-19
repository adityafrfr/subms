import { useState } from 'react'

const Text = (props) => {
  return (
    <div>{props.textVal}</div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}


const Statistics = (props) => {
  if (props.sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
      <StatisticLine text='sum' value={props.sum} />
      <StatisticLine text='Average' value={(props.good - props.bad) / props.sum} />
      <StatisticLine text='Positive' value={String((props.good / props.sum) * 100) + ' %'} />
        </tbody>
      </table>
    </div>
  )


}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)

  const onGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setSum(updatedGood + neutral + bad)

  }

  const onNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setSum(good + updatedNeutral + bad)

  }

  const onBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setSum(good + neutral + updatedBad)
  }



  return (
    <div>
      <Text textVal={'Give Feedback'} />

      <Button onClick={onGood} text={'Good'} />
      <Button onClick={onNeutral} text={'neutral'} />
      <Button onClick={onBad} text={'Bad'} />

      <Statistics good={good} neutral={neutral} sum={sum} bad={bad} />

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

    </div>
  )
}

export default App