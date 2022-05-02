import { useState, useEffect } from "react"
// import format from "date-fns/format"
// You can use the import above or the one below
import { format } from "date-fns"

export default function FetchNews() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(true) // loading state

  useEffect(() => {
    setIsLoading(true)

    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`
      const res = await fetch(url)
      const data = await res.json()
      data.hits.length = 10
      setItems(data.hits)
    }

    fetchNews()
    setIsLoading(false)
  }, [query])

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
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center justify-center px-5 -mt-32 mb-5"
        >
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Search for something..."
            autoComplete="off"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="py-2 px-6 rounded shadow w-full md:w-1/2 bg-transparent border-2 border-white text-xl text-white placeholder-white lg:text-4xl"
          />
          <button
            type="submit"
            className="bg-white text-red-500 py-3 px-10 text-lg  mt-2 sm:mt-0 sm:ml-5 rounded shadow border-2 border-white-500 hover:bg-transparent transition-all duration-300 hover:text-white font-light tracking-wider uppercase"
            onClick={handleSubmit}
          >
            Search
          </button>
        </form>
        {/* End of search form */}

        {isLoading ? (
          // The spinning thingy for the loading state. (Try to simulate a low-end mobile)
          // Or a slow network to see how this works.
          <div className="spinner"></div>
        ) : (
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
                  <p>
                    {/* Format date using the `format` method from `date-fns` */}
                    Published: {format(new Date(created_at), "dd MMM yyyy")}
                  </p>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
