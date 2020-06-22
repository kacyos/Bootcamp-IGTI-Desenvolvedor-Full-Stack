function formatValue(value) {
    return Intl.NumberFormat('pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        }).format(value);


}

function percentFormat(value) {
    if (value > 0) {
        return `${ parseFloat(value).toFixed(2).replace(".", ",")}%`;
    } else{
        return "0%"
    }
    
}
export { formatValue, percentFormat };