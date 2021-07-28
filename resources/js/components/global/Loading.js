import React from 'react'

export const Loading = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{ position: 'fixed', bottom: '0px', height: "70px" }}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export const PageLoading = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "0px", left: "0px", height: "100vh" }}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}