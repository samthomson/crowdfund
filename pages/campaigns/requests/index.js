import React, { Component } from 'react'
import Layout from './../../../components/Layout'
import { Button } from 'semantic-ui-react'
import { Link } from './../../../routes'


class RequestIndex extends Component {

    static async getInitialProps(props) {
        const { campaignAddress } = props.query

        return { campaignAddress }
    }

    render() {
        return (
            <Layout>
                <h3>Request list</h3>
                <Link route={`/campaigns/${this.props.campaignAddress}/requests/new`}>
                    <a>
                        <Button primary>Add request</Button>
                    </a>
                </Link>
            </Layout>
        )
    }
}

export default RequestIndex