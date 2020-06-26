import React, { Component } from 'react'
import css from './countries.module.css'

export default class Country extends Component {
    render() {
        const { country } = this.props;

        return (
                <div className={`${css.border} ${css.flexRow}`}>
                    <img src={country.flag} alt={country.name} />
                    <span className={css.title}>{country.name}</span>
                    <span>População: {country.population}</span>
                </div>
        )
    }
}
