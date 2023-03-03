import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

class Home extends Component {
  state = {courseList: [], isLoading: true, success: true}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    const updatedList = data.courses.map(each => ({
      id: each.id,
      logoUrl: each.logo_url,
      name: each.name,
    }))
    console.log(updatedList)
    if (response.ok === true) {
      this.setState({courseList: updatedList, isLoading: false})
    } else {
      this.setState({success: false})
    }
  }

  getSuccessPage = () => {
    const {courseList, isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="blue" className="loader" />
          </div>
        ) : (
          <div className="home-bg">
            <h1 className="course-name">Courses</h1>
            <ul className="ul-list">
              {courseList.map(each => (
                <CourseItem details={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseList()
  }

  render() {
    const {success} = this.state
    return (
      <div>
        <Header />
        {success ? (
          this.getSuccessPage()
        ) : (
          <div className="not-found-page">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
              alt="failure view"
              className="not-found"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.onClickRetry}>
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Home
