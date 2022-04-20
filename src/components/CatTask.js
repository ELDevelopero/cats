import { useState, useEffect } from 'react'
import '../App.css'

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

  const apiData = datas.map((content, id) => {
    const path = '/images/'
    const photo = path + content.image
    return (
      <>
        {loading && <h1>Loading...</h1>}
        {data && (
          <>
            <div className='col-sm-10 col-md-5 col-lg-6 images' key={id}>
              <img src={photo} alt='cats' />
              <p>{content.name}</p>
            </div>
          </>
        )}
      </>
    )
  })

  if (error) {
    alert(error)
  }

  return (
    <>
      <h1>Incorpurrate gallery &#174;</h1>
      <div className='buttons '>
        {loading && <h1>Loading...</h1>}

        <button className='btn-all' onClick={sortNormal}>
          None
        </button>

        <button className='btn-all' onClick={sortCute}>
          Much Cute
        </button>
        <button className='btn-all' onClick={sortNotCute}>
          Not Cute
        </button>
      </div>
      <div className='container mx-auto'>
        <div className='row'>{apiData}</div>
      </div>
    </>
  )
}
