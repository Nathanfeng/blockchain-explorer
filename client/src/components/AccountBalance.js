import React from 'react';

const AccountBalance = ({accountBalanceInfo, address}) => (
  <div className="page-header">
    <div className="content-container">
      <h2 className="page-header__title">The address <span>{address}</span> has an account balance of <span>{parseInt(accountBalanceInfo.result).toLocaleString()}</span> Wei</h2>
    </div>
  </div>
);

export default AccountBalance;
