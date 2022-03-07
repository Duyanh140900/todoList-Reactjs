import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

export default class Control extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            {/* Search */}
            <Search onSearch={this.props.onSearch} />
          </div>

          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            {/* Sort */}
            <Sort onSort={this.props.onSort} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
