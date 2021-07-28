import Skeleton from 'react-loading-skeleton';
import React from 'react'

export const SkeleVodLoading = () => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Skeleton height={130} />
      <div className="mt-2 mb-2">
        <Skeleton height={25} />
        <Skeleton height={25} />
      </div>
      <div className="row">
        {
          [...Array(3)].map((item, i) => (
            <div className="col-md-4 d-flex" key={i}>
              <Skeleton circle={true} height={15} width={15} />
              <div style={{ width: "100%" }}><Skeleton height={15} /></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export const SkeleLatestLoading = () => {
  return (
    <div className="col-sm-3 col-md-3 col-lg-3">
      <Skeleton height={130} />
      <div className="mt-2 mb-2">
        <Skeleton height={25} />
        <Skeleton height={25} />
      </div>
      <div className="row">
        {
          [...Array(3)].map((item, i) => (
            <div className="col-md-4 d-flex" key={i}>
              <Skeleton circle={true} height={15} width={15} />
              <div style={{ width: "100%" }}><Skeleton height={15} /></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export const SkeleStreamLoading = () => {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4">
      <div className="mb-2">
        <Skeleton height={130} />
      </div>
      {
        [...Array(2)].map((item, i) => (
          <div className="d-flex" key={i}>
            <Skeleton circle={true} height={15} width={15} />
            <div style={{ width: "100%" }}><Skeleton height={15} /></div>
          </div>
        ))
      }
    </div>
  )
}

export const SkelePlayerLoading = () => {
  return (
    <div className="mt-5">
      <div className="mb-2">
        <Skeleton height={300} />
      </div>
      <div className="d-flex">
        {
          [...Array(3)].map((item, i) => (
            <div className="d-flex mr-2 align-items-center" key={i}>
              <Skeleton circle={true} height={20} width={20} />
              <Skeleton height={25} width={70} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export const SkeleGameListLoading = () => {
  return (
    <div className="col-lg-2 col-md-3">
      <div className="mb-2">
        <Skeleton height={170} />
      </div>
      <div className="d-flex">
        <Skeleton circle={true} height={15} width={15} />
        <Skeleton height={15} width={70} />
      </div>
    </div>
  )
}
