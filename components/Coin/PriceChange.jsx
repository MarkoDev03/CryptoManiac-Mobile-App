import { View, Text } from 'react-native'
import React from 'react'
import AntIcon from "react-native-vector-icons/AntDesign"

export default function PriceChange({ coinsData }) {

    let change24h = coinsData.market_data.price_change_percentage_24h ? coinsData.market_data.price_change_percentage_24h.toFixed(1) : 0;
    let change7d = coinsData.market_data.price_change_percentage_7d ? coinsData.market_data.price_change_percentage_7d.toFixed(1) : 0;
    let chagne14d = coinsData.market_data.price_change_percentage_14d ? coinsData.market_data.price_change_percentage_14d.toFixed(1) : 0;
    let chagne30d = coinsData.market_data.price_change_percentage_30d ? coinsData.market_data.price_change_percentage_30d.toFixed(1) : 0;
    let chagne60d = coinsData.market_data.price_change_percentage_60d ? coinsData.market_data.price_change_percentage_60d.toFixed(1) : 0;
    let chagne200d = coinsData.market_data.price_change_percentage_200d ? coinsData.market_data.price_change_percentage_200d.toFixed(1) : 0;
    let chagne1y = coinsData.market_data.price_change_percentage_1y ? coinsData.market_data.price_change_percentage_1y.toFixed(1) : 0;
  
    const priceChanegData = [
      {title:"24h", value: change24h, color:change24h > 0 ? "#16c784" : "#FA0A32", arrow:change24h > 0 ? true : false },
      {title:"7d", value: change7d, color:change7d > 0 ? "#16c784" : "#FA0A32", arrow:change7d > 0 ? true : false },
      {title:"14d", value: chagne14d, color:chagne14d > 0 ? "#16c784" : "#FA0A32", arrow:chagne14d > 0 ? true : false },
      {title:"30d", value: chagne30d, color:chagne30d > 0 ? "#16c784" : "#FA0A32", arrow:chagne30d > 0 ? true : false },
      {title:"60d", value: chagne60d, color:chagne60d > 0 ? "#16c784" : "#FA0A32", arrow:chagne60d > 0 ? true : false },
      {title:"200d", value: chagne200d, color:chagne200d > 0 ? "#16c784" : "#FA0A32", arrow:chagne200d > 0 ? true : false },
      {title:"1y", value: chagne1y, color:chagne1y > 0 ? "#16c784" : "#FA0A32", arrow:chagne1y > 0 ? true : false },
    ]

  return (
    <View style={{width:"100%", justifyContent:"center", alignItems:"center", marginTop:15}}>
    <View style={{width:"97%", justifyContent:"flex-start", alignItems:"flex-start"}}> 
        <Text style={{color:"white", fontSize:20, marginLeft:10}}>Price change percentage</Text>
    </View>
    <View
     style={{width:"97%", justifyContent:"center", paddingHorizontal:10 ,alignItems:"center", marginTop:6, flexDirection:"row", backgroundColor:"#302f2f", borderRadius:20, paddingVertical:7}}>
        {
          priceChanegData.map((priceData) => (
            <View style={{justifyContent:"center", alignItems:"center", width:"14%", marginVertical:15}} key={priceData.title}>
                 <Text style={{color:"white", fontWeight:"bold"}}>{priceData.title}</Text>
                 <View style={{width:"100%", height:1, backgroundColor:"#5e5c5c", marginVertical:10}}></View>
                 <View style={{alignItems:"center", justifyContent:"center"}}>
                 <AntIcon
                    name={priceData.arrow == false ? "caretdown" : "caretup"}
                    size={18}
                    color={priceData.color}
                   style={{ alignSelf: "center", marginBottom: 1 }}
                />
                  <Text style={{color:priceData.color, fontSize:12}}>{priceData.value}%</Text>
                 </View>
            </View>
          ))
        }
    </View>
    </View>
  )
}