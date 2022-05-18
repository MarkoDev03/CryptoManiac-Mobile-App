import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

export default function ChartBottom({ coin, currencySymbol, color }) {

  const supply = isNaN(coin.circulating_supply / coin.total_supply) ? 0 : coin.circulating_supply / coin.total_supply;

  return (
    <View style={{width:"100%", justifyContent:"space-between", alignItems:"center", paddingHorizontal:5, flexDirection:"row", marginTop:10}}>
    <View style={{justifyContent:"flex-start", alignItems:"flex-start"}}>
    <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:5}}>
    <View style={{width:150, height:50, borderTopLeftRadius:20, borderTopRightRadius:20, justifyContent:"center", alignItems:"center", backgroundColor:"#16c784", marginBottom:3}}>
          <Text style={{fontWeight:"bold", color:"white", fontSize:15}}>24h High</Text>
          <Text style={{color:"white", marginTop:-2}}>{coin.high_24h ? currencySymbol + coin.high_24h : "N/A"}</Text>
      </View>
      <View style={{width:150, height:50,borderBottomLeftRadius:20, borderBottomRightRadius:20, justifyContent:"center", alignItems:"center", backgroundColor:"#FA0A32", shadowColor: '#171717'}}>
          <Text style={{fontWeight:"bold", color:"white", fontSize:15}}>24h Low</Text>
          <Text style={{color:"white", marginTop:-2}}>{coin.low_24h ? currencySymbol + coin.low_24h : "N/A"}</Text>
      </View>
    </View>
    </View>

   <View style={{width:160, height:160, borderRadius:100, justifyContent:"center", alignItems:"center", backgroundColor:"#302f2f"}}>
   <View style={{width:90, height:90, borderRadius:50, justifyContent:"center", alignItems:"center"}}>
   <CircularProgress value={supply == Infinity ? 0.0 : supply * 100}
              maxValue={100}
              radius={76}
              titleStyle={{color:"#eee", marginTop:-9}}
              textColor={'#ecf0f1'}
              activeStrokeColor={'#16c784'}
              inActiveStrokeColor={'#0f0f0f'}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={26}
              activeStrokeWidth={15}
              valueSuffix="%"
              textStyle={{fontSize:22}}
              title="Supply"
              duration={500}
       />
   </View>
   </View>

   </View>
  )
}