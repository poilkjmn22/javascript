import React from 'react'
import Tag from './tag.jsx'
import {omit} from 'lodash-es'

const BugRecordCard = (props) => {
  const {bugRecord} = props
  return (
    <div className="bug-record-card">
      <div className="opra-area">
        <button data-bug-record={JSON.stringify(omit(bugRecord, 'cateTitle'))} onClick={props.handleDelete} className="button-delete button-base">删除</button>
      </div>
      <div className="content-area">
        <p className="text">{bugRecord.text}</p>
        <p className="footer">
          <Tag name={bugRecord.cate} title={bugRecord.cateTitle} />
          <time>{new Date(bugRecord.ts).toLocaleString()}</time>
        </p>
      </div>
    </div>
  )
}
export default BugRecordCard
