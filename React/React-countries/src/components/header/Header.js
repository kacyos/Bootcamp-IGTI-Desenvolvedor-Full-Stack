import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers';

import css from './header.module.css';

export default class Header extends Component {
    handleInputChange = (event) => {
        const newText = event.target.value;
        this.props.onChangeFilter(newText);
    };

    render() {
        const { filter, countryCount, totalPopulation } = this.props

        return (
            <div className={css.flexRow}>
                <div className={css.divInfo}>
                    <span className={css.info}>
                        Total de países: <strong>{countryCount}</strong>
                    </span>
                    <span className={css.info}>
                        População: <strong>{formatNumber(totalPopulation)}</strong>
                    </span>
                </div>

                <input placeholder="Filtro" type="text" value={filter} onChange={this.handleInputChange} />

            </div>
        )
    }
}
