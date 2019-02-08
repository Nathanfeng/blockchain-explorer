import React from 'react';
import TransactionSummaryRow from './TransactionSummaryRow';
import TransactionSummaryHeader from './TransactionSummaryHeader';
import { Table} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


const TransactionSummary = ({transactionInfo, address}) => (
  <div>
    <TransactionSummaryHeader
      address={address}
    />

    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
          <Table.HeaderCell>Value (in Wei)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          transactionInfo.result.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No transactions</span>
              </div>
          ) : (
            transactionInfo.result.map((transaction, index) => {
              return (
                <TransactionSummaryRow
                  key={index}
                  transaction = {transaction}
                />
              )
            })
          )
        }
      </Table.Body>
    </Table>
  </div>

)





export default TransactionSummary;
