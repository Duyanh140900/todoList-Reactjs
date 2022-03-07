import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    //console.log(this.state.keyword);
    this.props.onSearch(this.state.keyword);
  };
  render() {
    return (
      <div className="input-group">
        <input
          name="keyword"
          value={this.state.keyword}
          onChange={this.onChange}
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onSearch}
          >
            <span
              className="fa fa-search"
              style={{ marginRight: "5px" }}
            ></span>
            Tìm
          </button>
        </span>
      </div>
    );
  }
}
