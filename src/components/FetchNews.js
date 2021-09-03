import { useState, useEffect } from "react"
import { format } from "date-fns"

export default function FetchNews() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`
      const res = await fetch(url)
      const data = await res.json()
      setItems(data.hits)
    }

    fetchNews()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      console.log("Input is empty")
    } else {
      setQuery(text)
      setText("")
      console.log(text)
      console.log(query)
    }
  }

  return (
    <>
      <main className="container-xl mx-auto">
        <section className="h-96 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-600">
          <h1 className="text-center uppercase text-4xl md:text-6xl font-bold text-white pt-20">
            An all you can read buffet
          </h1>
        </section>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex flex-wrap px-5 -mt-32">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Search for something..."
            autoComplete="off"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="py-2 px-6 rounded shadow w-full md:w-1/2"
          />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-6 rounded shadow border-2 border-red-500 hover:bg-transparent transition-all duration-300 hover:text-red-500 font-bold tracking-wide"
            onClick={handleSubmit}
          >
            Search
          </button>
        </form>
        {/* End of search form */}

        <div className="p-5 grid grid-cols-1 gap-10 md:grid-cols-2 2xl:max-w-6xl 2xl:mx-auto">
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
                <button className="my-5">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopenner noreferrer"
                    className="bg-red-500 text-white py-2 px-6 rounded shadow border-2 border-red-500 hover:bg-transparent transition-all duration-300 hover:text-red-500 font-bold tracking-wide"
                  >
                    Read More
                  </a>
                </button>
                <p>Published: {created_at}</p>
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
