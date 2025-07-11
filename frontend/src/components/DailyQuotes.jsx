import React, { useEffect, useState } from "react";
import axios from "axios";

const DailyQuotes = () => {
  const [quote, setQuote] = useState("Loading...");

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const storedQuote = JSON.parse(localStorage.getItem("dailyQuote"));

    if (storedQuote && storedQuote.date === today) {
      setQuote(storedQuote.quote);
    } else {
      axios
        .get("https://api.api-ninjas.com/v1/quotes", {
          headers: {
            "X-Api-Key": "PIEG6cyjPr///2jPedbZFg==Nq5ae2Fz0mg7CaPw",
          },
        })
        .then((response) => {
          const data = response.data[0];
          const newQuote = `${data.quote} — ${data.author}`;
          setQuote(newQuote);
          localStorage.setItem(
            "dailyQuote",
            JSON.stringify({ quote: newQuote, date: today })
          );
        })
        .catch((error) => {
          console.error("Failed to fetch quote", error);
          setQuote("“Believe it or not, things will be alright.” — Brook");
        });
    }
  }, []);

  return (
    <div className="rounded-lg py-5 text-black dark:text-white w-[90%]">
      <div className="flex flex-col justify-center text-center items-center z-10">
        <p className="font-bold mb-2 text-lg font-serif text-blue-800 dark:text-blue-400">
          Quote of the day:{" "}
        </p>
        <p className="w-[90%] font-mono ">{quote}</p>
      </div>
    </div>
  );
};

export default DailyQuotes;
