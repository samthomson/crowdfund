import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import Layout from '../components/Layout'

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        console.log('found campaigns')
        console.log(campaigns)

        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open campaigns</h3>
                    <Button
                        floated="right"
                        content="Create campaign"
                        icon="add circle"
                        primary
                    />
                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex