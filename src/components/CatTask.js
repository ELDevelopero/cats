import { useState, useEffect } from 'react'

export default function Task() {
  const [data, setData] = useState([])
  const [datas, setDatas] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch('http://localhost:8080/data')
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [datas])

  const sortCute = () => {
    setDatas(data.cats.sort((a, b) => b.cutenessLevel - a.cutenessLevel))
  }

  const sortNotCute = () => {
    setDatas(data.cats.sort((a, b) => a.cutenessLevel - b.cutenessLevel))
  }

  const sortNormal = () => {
    setDatas(data.cats)
  }

  if (error) {
    alert(error)
  }

  return (
    <>
      {loading && <h1>Loading...</h1>}
      <button onClick={sortCute}>Cute</button>
      <button onClick={sortNotCute}>Not Cute</button>
      <button onClick={sortNormal}>None</button>
      <img src='/images/8.jpg' alt='cats' />

      {datas.map((results, id) => {
        const path = '/images/'
        const photo = path + results.image
        return (
          <div key={id}>
            {data && (
              <li>
                <img src={photo} alt='cats' />
                <p>{results.name}</p>
              </li>
            )}
          </div>
        )
      })}
    </>
  )
}
