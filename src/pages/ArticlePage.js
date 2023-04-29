import React from 'react'
import { faker } from '@faker-js/faker';
import { useState } from "react";
import { useLocation } from "react-router-dom";

// demonstrated reputation
// epoch key

// article text (full)
// upvote/downvote logic

// credibility rating qs
// contest mechanism

// return to main page


const ArticlePage = () => {
    const { state } = useLocation();
    const selectedItem = state.items;

    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating3, setRating3] = useState(0);
    const [rating4, setRating4] = useState(0);

    const articleText = faker.lorem.paragraphs();





    return (
        <div>
            <nav className="flex justify-between items-center bg-gray-900 p-4">
                <div className="text-white">
                    User's Demonstrated Reputation: { }
                </div>
                <div className="text-white">
                    Epoch Key of User: {Math.floor(Math.random() * 10000)}
                </div>
            </nav>
            <article className="p-4">
                <p className="text-lg">{articleText}</p>
                <div className="flex justify-end">
                    <div className="flex items-center mr-4">
                        <button
                            className="upvote"
                            onClick={() => setUpvotes(upvotes + 1)}
                        >
                            Upvote
                        </button>
                        <span className="ml-2">{upvotes}</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="downvote"
                            onClick={() => setDownvotes(downvotes + 1)}
                        >
                            Downvote
                        </button>
                        <span className="ml-2">{downvotes}</span>
                    </div>
                </div>
            </article>
            <footer className="bg-gray-200 py-4 px-6 fixed bottom-0 left-0 w-full">
                <h2 className="text-lg font-bold mb-4">Please rate this article:</h2>
                <div className="flex justify-between items-center">
                    <label htmlFor="rating1">Rating Question 1:</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={rating1}
                        onChange={(event) => setRating1(Number(event.target.value))}
                        id="rating1"
                        className="w-4/5 ml-4"
                    />
                    <span>{rating1}</span>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="rating2">Rating Question 2:</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={rating2}
                        onChange={(event) => setRating2(Number(event.target.value))}
                        id="rating2"
                        className="w-4/5 ml-4"
                    />
                    <span>{rating2}</span>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="rating3">Rating Question 3:</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={rating3}
                        onChange={(event) => setRating3(Number(event.target.value))}
                        id="rating3"
                        className="w-4/5 ml-4"
                    />
                    <span>{rating3}</span>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="rating3">Rating Question 4:</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={rating4}
                        onChange={(event) => setRating4(Number(event.target.value))}
                        id="rating3"
                        className="w-4/5 ml-4"
                    />
                    <span>{rating4}</span>
                </div>

            </footer >
        </div>


    )
}

export default ArticlePage