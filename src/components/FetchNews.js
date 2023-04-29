import { useState, useEffect } from "react"
// import format from "date-fns/format"
// You can use the import above or the one below
import { format } from "date-fns"

export default function FetchNews() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("programming")
  const [text, setText] = useState("")
  const [largeTitle, setLargeTitle] = useState([])
  const [isLoading, setIsLoading] = useState(true) // loading state

  useEffect(() => {
    setIsLoading(true)

    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`
      const res = await fetch(url)
      const data = await res.json()
      // You can change the number of items you get back in your response using
      // the `Array.length` method, as demonstrated below. Uncomment the line and
      // reload your app to see it in action.
      //data.hits.length = 10
      setItems(data.hits)
      setLargeTitle(data.hits[0])
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
      <main>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <article className="my-10 flex flex-col items-center justify-center container lg:max-w-4xl mx-auto px-5">
              <h1 className="font-bold text-center text-4xl my-5 text-white lg:text-6xl">
                {largeTitle.title}
              </h1>
              
            </article>

            <article className="container mx-auto lg:max-w-4xl px-5">
              <p className="text-gray-600">
                Category:{" "}
                <span className="font-bold text-gray-400 capitalize">
                  {query}
                </span>
              </p>
            </article>

            <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 container mx-auto lg:max-w-4xl">
              {items.map((item, index) => {
                const { epochKey, created_at, objectID, title, url } = item

                return (
                  <article
                    key={index}
                    className="bg-gray-800 rounded p-3 transition-all duration-150"
                  >
                    <h3 className="font-bold text-white text-lg mb-3">
                      {index+1}
                    </h3>
                    <h3 className="font-bold text-white text-lg mb-3">
                      {title}
                    </h3>
                    <article className="flex items-center justify-between">
                      <p className="text-gray-600">
                        By <em>{epochKey}</em>
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopenner noreferrer"
                        className="border-b border-gray-700 text-gray-600 text-lg hover:text-gray-400 hover:border-gray-400"
                      >
                        Read More
                      </a>
                    </article>
                    <p className="text-gray-400 mt-10">
                      {/* Format date using the `format` method from `date-fns` */}
                      {format(new Date(created_at), "dd MMM yyyy")}
                    </p>
                  </article>
                )
              })}
            </section>
          </>
        )}
      </main>
    </>
  )
}
