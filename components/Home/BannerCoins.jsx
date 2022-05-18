import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { useSelector } from "react-redux";

export function BannerCoins({navigation, ...props}) {

    const styles = StyleSheet.create({
    container: {
        width:"100%",
        padding:10,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginTop:0,
        marginBottom:-8
    },
    coinIcon: {
        height:30,
        width:30
    },
    imageAndText: {
        justifyContent:"center",
        alignItems:"center"
    },
    coinName: {
        fontSize:17,
        color:"#fff"
    },
    coinValue: {
        fontSize:25,
        color:"#fff",
        fontWeight:"bold"
    },
    coinsWrapper: {
        width:"100%",
        justifyContent:"space-around",
        alignItems:"flex-start",
        marginTop:7,
        flexDirection:"row"
    },
    image: {
      width:35,
      height:35,
      borderRadius:15
    }
  });

  const currencyWebSocket = useSelector((state) => state.priceReducer.selectedItems.value);
  const symbol = useSelector((state) => state.priceReducer.selectedItems.symbol);

  const CoinComponent = (props) => {

    const [price, setPirce] = useState(props.coin.current_price);
    const [percentageDaily, setPercentageDaily] = useState(parseFloat(props.coin.price_change_percentage_24h).toFixed(2));
    
    useLayoutEffect(() => {
      const connectToWebSocket = () => {

          const webSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${props.id}${currencyWebSocket}@ticker`);

          let lastPrice = null;
          let lastPercentage = null
          webSocket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            let price= data.a > 1000 ? parseFloat(data.a).toFixed(0) : data.a < 1000 ? parseFloat(data.a).toFixed(3) : parseFloat(data.a).toFixed(6);
            let percentage = parseFloat(data.P).toFixed(2);

             if (parseFloat(price) !== parseFloat(lastPrice) && parseFloat(percentage) !== parseFloat(lastPercentage)) {
              setPirce(price);
             }
        
              lastPrice = price
              lastPercentage = percentage
          }   
    }
        connectToWebSocket();
  }, [props.id, currencyWebSocket])

    return (
        <LinearGradient
        colors={[props.color, props.colormiddle, props.colorone]}
        style={{
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center",
            padding:10,
            width:"48%",
        }}>
           <Pressable style={styles.imageAndText} >
               <Image
                    style={styles.image}
                    source={{uri:props.coin.image}}
                 /> 
               <Text style={styles.coinName} numberOfLines={1}>{props.coin.name.toUpperCase()}</Text>
           </Pressable>
             <Text style={styles.coinValue}>{price ? symbol + price : "N/A"}</Text>
        </LinearGradient>
    )
};

  return (
    <View style={styles.container}>
      {
          props.coins.length > 0 ? (
        <View style={styles.coinsWrapper} key={6}>
            <CoinComponent coin={props.coins[0]} key={1} color="#c3aaf2" colormiddle="#9d72ed" colorone="#7c3eed" id={props.coins[0].symbol} />  
            <CoinComponent coin={props.coins[1]} key={2} color="#f2ca7c" colormiddle="#f7b125" colorone="#fe8700" id={props.coins[1].symbol} />  
       </View>

          ) : (<></>)
      }
    {props.coins.length > 0 ? (
       <View style={styles.coinsWrapper} key={5}>
            <CoinComponent coin={props.coins[2]} key={3} color="#7ca5cc" colormiddle="#5ba1e3" colorone="#1187f7" id={props.coins[2].symbol} />  
            <CoinComponent coin={props.coins[3]} key={4} color="#87cc8a" colormiddle="#4ddb54" colorone="#18f023" id={props.coins[3].symbol}/>  
       </View>
          ) : (<></>)
      }
    </View>
  );
}
