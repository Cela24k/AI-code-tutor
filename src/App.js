/* global chrome */
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import hljs from 'highlight.js';
import axios from 'axios';

/* Config */

const OPENAI_API_KEY = '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';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${OPENAI_API_KEY}`
};

function formatInput(code) {
  return {
    "temperature": 0.5,
    "max_tokens": 200,
    'prompt': `Convert in human language the following code: \n
    ${code}`
  }
};

/* Main component */
function App() {
  const [text, setText] = useState(0);
  const [response, setResponse] = useState('Insert some code');

  useEffect(() => {
    chrome.storage.local.get(['code_text']).then((result) => {

      setText(result.code_text);

      if (result.code_text !== '') {

        var highres = hljs.highlightAuto(result.code_text);

        console.log(highres);

        hljs.highlightAll();

        axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', formatInput(result.code_text), { headers })
          .then(response => {
            setResponse(response.data.choices[0].text);
          })
          .catch(error => {
            console.error(error);
          });
      }


    })
  }, [text]);

  return (
    <div className="App">
      <div className="code-box input">
        <pre>
          <code >
            {text}
          </code>
        </pre>

        <div className='response'>
        {response != '' ? <span>{response}</span> : null}

      </div>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Select some <code>code</code> and open the extension.
        </p>
      </header>
    </div>
  );
}

export default App;
