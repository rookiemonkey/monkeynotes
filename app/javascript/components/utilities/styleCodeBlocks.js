import React from 'react'
import ReactDOMServer from 'react-dom/server'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { decode } from 'html-entities';

const styleCodeBlocks = (str, lang) => {

  /**
   * STYLE CODE BLOCKS
   */
  let strCopy = '' + str
  let openingTagPos = strCopy.indexOf('<pre>');

  while (openingTagPos !== -1) {

    // determine where is the closing pre tag
    const closingTagPos = strCopy.indexOf('</pre>', openingTagPos);

    // remove the opening & closing pre tag
    // remove the default <!--block--> created by trix
    const code = strCopy
      .slice(openingTagPos + 5, closingTagPos)
      .replace('<!--block-->', '')

    // return str version of the component, which is styled version of the code 
    const jsxStr = ReactDOMServer.renderToStaticMarkup(
      <SyntaxHighlighter
        language={lang}
        style={docco}
        showLineNumbers={false}>
        {code}
      </SyntaxHighlighter>
    )

    // insert the jsxStr into the strCopy, decode html-entities
    strCopy = `
      ${strCopy.slice(0, openingTagPos)} 
      ${decode(jsxStr, { level: 'html5' })} 
      ${strCopy.slice(closingTagPos, strCopy.length)}
    `

    // allow loop to begin searching for a new <pre> tag starting after the previous one
    openingTagPos = strCopy.indexOf('<pre>', openingTagPos + 1);

  }


  /**
   * SET TARGET=_blank FOR LINKS
   */
  let anchorTagPos = strCopy.indexOf('<a href=')

  while (anchorTagPos !== -1) {
    strCopy = `
      ${strCopy.slice(0, anchorTagPos + 2)}
      target="_blank" rel="noreferrer noopener"
      ${strCopy.slice(anchorTagPos + 2, strCopy.length)}
    `

    anchorTagPos = strCopy.indexOf('<a href=')
  }


  // give class name to the parent element of the content
  strCopy = strCopy.replace('<div>', '<div class="page-content">')


  return strCopy
}

export default styleCodeBlocks