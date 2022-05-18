import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import ChartBottom from "./ChartBottom";
import {VictoryLine } from "victory-native";

export default function Chart({ color, coin, currencySymbol, chartData , sparkline, victorySparkline}) {

  const [data, setData] = useState(victorySparkline)
  const [period, setPeriod] = useState("24h")
  const apiCurrency = useSelector((state) => state.priceReducer.selectedItems.api);

  async function getData() {
		try {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${coin.name.toLowerCase()}/market_chart?vs_currency=${apiCurrency}&days=${period}`
			)
			const formatData = response.data.prices.map(function(i) {
				return {
					x:i[0],
					y: i[1],
				}
			})
			setData(formatData)
		} catch (error) {
      if (error.response) {
        setData(victorySparkline)
      }
		}
	}

  useLayoutEffect(
		() => {
			setData(victorySparkline);
		},
		[]
	)

  useLayoutEffect(
		() => {
			getData()
		},
		[  period ]
	)

  const Hour = ({ item }) => {
    return (
      <TouchableOpacity 
        style={{
          borderRadius:23,
          backgroundColor:item.value === period ? "#16c784" : "transparent",
          marginRight:5,
          paddingVertical:7,
          width:55,
          justifyContent:"center",
          alignItems:"center"
        }}
        onPress={() => {setPeriod(item.value)}}
      >
        <Text style={{color:period === item.value ? "white" : "#d4cdcd", fontWeight:"bold"}}>{item.hour}</Text>
      </TouchableOpacity>
    )
  }
  const { width: SIZE } = Dimensions.get('window');

  const hours = [
    {hour:"TDY", value:"24h"},
    {hour:"7D", value:7},
    {hour:"1M", value:30},
    {hour:"3M", value:90},
    {hour:"1Y", value:365},
    {hour:"MAX", value:"max"},
  ];

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        backgroundColor:"#191919",
        paddingBottom:0,
        paddingHorizontal:0
      }}
    >
      {data.length > 0 && data != [] ? (
       
        <VictoryLine
        data={data}
            style={{
                 data: { stroke: color,
                 strokeWidth: 1}
           }}
          width={SIZE - 15}
         domainPadding={5}
         padding={5}
         animate={{
          duration: 800,
          onLoad: { duration: 800 },
        }}
         />
        
      ) : (
        <></>
      )}
  
        <ChartBottom coin={coin} currencySymbol={currencySymbol} color={color}  />
        <FlatList showsHorizontalScrollIndicator={false} data={hours} renderItem={Hour} keyExtractor={(item) => item.hour} horizontal={true} style={{width:"97%", marginVertical:9, backgroundColor:"#302f2f", paddingVertical:5, borderRadius:20, paddingHorizontal:5, marginHorizontal:10, marginBottom:0, marginTop:12}} />
    </View>

  );
}
