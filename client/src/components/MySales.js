import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Label} from 'react-bootstrap';
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import BidderAccount from "../contracts/BidderAccount.json";

class MySales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sales: []
    }
  }

  componentDidMount() {
    let mySales =[];
    const { web3, accounts, contract } = this.props.main;
    this.web3 = web3;
    contract.getSalesByOwner(accounts[0]).then(salesIdList => {
       salesIdList.map(saleId => {
          saleId = Number(saleId);
          contract.getSale(saleId).then(sales => {
             mySales.push(Object.assign(sales, {id: saleId}));     
            this.setState({sales:mySales});
          });
       });  
    });
  }

  isExpandableRow(row) {
     return true;
  }

  expandComponent(row) {
    let data = {id: row.id, web3: this.web3, accounts: this.props.main.accounts} ;
    return (
      <BSTable data={data} />
    );
  }

  render() {
    let sales = this.state.sales;

    if(sales.length <= 0 ) {
      return (
          <div>
           Loading....
           </div>
        );
    }

    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'row'  // Currently, available value is row and column, default is row
    };
    return (
      <BootstrapTable data={ this.state.sales }
        options={ options }
        bordered={false}
        remote 
        expandableRow={ this.isExpandableRow }
        expandComponent={ this.expandComponent.bind(this) }
        search>
        <TableHeaderColumn dataField='id' isKey={ true }>#</TableHeaderColumn>
        <TableHeaderColumn dataField='saleType' expandable={ false }>Energy Type: </TableHeaderColumn>
        <TableHeaderColumn dataField='units' expandable={ false }>Amount:</TableHeaderColumn>
        <TableHeaderColumn dataField='location' expandable={ false }>Location:</TableHeaderColumn>
      </BootstrapTable>
    );
  }

}

class BSTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: []
    }
  }

  componentDidMount() {
    let bids = [];
    const Contract = truffleContract(BidderAccount);
    Contract.setProvider(this.props.data.web3.currentProvider);
    Contract.deployed().then(instance => {
       instance.getBidsBySales(this.props.data.id).then(bids => {
          bids.map(bidId => {
              bidId = Number(bidId);
              instance.getBidById(bidId).then(bid => {
                if (bid.bidder) {
                  bid.id = bidId,
                  bid.time = '2018-10-07';
                  bids.push(bid);
                  this.setState({bids});
                }
              });
          });
      });
    });
  }

 cellButton(cell, row, enumObject, rowIndex) {
  if (rowIndex == 0) return;
  return (
     <button 
        type="button" className="btn btn-primary" 
        onClick={() => 
        this.placeOrder(cell, row, rowIndex)}
     >
     Sell
     </button>
  )
}

placeOrder(cell, row, rowIndex)
{
    const Contract = truffleContract(BidderAccount);
    Contract.setProvider(this.props.data.web3.currentProvider);
    Contract.deployed().then(instance => {
       let bid = this.state.bids[rowIndex];
       instance.approveTransaction(bid.bidder, rowIndex, {from: this.props.data.accounts[0] }).then(bids => {
          alert('Build Completed successfully');
      });
    });
}

  render() {
    console.log(this.props.data);
    let bids = this.state.bids;
    if (this.state.bids) {
      return (
        <BootstrapTable data={ this.state.bids } bordered={false}>
          <TableHeaderColumn dataAlign="center" dataField='id' isKey={ true }>#</TableHeaderColumn> 
          <TableHeaderColumn dataAlign="center" dataField='coins'>Amount of Coin</TableHeaderColumn>
          <TableHeaderColumn  dataAlign="center" dataField='bidder'>Bidder Address</TableHeaderColumn>
          <TableHeaderColumn dataField='time' dataAlign="center">Date</TableHeaderColumn>
          <TableHeaderColumn
              dataField='button'
              dataFormat={this.cellButton.bind(this)}
            />
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

export default MySales;
