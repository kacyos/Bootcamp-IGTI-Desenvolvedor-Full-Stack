import React, { Component } from 'react';

import CalculateSalary from './components/InputSalary';
import InputDiscounts from './components/InputDiscounts';
import { calculateSalaryFrom } from './components/helpers/CalculateDiscounts';
import { formatValue, percentFormat } from './components/helpers/format';
import InputBar from './components/InputBar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      grossSalary: 0,
      baseINSS: "R$ 0,00",
      discountINSS: "R$ 0,00",
      baseIRPF: "R$ 0,00",
      discountIRPF: "R$ 0,00",
      netSalary: "R$ 0,00",
      inssDiscountPercentage: "0%",
      netSalaryPercentage: "0%",
      irpfDiscountPercentage: "0%",
      barINSS: 0,
      barNetSalary: 0,
      barIRPF: 0,
    };
  }

  handleInputGrossSalary = (event) => {
    const value = calculateSalaryFrom(event.target.value);

    if (value !== undefined) {

      this.setState({
        baseINSS: formatValue(value.baseINSS),
        discountINSS: formatValue(value.discountINSS),
        baseIRPF: formatValue(value.baseIRPF),
        discountIRPF: formatValue(value.discountIRPF),
        netSalary: formatValue(value.netSalary),
        inssDiscountPercentage: percentFormat(value.inssDiscountPercentage),
        netSalaryPercentage: percentFormat(value.netSalaryPercentage),
        irpfDiscountPercentage: percentFormat(value.irpfDiscountPercentage),
        barINSS: value.inssDiscountPercentage,
        barNetSalary: value.netSalaryPercentage,
        barIRPF: value.irpfDiscountPercentage,
      });
    } else {
      this.setState({
        grossSalary: 0,
      })
    }
  }

  render() {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      inssDiscountPercentage,
      netSalaryPercentage,
      irpfDiscountPercentage,
      barINSS,
      barNetSalary,
      barIRPF
    } = this.state;

    return (
      <div>
        <h1 className="center">React Salário</h1>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <CalculateSalary
                  onChange={this.handleInputGrossSalary}
                  value={this.grossSalary}
                  name="Salário bruto"
                />
              </div>
              <div className="input-field col s3">
                <InputDiscounts
                  value={baseINSS}
                  font="bold"
                  name="Base INSS:"
                />
              </div>
              <div className="input-field col s3">
                <InputDiscounts
                  value={`${discountINSS}    (${inssDiscountPercentage})`}
                  color="#e67e22"
                  font="bold"
                  name="Desconto INSS:"
                />
              </div>
              <div className="input-field col s3">
                <InputDiscounts
                  value={baseIRPF}
                  font="bold"
                  name="Base IRPF:"
                />
              </div>
              <div className="input-field col s3">
                <InputDiscounts
                  value={`${discountIRPF}    ${irpfDiscountPercentage}`}
                  color="#c0392b"
                  font="bold"
                  name="Desconto IRPF:"
                />
              </div>
              <div className="input-field col s3">
                <InputDiscounts
                  value={`${netSalary}    ${netSalaryPercentage}`}
                  color="#16a085"
                  font="bold"
                  name="Salário líquido:"
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto"
                }}              >

                <InputBar value={barINSS} color="#e67e22" />
                <InputBar value={barIRPF} color="#c0392b" />
                <InputBar value={barNetSalary} color="#16a085" />
              </div>
            </div>
          </form>
        </div >
      </div>
    );
  }
}