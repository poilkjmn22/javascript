import React from 'react'
import PropTypes from 'prop-types'
import BugRecordCard from './bug-record-card.jsx'

const BugRecordCardList = (props) => {
  return (
    <div className="bug-record-card-list">
      {props.items.map((item, idx) => {
        return <BugRecordCard key={idx} bugRecord={item} />
      })}
    </div>
  )
}
BugRecordCardList.defaultProps = {
  items: PropTypes.array.isRequired
}

export default BugRecordCardList
