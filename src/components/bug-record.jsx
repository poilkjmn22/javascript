import React from "react";
import axios from "axios";
import BugRecordCardList from "./bug-record-card-list.jsx";
import FormNote from "./form-note.jsx";

class BugRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugRecordList: [],
      isEditing: false,
    };
    this.handleAddBugRecord = this.handleAddBugRecord.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
  }
  render() {
    return (
      <div>
        <BugRecordCardList
          handleClickCard={this.handleClickCard}
          handleDelete={this.handleDelete}
          items={this.state.bugRecordList}
        />
        <FormNote
          isShow={this.state.isEditing}
          onSubmitCallback={this.onSubmitCallback}
        />
        <button
          onClick={this.handleAddBugRecord}
          style={{ fontSize: "20px" }}
          className="button-base button-primary"
        >
          {this.state.isEditing ? "-" : "+"}
        </button>
      </div>
    );
  }
  onSubmitCallback(compFormNote) {
    axios
      .post("/api/bug-record", {
        text: compFormNote.state.text,
        notecate: compFormNote.state.notecate,
      })
      .then((res) => {
        if (res.data.code === 0) {
          this.getApiBugRecordList();
          this.setState({
            isEditing: false,
          });
          //
          compFormNote.setState({
            text: "",
            notecate: "",
          });
        } else {
          window.alert("获取bug-record-list数据失败！");
        }
      })
      .catch(console.error);
  }
  handleClickCard() {
    this.props.history.push("/record/detail");
  }
  handleDelete(event) {
    axios
      .post("/api/bug-record/delete", {
        bugRecord: event.target.dataset.bugRecord,
      })
      .then((res) => {
        if (res.data.code === 0) {
          this.getApiBugRecordList();
        } else {
          console.error(res.data.msg);
        }
      })
      .catch(console.error);
  }
  handleAddBugRecord() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }
  getApiBugRecordList() {
    axios.get("/api/bug-record-list").then((res) => {
      this.setState({
        bugRecordList: res.data,
      });
    });
  }
  componentDidMount() {
    this.getApiBugRecordList();
  }
}

BugRecord.defaultProps = {
  name: "bug-record",
};

export default BugRecord;
