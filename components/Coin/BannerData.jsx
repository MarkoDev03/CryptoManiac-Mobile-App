import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Chart from "./Chart";
import { useSelector } from "react-redux";
import HeaderBanner from "./HeaderBanner";
import BannerContainers from "./BannerContainers";
import CommunityData from "./CommunityData";
import Votes from "./Votes";
import PriceChange from "./PriceChange";
import CoinItem from "./CoinItem";
import HeaderBannerItems from "./HeaderBannerItems";
import Ranks from "./Ranks";
import { getCoinDetails } from "../../services/request";

export default function BannerData({ coin, percentageDailyColor, price, arrow, percentageDaily, currencySymbol, chartData, sparkline, victorySparkline }) {

  const currencyAPI = useSelector((state) => state.priceReducer.selectedItems.api);

  const [coinsData, setCoinsData] = useState({
    sentiment_votes_up_percentage:0, 
    sentiment_votes_down_percentage:0,
    market_cap_rank: 0,
    coingecko_rank: 0,
    coingecko_score: 0,
    developer_score: 0,
    community_score: 0,
    liquidity_score: 0,
    market_cap_rank: 0,
    coingecko_rank: 0,
    public_interest_score: 0,
    market_data: {
        price_change_percentage_24h: 0,
        price_change_percentage_7d: 0,
        price_change_percentage_14d: 0,
        price_change_percentage_30d: 0,
        price_change_percentage_60d: 0,
        price_change_percentage_200d:0,
        price_change_percentage_1y: 0,
    },
  community_data: {
    facebook_likes:0,
    twitter_followers:0,
    reddit_subscribers:0,
  }
  })


  const getCoinDetailsFunc = async () => {
    const data = await getCoinDetails(coin.id)
    setCoinsData(data)
 }

 
useEffect(() => {
  getCoinDetailsFunc()
}, [coin.id])
   
  return (
    <ScrollView
       showsVerticalScrollIndicator={false}
         style={{
           width: "100%",
           backgroundColor:"#191919",
        }}
    >

    <HeaderBanner percentageDailyColor={percentageDailyColor} coin={coin} price={price} currencySymbol={currencySymbol} percentageDaily={percentageDaily} arrow={arrow} />

    <HeaderBannerItems coin={coin} price={price} currencyAPI={currencyAPI} currencySymbol={currencySymbol} />

    <Chart coin={coin} color={percentageDailyColor} currencySymbol={currencySymbol} chartData={chartData} sparkline={sparkline} victorySparkline={victorySparkline} />
 
    <CoinItem coin={coin} percentageDailyColor={percentageDailyColor} />

    <BannerContainers coin={coin} coinsData={coinsData} currencySymbol={currencySymbol} />

    <Votes coinsData={coinsData} />

    <PriceChange coinsData={coinsData} />

    <CommunityData coinsData={coinsData} />

    <Ranks coinsData={coinsData} />

    </ScrollView>
  );
}
