import React, {Component} from 'react';
import TransactionSummary from './TransactionSummary';
import AccountBalance from './AccountBalance';
import FormHeader from './FormHeader';


class RetrieveTransactions extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      address: '',
      transactionInfo: null,
      accountBalanceInfo: null,
      error: null
    }
  }

  onAddressFieldChange = (e) => {
    const input = e.target.value;
    this.setState(() => ({
      input
    }));
  }

  getAccountBalance = async(address) => {
    try{
      //api call to retrieve account balance
      const apiKey = 'WQAG63JD3R5IH2QDQZBZIKPPGJVH9SZYCI';
      const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
      const info = await fetch(url);
      const accountBalanceInfo = await info.json();

      //error handling of invalid ETH address inputs
      if(accountBalanceInfo.status === '1'){
        this.setState(() => ({accountBalanceInfo, error: ''}));
      } else {
        this.setState(() => ({
          error: accountBalanceInfo.result
        }))
      }
    } catch(err){
      this.setState(() => ({
        error: 'There was an error fetching the account balance'
      }))
    }
  }

  getTransactionInfo = async(address) => {
    try{
      //api call to retrieve transaction information
      const apiKey = 'WQAG63JD3R5IH2QDQZBZIKPPGJVH9SZYCI';
      const url = `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
      const info = await fetch(url);
      const transactionInfo = await info.json();
      const{input}= this.state;

      //error handling of invalid ETH address inputs
      if(transactionInfo.status === '1'){
        this.setState(() => ({transactionInfo, address: input, error: ''}));
      } else {
        this.setState(() => ({
          error: transactionInfo.result
        }))
      }

    } catch(err){
      this.setState(() => ({
        error: 'There was an error fetching the transaction info'
      }))
    }
  }

  //get all necessary info for display
  getAddressInfo = async(e) => {
    e.preventDefault();
    const{input} = this.state;

    try{
      await this.getTransactionInfo(input);
    } catch(err){
      console.log(err);
    }

    try{
      await this.getAccountBalance(input);
    } catch(err){
      console.log(err);
    }

    this.setState(() => ({input: ''}));
  }

  render(){
    const{address, accountBalanceInfo, transactionInfo} = this.state;
    return (
      <div>
        <div className='page-header'>
          <FormHeader/><br/>
          <div className='content-container'>
            <form className="form" onSubmit={this.getAddressInfo}>
              <input
                type="text"
                placeholder="ETH ADDRESS"
                autoFocus
                className="text-input"
                value={this.state.input}
                onChange={this.onAddressFieldChange}
              />
              <button className="button">Submit</button>
            </form>
            {this.state.error && <p className="form__error">{this.state.error}</p>}

            {
              accountBalanceInfo && <AccountBalance
                address={address}
                accountBalanceInfo={accountBalanceInfo}
              />
            }
          </div>
        </div>

        <div className='content-container'>
           {
             transactionInfo &&
             <TransactionSummary
               address={address}
               transactionInfo={transactionInfo}
             />
           }
        </div>
      </div>
    )
  }
}

export default RetrieveTransactions;
