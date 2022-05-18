import axios from "axios";

const formatSparkline = (numbers) => {

    let formattedSparkline = numbers.map((item, index) => {
      return {
        timestamp: index,
        value: item,
      }
    })
  
    return formattedSparkline;
  }

const formatSparklineVictory = (numbers) => {

  let formattedSparkline = numbers.map((item, index) => {
    return {
      x: index,
      y: item,
    }
  })

  return formattedSparkline;
}
  
  const formatMarketData = (data) => {
    let formattedData = [];
  
    data.forEach((item, index) => {
      const formattedSparkline = formatSparkline(item.sparkline_in_7d.price, index)
      const victorySparkline = formatSparklineVictory(item.sparkline_in_7d.price)
  
      const formattedItem = {
        ...item,
        sparkline_in_7d: {
          price: formattedSparkline
        },
        victorySparkline:victorySparkline
      }
  
      formattedData.push(formattedItem);
    });
  
    return formattedData;
  }

export const getCoinsByPageNumber = async (pageNumber = 1, hour = "24h", order = "market_cap_desc", currency = "usd") => {
    try { 
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=30&page=${pageNumber}&sparkline=true&price_change_percentage=${hour}`);

        const formattedResponse = formatMarketData(data);
        return formattedResponse;
    } catch(error) {
      console.log(error)
        return error;
    }
}

export const coinWebSocket = async (id) => {
    try { 
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        return data;
    } catch(error) {
        return error;
    }
}

export const getCoinDetails = async (coin) => {
  try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`)
      return data
  } catch(error) {
    return error
  }
}