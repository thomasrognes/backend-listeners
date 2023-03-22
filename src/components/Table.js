import React from 'react';

export const Table = (props) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('us-EN', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(price);
  };

  return (
    <table>
      <caption>Stock Prices</caption>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Ticker Symbol</th>
          <th>Real Time Price</th>
        </tr>
      </thead>
      <tbody>
        {props.stockPrices.map(({ id, ticker, price }, index) => (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{ticker}</td>
            <td>{formatPrice(price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
