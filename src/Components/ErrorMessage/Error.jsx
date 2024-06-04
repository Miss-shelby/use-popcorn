/* eslint-disable react/prop-types */

const ErrorMessage = ({message}) => {
  return (
    <div>
      <p className="error">
        <span>⚠️</span>{message}
      </p>
    </div>
  )
}

export default ErrorMessage
