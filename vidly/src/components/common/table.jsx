import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ data, columns, sortColumn, onSort, onDelete, onLike }) => {
  return (
    <table className="table table-hover">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        data={data}
        columns={columns}
        onDelete={onDelete}
        onLike={onLike}
      />
    </table>
  );
};

export default Table;
