import React from "react";
import UserListRow from "./UserListRow";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UserListTable extends React.Component {
  render() {
    let rowDel = this.props.onRowDel;
    let rowEdit = this.props.onRowEdit;

    let filterText = this.props.filterText;
    let user = this.props.users.map(function (user) {
      const { name, email } = user;
      if (!name.toLowerCase().includes(filterText) || 
        !email.toLowerCase().includes(filterText)
      ) {
        return false;
      }
      return (
        <UserListRow
          user={user}
          onDelEvent={rowDel.bind(this)}
          onEditEvent={rowEdit.bind(this)}
          key={user.id}
        />
      );
    });
    return (
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{user}</TableBody>
        </Table>
        </TableContainer>
    );
  }
}

export default UserListTable;
