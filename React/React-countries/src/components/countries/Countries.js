import React, { Component } from 'react'
import Country from './Country';
import css from './countries.module.css'

export default class Countries extends Component {
    render() {
        const {countries} = this.props;

        return (
            <div className={css.border}>
                <ul>
                    {
                        countries.map(country => {
                        return <li className={css.countriesFormat} key={country.id}><Country country={country}/></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
