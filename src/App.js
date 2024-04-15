import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import useLocalStorage from './components/hooks/useLocalStorage';
import Header from './components/Header';

function App() {
  const [html, setHtml] = useLocalStorage('html','');
  const [css, setCss] = useLocalStorage('css','');
  const [js, setJs] = useLocalStorage('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
    `)
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js])

  return (
    <>
    <Header/>
      <div className='pane top-pane'>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className='pane'>
        <iframe
          className='output-screen'
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
        />
      </div>
    </>
  );
}

export default App;
