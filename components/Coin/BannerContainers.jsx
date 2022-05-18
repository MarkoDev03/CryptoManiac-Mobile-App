import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BannerContainer from './BannerContainer'
import moment from "moment";

export default function BannerContainers({ coin, currencySymbol, coinsData }) {

  let capChangePercentage = parseFloat(coin.market_cap_change_percentage_24h ? coin.market_cap_change_percentage_24h : 0).toFixed(2)
  let ath = parseFloat(coin.ath_change_percentage ? coin.ath_change_percentage : 0).toFixed(2)
  let atl = parseFloat(coin.atl_change_percentage ? coin.atl_change_percentage : 0).toFixed(2)
  let capChange = parseFloat(coin.market_cap_change_24h ? coin.market_cap_change_24h : 0).toFixed(2)

  let fullyDilutedValuation = coin.fully_diluted_valuation ? currencySymbol + coin.fully_diluted_valuation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"
  let marketCap = coin.market_cap ? currencySymbol + coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"
  let totalVolume = coin.total_volume ? currencySymbol + coin.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"
  let totalSupply = coin.total_supply ? coin.total_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"
  let maxSupply = coin.max_supply ? coin.max_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"
  let availableSupply = coin.total_supply && coin.circulating_supply ? (coin.total_supply - coin.circulating_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"

  const pricesOnMarket = [
    {title:"Market Cap", value: marketCap, color:"white", isPercentage: false, border:true},
    {title:"Market Cap Change 24h", value: currencySymbol + capChange, color:capChange > 0 ? "#16c784" : "#FA0A32", isPercentage: false, border:true},
    {title:"Market Cap Change Percentage 24h", value:  capChangePercentage, color:capChangePercentage > 0 ? "#16c784" : "#FA0A32", isPercentage: true, arrow:capChangePercentage > 0 ? true : false, border:true},
    {title:"Total Volume", value: totalVolume, color:"white", isPercentage: false, border:true},
    {title:"Fully Diluted Valuation", value: fullyDilutedValuation, color:"white", isPercentage: false, border:true},
    {title:"Total Supply", value:totalSupply, color:"white", isPercentage: false, border:true},
    {title:"Max Supply", value:maxSupply, color:"white", isPercentage: false, border:true},
    {title:"Available Supply", value:availableSupply, color:"white", isPercentage: false, border:false},
  ]

  const scores = [
    {title:"Coingecko score", value:coinsData.coingecko_score ? coinsData.coingecko_score : "N/A", isPercentage:false, color:"white", border:true},
    {title:"Developer score", value:coinsData.developer_score ? coinsData.developer_score : "N/A", isPercentage:false, color:"white", border:true},
    {title:"Community score", value:coinsData.community_score ? coinsData.community_score : "N/A", isPercentage:false, color:"white", border:true},
    {title:"Liquidity score", value:coinsData.liquidity_score ? coinsData.liquidity_score : "N/A", isPercentage:false, color:"white", border:true},
    {title:"Public interest score", value:coinsData.public_interest_score ? coinsData.public_interest_score : "N/A", isPercentage:false, color:"white", border:false},
  ]

  let athVal = coin.ath ? currencySymbol + coin.ath : "N/A"
  let atlVal = coin.atl ? currencySymbol + coin.atl : "N/A"

  let athDate = coin.ath_date ? moment(new Date(coin.ath_date)).format('LL') : "N/A"
  let atlDate = coin.atl_date ? moment(new Date(coin.atl_date)).format('LL') : "N/A"

  const at = [
    {title:"ATH", value: athVal, color:"white", isPercentage: false, border:true},
    {title:"ATL", value: atlVal, color:"white", isPercentage: false, border:true},
    {title:"ATH Change Percentage 24h", value:  ath, color:ath > 0 ? "#16c784" : "#FA0A32", isPercentage: true, border:true},
    {title:"ATL Change Percentage 24h", value:  atl, color:atl > 0 ? "#16c784" : "#FA0A32", isPercentage: true, border:true},
    {title:"ATH date", value:athDate, color: "white", isPercentage: false, border:true},
    {title:"ATL date", value: atlDate, isPercentage: false,  border:false, color: "white"},
  ]

  const renderButtons = [
    {title:"Market & Supply", data:pricesOnMarket},
    {title:"Scores", data:scores},
    {title:"All time Low & High", data:at},
  ]

  const setDataRender = (title, items) => {
    setHeadline(title)
    setRender(items)
  }

  const [render, setRender] = useState(pricesOnMarket);
  const [headline, setHeadline] = useState("Market & Supply");

  const RenderButton = ({ item }) => {
    return (
       <TouchableOpacity
         style={{
           paddingHorizontal:8,
           paddingVertical:5,
           borderRadius:25,
           backgroundColor:item.title == headline ? "white" : "#302f2f",
           justifyContent:"center",
           alignItems:"center",
           margin:0
         }}
         onPress={() => {setDataRender(item.title, item.data)}}
       >
          <Text style={{fontSize:15, color:item.title == headline ? "black" : "white"}}>{item.title}</Text>
       </TouchableOpacity>
    )
  }

  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
     <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
     <View  
      style={{width:"97%", backgroundColor:"#302f2f", borderRadius:20, paddingHorizontal:5, 
       justifyContent:"space-between", alignItems:"center", flexDirection:"row", marginTop:20, marginBottom:9, paddingBottom:5, paddingTop:5}} >
            {
              renderButtons.map((data) => (
                <RenderButton item={data} key={data.title} />
              ))
            }
      </View>
     </View>

     <View style={{width:"100%", justifyContent:"center", alignItems:"center", marginTop:6}}>
     <View style={{width:"97%", justifyContent:"flex-start", alignItems:"flex-start"}}> 

      </View>
      <View
       style={{width:"97%", justifyContent:"center", alignItems:"center", marginTop:6, borderRadius:20, backgroundColor:"#302f2f", paddingHorizontal:0,}}
       >
         {
           render.map((item) => (
             <BannerContainer item={item} key={item.title} />
           ))
         }
      </View>
      </View>
    </View>
  )
}