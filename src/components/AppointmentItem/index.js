// Write your code here
/* Write your CSS here */
// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {uid, userTitle, requiredDate, isStared, onStarClicked} = props

  const onClickStar = () => {
    onStarClicked(uid)
  }

  const startImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="li">
      <div className="li-top">
        <p className="li-haed">{userTitle}</p>
        <button
          data-testid="star"
          className="li-btn"
          onClick={onClickStar}
          type="button"
        >
          <img alt="star" src={startImgUrl} />
        </button>
      </div>

      <p className="li-para">Date: {requiredDate}</p>
    </li>
  )
}

export default AppointmentItem
