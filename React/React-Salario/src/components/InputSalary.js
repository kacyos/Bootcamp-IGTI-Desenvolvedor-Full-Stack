import React, { Component } from 'react'

export default class CalculateSalary extends Component {
    render() {
        const { name } = this.props
        return (
            <div>
                <label> {name}
                    <input
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </label>

            </div>
        )
    }
}
