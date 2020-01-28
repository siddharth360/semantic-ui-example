// import _ from "lodash";
import * as _ from "underscore";
import React, { Component } from "react";
import { Table } from "semantic-ui-react";

const tableData = [
  { username: "richard", email: "richard@sample.com", age: 20 },
  { username: "michael", email: "michael@sample.com", age: 23 },
  { username: "diego", email: "diego@sample.com", age: 24 },
  { username: "rene", email: "rene@sample.com", age: 22 },
  { username: "agustin", email: "agustin@sample.com", age: 32 }
];

class TableExampleSortable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: tableData,
      direction: null
    };

    this.handleSort = this.handleSort.bind(this);
    this.searchData = this.searchData.bind(this);
  }

  handleSort(clickedColumn) {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  }

  searchData(e) {
    console.log("e.target.value", e.target.value);
    let searchString = String(e.target.value);
    let searchedData = [];

    if (searchString) {
      let data = _.pluck(tableData, "username");
      for (let index = 0; index < data.length; index++) {
        if (data[index] === searchString) {
          searchedData.push(tableData[index]);
        }
      }
      console.log("data", searchedData);
    } else {
      searchedData = tableData;
    }

    this.setState({
      column: null,
      data: searchedData,
      direction: "ascending"
    });
  }

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search..."
            name="searchData"
            onChange={e => this.searchData(e)}
          />
        </div>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "username" ? direction : null}
                onClick={e => this.handleSort("username")}
              >
                Username
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "email" ? direction : null}
                onClick={e => this.handleSort("email")}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "age" ? direction : null}
                onClick={e => this.handleSort("age")}
              >
                Age
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ email, age, username }) => (
              <Table.Row key={username}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{age}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TableExampleSortable;
