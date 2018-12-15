import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Layout from './../../components/Layout'
import factory from './../../ethereum/factory'
import web3 from './../../ethereum/web3'

class CampaignNew extends Component {

    state = {
        errorMessage: '',
        loading: false,
        minimumContribution: ''
    }

    onSubmit = async (event) => {
        event.preventDefault()

        this.setState({ 
            errorMessage: '',
            loading: true
        })

        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                })
            // ensure error message is empty, things went okay
            this.setState({ errorMessage: '' })
        } catch (err) {
            // error occured creating campaign
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <Layout>
                <h3>Create a campaign</h3>
                <Form
                    error={!!this.state.errorMessage}
                    onSubmit={this.onSubmit}
                >
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                            value={this.state.minimumContribution}
                        />
                    </Form.Field>

                    <Message
                        error
                        header="Error.."
                        content={this.state.errorMessage}
                    />
                    <Button
                        loading={this.state.loading}
                        primary
                    >Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew