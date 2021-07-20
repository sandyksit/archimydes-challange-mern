import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class UserRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.user);
  }
  onEditEvent() {
    this.props.onEditEvent(this.props.user)
  }

  render() {
    const { name, email, _id, role } = this.props.user
    const roles = role.length > 0 && role.map(item => item.name).join(", ")

    return (
      <TableRow className="eachRow" key={_id}>
        <TableCell>
          <div>{name}</div>
        </TableCell>
        <TableCell>
          <div>{email}</div>
        </TableCell>
        <TableCell> {roles}
        </TableCell>
        <TableCell className="del-cell">
          <EditIcon onClick={this.onEditEvent.bind(this)} />
          <DeleteIcon onClick={this.onDelEvent.bind(this)} />
        </TableCell>
      </TableRow>
    );
  }
}

export default UserRow;
