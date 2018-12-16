import React, { Component } from 'react'
import Layout from './../../components/Layout'
import Campaign from './../../ethereum/campaign'
import { Card } from 'semantic-ui-react';

class ShowCampaign extends Component {

    static async getInitialProps(props) {
        // put url var
        const campaign = Campaign(props.query.campaignAddress)

        const summary = await campaign.methods.getSummary().call()

        console.log(summary)
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            managerAddress: summary[4]
        }
    }

    renderCards() {
        const { 
            balance,
            managerAddress,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props

        const items = [
            {
                header: managerAddress,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word'}
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign</h3>
                {this.renderCards()}
            </Layout>
        )
    }
}

export default ShowCampaign