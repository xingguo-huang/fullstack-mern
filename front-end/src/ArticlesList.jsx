import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

export default function ArticlesList({ articles }) {
  return (
    <>
    {articles.map(a => (
      <Link key={a.name} to={'/articles/' + a.name}>
        <h3>{a.title}</h3>
        <p>{a.content[0].substring(0, 150)}</p>
      </Link>
    ))}
    </>
  )
}

ArticlesList.propTypes = {
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  };