import { useEffect, useState } from 'react';
import { BaseURL } from '../App';
import { Table } from './Table';

export const FetchWithPolling = () => {
  const [stockPrices, setStockPrices] = useState([]);

  const fetchStockPrice = () => {
    fetch(`${BaseURL}/realtime-price-polling`).then((res) => res.json().then((result) => setStockPrices(result.data)));
  };

  useEffect(() => {
    fetchStockPrice();
    const pollingInterval = setInterval(() => {
      fetchStockPrice();
    }, 5000); // poll every 5 seconds

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <div>
      <h1>Polling</h1>
      <Table stockPrices={stockPrices} />
    </div>
  );
};
