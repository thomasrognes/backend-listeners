import { useState } from 'react';
import { useEffect } from 'react';
import { BaseURL } from '../App';
import { Table } from './Table';

export const ServerSentEvents = () => {
  const [stockPrices, setStockPrices] = useState([]);

  const fetchStockPrice = () => {
    fetch(`${BaseURL}/stocks`)
      .then((res) => res.json())
      .then((result) => setStockPrices(result.data));
  };

  const updateStockPrices = (data) => {
    const parsedData = JSON.parse(data);
    setStockPrices((stockPrices) =>
      [...stockPrices].map((stock) => {
        if (stock.id === parsedData.id) {
          return parsedData;
        }
        return stock;
      })
    );
  };

  useEffect(() => {
    fetchStockPrice();
    const eventSource = new EventSource(`${BaseURL}/realtime-price`);
    eventSource.onmessage = (e) => {
      updateStockPrices(e.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server Sent Events</h1>
      <Table stockPrices={stockPrices} />
    </div>
  );
};
