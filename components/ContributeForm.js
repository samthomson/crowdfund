import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from './../ethereum/campaign'

class ContributeForm extends Component {

    state = {
        value: ''
    }

    onSubmit = event => {
        event.preventDefault()

        const campaign = Campaign(this.props.address)
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Ammount to contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Button primary>
                    Contribute
                </Button>
            </Form>
        )
    }
}

export default ContributeForm