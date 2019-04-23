import 'isomorphic-fetch'
import Layout from '../components/layout'
import Error from 'next/error'
import Link from 'next/link'
import sanity from '../lib/sanity'
import sanityClient from '../lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(sanityClient)

function imageUrlFor(source) {
  return imageBuilder.image(source)
}

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "posterAspect": poster.asset->.metadata.dimensions.aspectRatio,
  "director": crewMembers[job == "Director"][0].person->name
}[0...50]
`

export default class Movies extends React.Component {

  static async getInitialProps() {
    return {
      movies: await sanity.fetch(query)
    }
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  render() {
    const { movies } = this.props
    if (typeof movies === 'undefined' || !movies) return <Error statusCode={503} />

    return (
      <Layout title={'Paraform'}
        description={'Branding agency, motion & digital'}>
        <div className="movies">
          <ul className="list">
            {movies.map(movie => (
              <li key={movie._id} className="list__item">
                <Link href={{ pathname: '/movie', query: { id: movie._id } }}>
                  <a>
                    {movie.poster && (
                      <img
                        src={imageUrlFor(movie.poster).ignoreImageParams().width(300)}
                        width="100"
                        height={100 / movie.posterAspect}
                        alt="title"
                      />
                    )}
                    <div style={{ paddingTop: '0.2em' }}>{movie.releaseDate.substr(0, 4)}</div>
                    <h3>{movie.title}</h3>
                    {movie.director && (
                      <span className="movies-list__directed-by">
                        Directed by {movie.director}
                      </span>
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}