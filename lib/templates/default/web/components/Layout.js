import Head from 'next/head'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { injectGlobal } from 'emotion'
import GlobalStyles from './global-styles'

injectGlobal`
  ${GlobalStyles}
`

export default class Layout extends React.PureComponent {
  render() {
    const { title, description, children, showBack } = this.props

    return <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="manifest" href="/static/manifest.webmanifest" />

        <meta name="theme-color" content="#000" />
        <link rel="shortcut icon" href="/static/icon.png" />
        <link rel="apple-touch-icon" href="/static/icon.png" />
        <meta name="apple-mobile-web-app-title" content="Hacker News" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      <nav>
        <Link href="/"><a>{showBack && <span className="back">&lt;</span>}<span className="title">Hacker News</span></a></Link>
      </nav>

      {children}

    </div>
  }
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
