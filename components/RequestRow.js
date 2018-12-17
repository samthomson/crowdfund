import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import web3 from './../ethereum/web3'
import Campaign from './../ethereum/campaign'

class RequestRow extends Component {

    onApprove = async () => {
        const campaign = Campaign(this.props.address)
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    onFinalize = async () =>{
        const campaign = Campaign(this.props.address)
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    render () {
        const { Cell, Row } = Table
        const { 
            complete,
            value,
            approvalCount,
            description,
            recipient
        } = this.props.request
        const { 
            approversCount,
            id
        } = this.props
        const readyToFinalise = (approvalCount >= approvalCount / 2) && !complete



        return (
            <Row disabled={complete} positive={readyToFinalise}>
                <Cell>
                    {id}
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
                    {approvalCount} / {approversCount}
                </Cell>
                <Cell>
                    {complete ? null : ( 
                        <Button
                            basic
                            color="green"
                            onClick={this.onApprove}
                        >Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {complete ? null : ( 
                        <Button
                            basic
                            color="teal"
                            onClick={this.onFinalize}
                        >Finalise</Button>
                    )}
                </Cell>
            </Row>
        )
    }
}

export default RequestRow