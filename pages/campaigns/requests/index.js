import React, { Component } from 'react'
import Layout from './../../../components/Layout'
import { Button, Table } from 'semantic-ui-react'
import { Link } from './../../../routes'
import Campaign from './../../../ethereum/campaign'
import RequestRow from './../../../components/RequestRow'

class RequestIndex extends Component {

    static async getInitialProps(props) {
        const { campaignAddress } = props.query
        const campaign = Campaign(campaignAddress)
        const requestCount = await campaign.methods.getRequestsCouunt().call()

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        )

        console.log(requests)

        return { campaignAddress, requests, requestCount }
    }

    renderRequests() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                address={this.props.address}
                id={index}
                key={index}
                request={request}
            />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body} = Table

        return (
            <Layout>
                <h3>Request list</h3>
                <Link route={`/campaigns/${this.props.campaignAddress}/requests/new`}>
                    <a>
                        <Button primary>Add request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRequests()}
                    </Body>
                </Table>
            </Layout>
        )
    }
}

export default RequestIndex