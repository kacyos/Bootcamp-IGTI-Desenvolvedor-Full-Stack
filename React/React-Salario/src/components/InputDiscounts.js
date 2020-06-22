import React, { Component } from 'react'

export default class InputDiscounts extends Component {
    render() {
        const { name, font, color = '#000' } = this.props;
        return (
            <div>
                <label>{name}
                    <input
                        readOnly
                        type="text"
                        value={this.props.value}
                        onChange={this.value}
                        style={{
                            color: color,
                            fontWeight: font
                        }}
                    />
                </label>
            </div>
        )
    }
}
