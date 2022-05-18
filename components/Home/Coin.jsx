import { View, Text, StyleSheet, Image, Modal, StatusBar, TouchableNativeFeedback} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import AntIcon from "react-native-vector-icons/AntDesign";
import BannerData from '../Coin/BannerData';
import { VictoryLine } from "victory-native";
import Swipeable from "react-native-gesture-handler/Swipeable"
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux"

export function Coin({ coin, id, sparkline, index, currencyWebSocket, chartData }) {

let cwss = useSelector((state) => state.priceReducer.selectedItems.value);

const [price, setPirce] = useState(coin.current_price);
const [lastPrice, setLastPrice] = useState(coin.current_price);
const [percentageDaily, setPercentageDaily] = useState(parseFloat(coin.price_change_percentage_24h).toFixed(2));
const [percentageDailyColor, setPercentageDailyColor] = useState(lastPrice > price ? "#FA0A32": "#16c784");
const [color, setColor] = useState("#fff");
const [arrow, setArrow] = useState(true);
const [modalShow, setModalShow] = useState(false);

useLayoutEffect(() => {
    connectToWebSocket(cwss)
}, [cwss, id])

    const currencySymbol = useSelector((state) => state.priceReducer.selectedItems.symbol);

    const connectToWebSocket = (valute) => {
        let webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${id}${valute}@ticker`);

        let lastPriceDef = null;
        let lastPercentage = null;
        setLastPrice(null)

        webSocket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          let price = data.a > 1000 ? parseFloat(data.a).toFixed(0) : data.a < 1000 ? parseFloat(data.a).toFixed(3) : parseFloat(data.a).toFixed(6);
          let priceDef = data.a > 1000 ? parseFloat(data.a).toFixed(0) : data.a < 1000 ? parseFloat(data.a).toFixed(3) : parseFloat(data.a).toFixed(6);
          let percentage = parseFloat(data.P).toFixed(2);

          
          if (parseFloat(lastPriceDef) != parseFloat(priceDef) && parseFloat(percentage) !== parseFloat(lastPercentage)) {

              setPirce(price)
              setPercentageDaily(parseFloat(percentage).toFixed(2));
              
        if (lastPriceDef > priceDef) {
            setColor("#FA0A32")
            setPercentageDailyColor("#FA0A32")
            setArrow(false)
    
            setTimeout(() => {
                setColor("white")  
            }, 2500);
        } 
    
        if (lastPriceDef < priceDef) {
            setColor("#16c784")
            setPercentageDailyColor("#16c784")
            setArrow(true)
    
            setTimeout(() => {
                setColor("white")  
            }, 2500);
    
            if (percentageDaily < 0) {
                setTimeout(() => {
                    setPercentageDailyColor("#FA0A32")
                    setArrow(false) 
                }, 2500);
            }
        }
    } else {
        if (priceDef === lastPriceDef) {
            setColor("white")
    
            if (lastPrice > priceDef) {
                setPercentageDailyColor("#FA0A32")
                setArrow(false)
            } 
            if (lastPriceDef < priceDef) {
                setPercentageDailyColor("#16c784")
                setArrow(true)
    
                if (percentageDaily < 0) {
                    setTimeout(() => {
                        setPercentageDailyColor("#FA0A32")
                        setArrow(false) 
                    }, 2500);
                }
            }
        }
    }

    
    lastPriceDef = price;
    lastPercentage = percentage;
    setLastPrice(lastPriceDef)
   }

    }

    const styles = StyleSheet.create({
        coin: {
            backgroundColor: "#181c1b",
            borderRadius: 10,
            marginTop: 2,
            width: "100%",
            padding: 5,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection:"row",
            paddingVertical:7,
            paddingHorizontal:0
        },
        textBlock: {
            justifyContent: "flex-start",
            alignItems: 'flex-start'
        },
        textOne: {
            fontSize: 14,
            color: "white",
            fontWeight: 'bold',
            marginBottom:5
        },
        textTwo: {
            color: "#6b706c",
            fontSize: 10,
            maxWidth:"100%", 
        },
        textSymbol: {
            color: "#6b706c",
            fontSize: 10,
            maxWidth:80, 
        },
        wrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width:"30%",
        },
        secondWrapper: {
           flexDirection:"column",
           justifyContent:"flex-end",
           alignItems:"flex-end",
        },
        image: {
          width:45,
          height:45,
          marginRight:10,
          borderRadius:9
        },
        circle: {
            backgroundColor:"#444",
            borderRadius:3,
            justifyContent:"center",
            alignItems:"center",
            marginRight:3,
            padding:3,
            paddingVertical:0,
        },
        textBlockInline: {
            justifyContent:"flex-start",
            alignItems:"center",
            flexDirection:"row",

        },
        pricePercentage: {
            color:percentageDailyColor,
            marginLeft:1,
            fontSize:12, 
        },
        textBlockInlineIcons: {
            justifyContent:"center",
            flexDirection:"row",
            alignItems:"center",
            marginLeft:6
        },
        textWhite: {
            fontSize: 14,
            color: "white",
        },
        bold: {
            fontWeight:"bold",
            fontSize:14,
            color:color,
            marginRight:3
        },
        cap_rank: {
            color: "white",
            maxWidth: "100%",
            fontSize: 15,
            backgroundColor: "#444",
            borderRadius: 3,
            padding: 2,
            paddingVertical: 0,
        },
        symbol: {
            color: "#fff",
            maxWidth: "100%",
            fontWeight: "bold",
            fontSize: 18,
            marginHorizontal: 3
        }
    });

    const CL = () => (
        <VictoryLine
        style={{
             data: { stroke: percentageDailyColor,
             strokeWidth: .5}
       }}
     width={65}
     height={30}
     domainPadding={0}
     padding={0}
     data={sparkline}
    />
    )

    const normalizeMarketCap = (marketCap) => {
        if (marketCap > 1e12) {
          return `${(marketCap / 1e12).toFixed(3)} T`;
        }
        if (marketCap > 1e9) {
          return `${(marketCap / 1e9).toFixed(3)} B`;
        }
        if (marketCap > 1e6) {
          return `${(marketCap / 1e6).toFixed(3)} M`;
        }
        if (marketCap > 1e3) {
          return `${(marketCap / 1e3).toFixed(3)} K`;
        }
        return marketCap;
      };

      const supply = coin.circulating_supply / coin.total_supply ? coin.circulating_supply / coin.total_supply : 0.0;

      const leftActivity = () => {
          return (
              <View style={{ backgroundColor: '#2b2e2b', justifyContent: 'space-between', flexDirection:"row",alignItems:"center", flex:1, borderRadius:13, marginTop:3, paddingHorizontal:5}}>
                <View style={styles.textBlock}>
                    <Text style={styles.textOne}>Total Volume</Text>
                 <Text style={{color:"#838a83", marginTop:-8}}>{coin.total_volume ? currencySymbol + coin.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "N/A"}</Text>
                 </View>
                 <View style={styles.textBlock}>
                    <Text style={styles.textOne}>24h High</Text>
                 <Text style={{color:"#16c784", marginTop:-8}}>{coin.high_24h ? currencySymbol + coin.high_24h : "N/A"}</Text>
                 </View>
                 <View style={styles.textBlock}>
                    <Text style={styles.textOne}>24h Low</Text>
                 <Text style={{color:"#FA0A32", marginTop:-8}}>{coin.low_24h ? currencySymbol + coin.low_24h : "N/A"}</Text>
                 </View>
                 <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
                    <Text style={styles.textOne}>Supply</Text>
                     <View style={{width:5, height:1}}></View>
                    <Progress.Circle progress={supply == Infinity || isNaN(supply)? 0.0 : supply} textStyle={{fontSize:12}} size={40} indeterminate={false} animated={false} unfilledColor="gray" borderColor='#2b2e2b' showsText={true} />
                 </View>
              </View>
          )
      }

    return (
        <Swipeable renderLeftActions={leftActivity} onSwipeableRightOpen={() => {setModalShow(true)}} 
        >
            <View style={styles.coin}>
            <TouchableNativeFeedback onPress={()=> {setModalShow(true)}}  background={TouchableNativeFeedback.Ripple("#5c5e5c", true)}>
            <View style={{ backgroundColor: "#181c1b",
            borderRadius: 10,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection:"row",
            paddingHorizontal:5
           }}>
            <View style={styles.wrapper}>
                <Image
                    style={styles.image}
                    source={{uri:coin.image}}
                 />
                <View style={styles.textBlock}>
                    <Text style={styles.textOne}  numberOfLines={1} ellipsizeMode="tail">{coin.name}</Text>
                   <View style={styles.textBlockInline}>
                       {
                           coin.market_cap_rank ? (
                               <View style={styles.circle}><Text style={{
                                   color:"white",
                                   fontSize:coin.market_cap_rank > 1000 ? 9 : 12,
                                   padding:0,
                                   margin:0
                               }}>#{coin.market_cap_rank}</Text></View>
                           ) : (<></>)
                       }
                       <View style={styles.textBlockInline}>
                            <Text style={styles.textSymbol}  ellipsizeMode='tail' numberOfLines={1}>{coin.symbol.toUpperCase()}</Text>
                            {isNaN(percentageDaily) ? (<></>) : (
                             <View style={styles.textBlockInlineIcons}>
                             <AntIcon
                                name={arrow == false? "caretdown" : "caretup"}
                                size={12}
                                color={percentageDailyColor}
                                style={{ alignSelf: "center", marginRight: 2 }}/>
                            <Text style={styles.pricePercentage}>{percentageDaily} %</Text>
                            </View>)}
                       </View>
                   </View>
                </View>
            </View>
            <View style={{ backgroundColor: '#181c1b' }}>
  </View>

{sparkline.length > 0 ? ( 
   <VictoryLine
   style={{
        data: { stroke: percentageDailyColor,
        strokeWidth: .5}
  }}
width={65}
height={30}
domainPadding={0}
padding={0}
data={coin.victorySparkline}
/>

): (<></>)}
 
            <View style={styles.secondWrapper}>
                <Text style={styles.bold}>{price ? currencySymbol + price : "N/A"}</Text>          
                  <Text style={styles.textTwo} >MCap &nbsp;{coin.market_cap ? normalizeMarketCap(coin.market_cap) : "N/A"}</Text>    
            </View></View>
            </TouchableNativeFeedback>
            </View>
       
        <Modal visible={modalShow} onRequestClose={() => {setModalShow(false)}} transparent={true} statusBarTranslucent animationType='slide'>
        {modalShow ? (
        <View style={{
        flex:1, 
        paddingTop: StatusBar.currentHeight,
        backgroundColor:"#191919",
        justifyContent:"flex-start",
        alignItems:"center"
    }}>
     <View
      style={{
        width: "100%",
        padding: 10,
        backgroundColor:"#191919",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <AntIcon
        name="left"
        size={30}
        color="white"
        style={{ alignSelf: "center", marginRight: 2 }}
        onPress={() => {setModalShow(false)}}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          flexDirection: "row",
        }}>
        <Image style={{ width: 25, height: 25, borderRadius:8 }} source={{ uri: coin.image }} />
        <Text style={styles.symbol} numberOfLines={1} ellipsizeMode="tail">{coin.symbol.toUpperCase()}</Text>
        <Text style={styles.cap_rank} numberOfLines={1} ellipsizeMode="tail">#{coin.market_cap_rank  ? coin.market_cap_rank : "N/A"}</Text>
      </View>
      <MaterialCommunityIcons name="heart-outline" size={30} color="white" />
    </View>
      <BannerData sparkline={sparkline} coin={coin} percentageDailyColor={percentageDailyColor} percentageDaily={percentageDaily} victorySparkline={coin.victorySparkline} price={price} arrow={arrow} currencySymbol={currencySymbol} chartData={chartData} />
    </View>): (<></>)}
        </Modal>
        </Swipeable>

    );
}
