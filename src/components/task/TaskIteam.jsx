import React, { Component } from "react";

export default class TaskIteam extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
  };
  onEdit = () => {
    this.props.onEdit(this.props.task.id);
  };
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true ? "badge bg-success" : "badge bg-danger"
            }
            onClick={this.onUpdateStatus}
            style={{ cursor: "pointer" }}
          >
            {task.status === true ? "Kích Hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning text-white"
            onClick={this.onEdit}
          >
            <span
              className="fa fa-pencil"
              style={{ marginRight: "5px" }}
            ></span>
            Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger text-white"
            onClick={this.onDeleteTask}
          >
            <span className="fa fa-trash" style={{ marginRight: "5px" }}></span>
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
