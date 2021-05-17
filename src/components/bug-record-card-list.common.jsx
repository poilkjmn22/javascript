const React = require('react');
const PropTypes = require('prop-types');
const BugRecordCard = require('./bug-record-card.common.jsx');

const BugRecordCardList = (props) => {
  return (
    <div className="bug-record-card-list">
      {props.items.map((item) => {
        return <BugRecordCard bugRecord={item} />
      })}
    </div>
  )
}
BugRecordCardList.defaultProps = {
  items: PropTypes.array.isRequired
}

module.exports = BugRecordCardList
