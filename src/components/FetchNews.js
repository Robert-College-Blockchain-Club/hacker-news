import { useState, useEffect } from "react"

export default function FetchNews() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      )
      const data = await res.json()
      setItems(data.hits)
      console.log(data.hits)
    }

    fetchNews()
  }, [])

  return (
    <>
      <main className="container-xl mx-auto">
        <section className="h-96 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-600">
          <h1 className="text-center uppercase text-4xl md:text-6xl font-bold text-white pt-20">
            An all you can read buffet
          </h1>
        </section>
        <div className="-mt-52 p-5 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:max-w-6xl 2xl:mx-auto">
          {items.map((item) => {
            const { author, created_at, objectID, title, url } = item

            return (
              <article key={objectID} className="p-5 rounded shadow bg-white">
                <h3 className="font-bold text-gray-800 text-xl mb-3">
                  {title}
                </h3>
                <p>
                  Author: <em>{author}</em>
                </p>
                <a href={url} target="_blank" rel="noopenner noreferrer">
                  Read More
                </a>
                <p>Date: {created_at}</p>
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
