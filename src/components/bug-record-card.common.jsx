
const React =require('react');

const BugRecordCard = (props) => {
  const {bugRecord} = props
  return (
    <div className="bug-record-card">
      <p>{bugRecord.text}</p>
      <time>{new Date(bugRecord.ts).toLocaleString()}</time>
    </div>
  )
}
module.exports = BugRecordCard
