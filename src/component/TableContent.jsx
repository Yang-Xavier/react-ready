import React, { Component  } from 'react'

import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableHeader from 'material-ui/lib/table/table-header'
import TableFooter from 'material-ui/lib/table/table-footer'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'

import BetweenButtons from './BetweenButtons.jsx'

function combineTableRows(keys, datas){
  return datas.map((data) => {

    let rows = keys.map((key) => {
      return <TableRowColumn tooltip={key}>{data[key]}</TableRowColumn>
    })

    return (
      <TableRow>
        {rows}
      </TableRow>
    )
  })
}

export class InfoTable extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    let body = this.props.body
    let bodyElement = null

    if(body){
      bodyElement = combineTableRows(body['keys'], body['datas'])
    }

    return (
      <div style={this.props.style}>
      <Table
        fixedHeader={true}
        selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn colSpan="2" tooltip='table name' style={{textAlign: 'center'}}>
              {this.props.TableName}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}
          showRowHover={false} >
          {bodyElement}
        </TableBody>
      </Table>
      </div>
    )
  }
}
InfoTable.propTypes = {
  //body : {keys:array(length=2), datas:array<object>}
  body: React.PropTypes.object.isRequired,
  TableName: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
}
InfoTable.defaultProps = {
  style: {}
}

export class MagicTable extends Component {
  
  constructor(props) {
    super(props)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  handleCellClick(rowNumber, columnid){
    this.props.handleRowClick(this.props.datas[rowNumber])
  }

  render() {
    let colSpan = this.props.rowColumns.length.toString()
    let datas = this.props.datas
    let rowColumns = this.props.rowColumns


    let tableHeadColumns = this.props.headColumns.map((elf, index) => {
      return <TableHeaderColumn tooltip={rowColumns[index]}>{elf}</TableHeaderColumn>
    })
    
    let tableRows = combineTableRows(rowColumns, datas) 

    return (
      <div style={{padding:'0 16px', margin: '0 0 50px 0', minHeight: this.props.minHeight.toString()+'px'}} >
      <Table height={ datas.length > 0 ? undefined : '100px'} 
          fixedHeader={true} fixedFooter={true} onCellClick={this.handleCellClick}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn colSpan={colSpan} tooltip='page number' style={{textAlign: 'center'}}>
              {this.props.tableHeader}
            </TableHeaderColumn>
          </TableRow>
          <TableRow selectable={false}>{tableHeadColumns}</TableRow>
        </TableHeader>

        <TableBody  showRowHover={true} stripedRows={false} >
          {tableRows}
        </TableBody>

      </Table>
      </div>
    )
  }
}
MagicTable.propTypes = {
  headColumns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowColumns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  datas:  React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleRowClick: React.PropTypes.func,
  tableHeader: React.PropTypes.string,
  minHeight: React.PropTypes.number,
}
MagicTable.defaultProps = {
  handleRowClick: () => {},
  minHeight: 50,
  tableHeader: 'Table'
}


export default class TableContent extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    let prewButton = { 
      'label': 'Prew', 'onTouchTap': this.props.buttonsClick[0], 'type': 2}
    let nextButton =  {
      'label': 'Next', 'onTouchTap': this.props.buttonsClick[1], 'type': 2}
    let buttonsStyle = {padding: '16px', margin:'0 0'}
    let page = this.props.page
    let all_pages = this.props.all_pages
    let tableHeader = "Page "+(page+1)+" / "+all_pages+" ."

    if(page == 0){
      prewButton.disabled = true
    }

    if(page+1 == all_pages){
      nextButton.disabled = true
    }
    
    return (
      <div style={{width: '100%', minHeight:this.props.height+'px', margin: '0 0', padding:'0 0'}}>
        <MagicTable {...this.props} minHeight={this.minHeight-118} tableHeader={tableHeader}/>
        <BetweenButtons buttons={[prewButton, nextButton]} style={buttonsStyle}/>
      </div>
    )
  }
}
TableContent.propTypes = {
  height: React.PropTypes.number,
  //headColumns is the name of the Columns , but rowColumns is the key name of the Column element
  buttonsClick: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
  headColumns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowColumns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  datas:  React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleRowClick: React.PropTypes.func,
  page: React.PropTypes.number.isRequired,
  all_pages: React.PropTypes.number.isRequired,
}
TableContent.defaultProps = {
  height: 332
}




