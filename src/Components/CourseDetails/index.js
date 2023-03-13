import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

class CourseItemDetails extends Component {
  state = {cardDetails: {}, isLoading: true, success: true}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    const finalData = {courseDetails: data.course_details}
    const updatedData = {
      id: finalData.courseDetails.id,
      name: finalData.courseDetails.name,
      description: finalData.courseDetails.description,
      imageUrl: finalData.courseDetails.image_url,
    }
    if (response.ok === true) {
      this.setState({cardDetails: updatedData, isLoading: false})
    } else {
      this.setState({success: false})
    }
  }

  getCourseDetailsCard = () => {
    const {cardDetails, isLoading} = this.state
    const {imageUrl, name, description} = cardDetails
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="blue" className="loader" />
          </div>
        ) : (
          <div className="home-bg1">
            <div className="details-container">
              <img src={imageUrl} alt={name} />
              <div>
                <h1>{name}</h1>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseDetailsCard()
  }

  render() {
    const {success} = this.state
    return (
      <div>
        <Header />
        {success ? (
          this.getCourseDetailsCard()
        ) : (
          <div className="not-found-page">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
              alt="failure view"
              className="not-found"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We cannot seem to find the page you are looking for you search
            </p>
            <button type="button" onClick={this.onClickRetry}>
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default CourseItemDetails
