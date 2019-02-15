import React from 'react';
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const TransactionSummaryRow = ({
  transaction: {
    to,
    from,
    value
  }}) => (
    <Table.Row>
      <Table.Cell>{from}</Table.Cell>
      <Table.Cell>{to}</Table.Cell>
      <Table.Cell>{parseInt(value).toLocaleString()}</Table.Cell>
    </Table.Row>
);

export default TransactionSummaryRow;
