// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'

export default class MyDocument extends Document {
    static getInitialProps ({ renderPage }) {
      const page = renderPage()
      const styles = extractCritical(page.html)
      return { ...page, ...styles }
    }
  
    constructor (props) {
      super(props)
      const { __NEXT_DATA__, ids } = props
      if (ids) {
        __NEXT_DATA__.ids = ids
      }
    }
  
    render() {
        return (
            <html lang="en">
                <Head>
                <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}