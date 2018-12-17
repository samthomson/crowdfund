import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import web3 from './../ethereum/web3'

class RequestRow extends Component {

    render () {
        const { Cell, Row } = Table
        const { 
            value,
            approvalCount,
            description,
            recipient
        } = this.props.request


        return (
            <Row>
                <Cell>
                    {this.props.id}
                </Cell>
                <Cell>
                    {description}
                </Cell>
                <Cell>
                    {web3.utils.fromWei(value, 'ether')}
                </Cell>
                <Cell>
                    {recipient}
                </Cell>
                <Cell>
                    {approvalCount}
                </Cell>
                <Cell>
                    {this.key}
                </Cell>
                <Cell>
                    {this.key}
                </Cell>
            </Row>
        )
    }
}

export default RequestRow