import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <Link to={`/course/${id}`}>
      <li className="list-item">
        <button type="button" className="button">
          <img className="list-logo" src={logoUrl} alt={name} />
          <p className="name-text">{name}</p>
        </button>
      </li>
    </Link>
  )
}

export default CourseItem
