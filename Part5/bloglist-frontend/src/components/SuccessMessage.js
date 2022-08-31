import React from 'react'

function SuccessMessage({ newBlog }) {
  const { title, author } = newBlog
  return (
    <div className="successMsg">
      <h3>A new blog {title} by {author} added</h3>
    </div>
  )
}

export default SuccessMessage