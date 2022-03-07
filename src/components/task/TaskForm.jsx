import React, { Component } from "react";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: "false",
    };
  }

  onChange = (e) => {
    var target = e.target;

    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };
  componentWillMount() {
    if (this.props.taskEdit) {
      console.log(this.props.taskEdit);
      this.setState({
        id: this.props.taskEdit.id,
        name: this.props.taskEdit.name,
        status: this.props.taskEdit.status,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEdit) {
      console.log(nextProps.taskEdit);
      this.setState({
        id: nextProps.taskEdit.id,
        name: nextProps.taskEdit.name,
        status: nextProps.taskEdit.status,
      });
    } else if (!nextProps.taskEdit) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }
  render() {
    return (
      <div className="panel panel-warning border bordered pb-4">
        <div className="panel-heading">
          <h5
            style={{
              backgroundColor: "#FFFACD",
              padding: "15px",
              color: "#FFD700",
            }}
          >
            {this.state.id === "" ? "Thêm Công Việc" : "Cập nhật công việc"}

            <span
              style={{ float: "right", color: "red", cursor: "pointer" }}
              className="fa fa-times-circle"
              onClick={this.onCloseForm}
            ></span>
          </h5>
        </div>
        <div className="panel-body container-fluid">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <label>Trạng Thái :</label>
              <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-warning"
                  style={{ color: "white" }}
                >
                  <span
                    className="fa fa-plus"
                    style={{
                      marginRight: "5px",
                      fontSize: "13px",
                    }}
                  ></span>
                  Lưu Lại
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onClear}
                >
                  <span
                    className="fa fa-close"
                    style={{ marginRight: "5px" }}
                  ></span>
                  Hủy Bỏ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
