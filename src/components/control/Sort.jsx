import React, { Component } from "react";

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplaySort: false,
      sort: {
        sortBy: "name",
        sortValue: 1,
      },
    };
  }
  onToggeSort = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };
  onClick = async (sortBy, sortValue) => {
    await this.setState({
      sort: {
        sortBy: sortBy,
        sortValue: sortValue,
      },
    });

    this.props.onSort(this.state.sort);
  };
  render() {
    const { sort } = this.state;
    return (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={this.onToggeSort}
        >
          Sắp Xếp{" "}
          <span
            className="fa fa-caret-square-o-down"
            style={{ marginLeft: "5px" }}
          ></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li
            onClick={() => {
              this.onClick("name", 1);
            }}
          >
            <div
              role="button"
              className={
                sort.sortBy === "name" && sort.sortValue === 1
                  ? "sort_selected"
                  : ""
              }
            >
              <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
            </div>
          </li>
          <li
            onClick={() => {
              this.onClick("name", -1);
            }}
          >
            <div
              role="button"
              className={
                sort.sortBy === "name" && sort.sortValue === -1
                  ? "sort_selected"
                  : ""
              }
            >
              <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
            </div>
          </li>
          <li role="separator" className="divider"></li>
          <li
            onClick={() => {
              this.onClick("status", 1);
            }}
          >
            <div
              role="button"
              className={
                sort.sortBy === "status" && sort.sortValue === 1
                  ? "sort_selected"
                  : ""
              }
            >
              Trạng Thái Kích Hoạt
            </div>
          </li>
          <li
            onClick={() => {
              this.onClick("status", -1);
            }}
          >
            <div
              role="button"
              className={
                sort.sortBy === "status" && sort.sortValue === -1
                  ? "sort_selected"
                  : ""
              }
            >
              Trạng Thái Ẩn
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
