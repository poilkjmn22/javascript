import React from "react";
import axios from "axios";
import Validator from "./validator.jsx";

class FormNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorMsgText: "",
      notecate: "",
      noteCates: [],
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeNoteCate = this.handleChangeNoteCate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    const noteCates = this.state.noteCates;
    const options = [
      <option key="" value="">
        请选择
      </option>,
    ];
    for (const k of noteCates) {
      options.push(
        <option key={k.name} value={k.name}>
          {k.name}
        </option>
      );
    }
    return (
      <form
        style={{ display: this.props.isShow ? "block" : "none" }}
        className={this.props.name}
        action="/api/bug-record"
        method="post"
        ref="formBugRecord"
        onSubmit={this.handleSubmit}
      >
        <div className="form-row">
          <textarea
            rows="10"
            cols="50"
            onChange={this.handleChangeText}
            name="text"
            value={this.state.text}
          ></textarea>
          <Validator errorMsg={this.state.errorMsgText} />
        </div>
        <div className="form-row">
          <select
            onChange={this.handleChangeNoteCate}
            name="note[cate]"
            selected={this.state.notecate}
          >
            {options}
          </select>
        </div>
        <div className="form-row">
          <input
            className="button-base button-primary"
            type="submit"
            value="提交"
          />
        </div>
      </form>
    );
  }
  handleChangeText(event) {
    this.setState(
      {
        text: event.target.value,
      },
      this.validateText
    );
  }
  handleChangeNoteCate(event) {
    this.setState({
      notecate: event.target.value,
    });
  }
  validateText() {
    if (!this.state.text) {
      this.setState({
        errorMsgText: "文本内容不可为空！",
      });
    } else {
      this.setState({
        errorMsgText: "",
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    //fn(this.refs.formBugRecord).submit()
    this.validateText();
    setTimeout(() => {
      if (!this.state.errorMsgText) {
        this.props.onSubmitCallback(this);
      }
    });
  }
  componentDidMount() {
    axios
      .get("/api/note-cate/list")
      .then((res) => {
        console.log(res.data);
        this.setState({
          noteCates: res.data,
        });
      })
      .catch(console.error);
  }
}

FormNote.defaultProps = {
  name: "form-note",
  isShow: true,
};
export default FormNote;
