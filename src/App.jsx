/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import langcode from "./langcode.json";

function App() {
  const [inlang, setInlang] = useState("");
  const [outlang, setOutlang] = useState("");
  const [totranslate, settotranslate] = useState("");
  const [translatedStr, settranslatedStr] = useState(
    "Nothing to translate yet..."
  );
  async function getLangData() {
    const options = {
      method: "POST",
      url: "https://google-translator9.p.rapidapi.com/v2",
      headers: {
        "x-rapidapi-key": "a09def0f2emshdcc7e36f69fdb60p1b1885jsnd064a990f9c8",
        "x-rapidapi-host": "google-translator9.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        q: totranslate,
        source: inlang,
        target: outlang,
        format: "text",
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response);
      settranslatedStr(response.data.data.translations[0].translatedText);
      // console.log(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //    getLangData();
  // }, []);

  function handelSubmit(e) {
    e.preventDefault();
    if (
      inlang === "" ||
      outlang === "" ||
      totranslate === "" ||
      totranslate.length < 4
    ) {
      alert("PLEASE CHOOSE INPUT AND OUTPUT CORRECTLY");
    } else {
      getLangData();
      console.log(totranslate + "\n" + translatedStr);
    }
    setInlang("");
    setOutlang("");
  }
  return (
    <div className='container min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 min-h-dvh'>
      <form
        className='border-b-2 border-b-gray-100 flex justify-around flex-wrap items-center py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full'
        onSubmit={(e) => handelSubmit(e)}
      >
        <div className='bg-emerald-400 flex items-center justify-center font-medium'>
          <label
            htmlFor='text-input'
            className='text-white text-center p-2 border-1 border-gray-400 shadow-xl shadow-emerald-700'
          >
            Enter Text:
          </label>
          <input
            placeholder='Input Text to translate...'
            className='text-center p-2 border-2 border-amber-300'
            type='text'
            id='text-input'
            value={totranslate}
            onChange={(e) => settotranslate(e.currentTarget.value)}
          />
          <label
            htmlFor='language-input'
            className='text-white text-center p-2 border-1 border-gray-400 shadow-xl shadow-emerald-700'
          >
            Select Language:
          </label>
          <select
            className='text-center p-2 border-2 border-amber-300 bg-emerald-300 text-red-500'
            id='language-input'
            value={inlang}
            onChange={(e) => {
              setInlang(e.currentTarget.value);
            }}
          >
            <option value='' selected disabled>
              Select Input Language
            </option>
            {langcode.map((lang, idx) => (
              <option key={idx} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className='bg-amber-500 flex items-center justify-center font-medium'>
          <label
            htmlFor='lang-out'
            className='text-white text-center p-2 border-1 border-gray-400 shadow-xl shadow-amber-800'
          >
            Translate-To:
          </label>
          <select
            className='text-center p-2 border-2 border-emerald-300 bg-amber-300 text-blue-700'
            id='lang-out'
            value={outlang}
            onChange={(e) => setOutlang(e.currentTarget.value)}
          >
            <option value='' selected disabled>
              Select Output Language
            </option>
            {langcode.map((lang, idx) => (
              <option key={idx} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
        >
          Translate
        </button>
      </form>
      <div className='shadow-lg shadow-indigo-500/50 w-2/3 m-auto mt-6 text-center font-medium border min-h-96 flex'>
        <div className='w-full border'>
          <h1 className='text-3xl mb-3 border-b'>Text To Translate</h1>
          <h1 className='text-2xl text-red-200'>
            {" "}
            {totranslate === "" ? "Type Something to translate" : totranslate}
          </h1>
        </div>

        <div className='w-full border'>
          <h1 className='text-3xl mb-3 border-b'>Translated Text</h1>
          <h1 className='text-2xl text-lime-400'>{translatedStr}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;

// {{
//   "data": {
//       "translations": [
//           {
//               "translatedText": "कृपया मुझे कुछ खाने को दो"
//           }
//       ]
//   }
// }}
