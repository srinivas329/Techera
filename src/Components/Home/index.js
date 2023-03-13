import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

const apiResponses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiResponses.initial}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiResponses.loading})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    const updatedList = data.courses.map(each => ({
      id: each.id,
      logoUrl: each.logo_url,
      name: each.name,
    }))
    console.log(response)
    if (response.ok === true) {
      this.setState({courseList: updatedList, apiStatus: apiResponses.success})
    } else {
      this.setState({apiStatus: apiResponses.failure})
    }
  }

  getSuccessPage = () => {
    const {courseList} = this.state
    return (
      <div className="home-bg">
        <h1 className="course-name">Courses</h1>
        <ul className="ul-list">
          {courseList.map(each => (
            <CourseItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  getFailureView = () => (
    <div className="not-found-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
        className="not-found"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.onClickRetry} type="button" className="button">
        Retry
      </button>
    </div>
  )

  getLoader = () => (
    <div data-testid="loader">
      <Loader width={50} height={50} color="blue" type="BallTriangle" />
    </div>
  )

  onClickRetry = () => {
    this.getHomePageSection()
  }

  getHomePageSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiResponses.success:
        return this.getSuccessPage()
      case apiResponses.loading:
        return this.getLoader()
      case apiResponses.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.getHomePageSection()}
      </div>
    )
  }
}

export default Home
