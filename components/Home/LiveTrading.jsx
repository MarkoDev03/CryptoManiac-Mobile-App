import { View, Text, StyleSheet,  FlatList,Modal, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import {Coin} from './Coin';
import AntIcon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export function LiveTrading(props) {

  const currentPageNumber = useSelector((state) => state.marketReducer.selectedItems.pageNumber);
  const currentHour = useSelector((state) => state.marketHourReducer.selectedItems.hour);
  const currentOrder = useSelector((state) => state.orderReducer.selectedItems.order);
  const sortMethodName = useSelector((state) => state.orderReducer.selectedItems.title);
  const currentCurrencySet = useSelector((state) => state.priceReducer.selectedItems.value);
  const currencyTitle = useSelector((state) => state.priceReducer.selectedItems.title);

  const [visible, setVisible] =  useState(false);
  const [currencyWebSocket, setCurrencyWebSocket] = useState('usdt')

  const dispatch = useDispatch();

    const currencySort = [
      {title:"$ USD", value:"usdt", api:"usd", symbol:"$"},
      {title:"€ EUR", value:"eur", api:"eur", symbol:"€"},
      {title:"£ GBP", value:"gbp", api:"gbp", symbol:"£"},
      {title:"$ AUD", value:"aud", api:"aud", symbol:"$"},
    ]

   const sortMethods = [
     {
       text:"Market Cap Ascending",
       value:"market_cap_asc"
     },
     {
      text:"Market Cap Descending",
      value:"market_cap_desc"
    },
    {
      text:"Volume Ascending",
      value:"volume_asc"
    },
    {
      text:"Volume Descending",
      value:"volume_desc"
    },
    {
      text:"Gecko Ascending",
      value:"geckoasc"
    },
    {
      text:"Gecko Descending",
      value:"geckodesc"
    },
   ];

   const styles = StyleSheet.create({
       container: {
           width:"100%",
           padding:10,
           justifyContent:"flex-start",
           alignItems:"flex-start",
       },
       headline: {
           color:"white",
           textTransform:"uppercase",
           fontSize:16
       },
       inline: {
         flexDirection:"row",
         justifyContent:"space-between",
         alignItems:"center",
         paddingVertical:4,
         width:"100%"
       },
       endButtons: {
         flexDirection:"row",
         justifyContent:"flex-end",
         alignItems:"center"
       },
       button: {
         borderRadius:8,
         backgroundColor:"#42e44a",
         justifyContent:"center",
         alignItems:"center",
         marginLeft:5,
         paddingVertical:5,
         paddingHorizontal:8
       },
       headlineBlock:{
         flexDirection:"row",
         justifyContent:"flex-start",
         alignItems:"center"
       },
       modalOverlay: {
        flex:1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent:"center",
        alignItems:"center",
       },
       modal:{
         backgroundColor:"#191a19",
         borderRadius:12,
         padding:15,
         width:"85%"
       },
       types: {
         width:"100%",
         marginBottom:5,
         borderBottomColor:"#444",
         borderBottomWidth:.9,
         justifyContent:"space-between",
         alignItems:"center",
         paddingVertical:5,
         flexDirection:"row"
       },
       typesFirst: {
        width:"100%",
        borderBottomColor:"#444",
        borderBottomWidth:.9,
        justifyContent:"flex-start",
        alignItems:"center",
        paddingVertical:5,
        flexDirection:"row"
       },
       typeText:{
         color:"#eee",
         fontSize:14
       },
       and: {
         color:"#444"
       },
       pages: {
         width:"100%",
         justifyContent:"center",
         alignItems:"center",
         flexDirection:"row",
         paddingVertical:6.5,
         marginVertical:10,
         backgroundColor:"#212421",
         borderRadius:7
       }
   });

   const pages = [
     {number:1, enable:true, color:"darkgray"},
     {number:currentPageNumber > 7 ? "..." : "", enable:currentPageNumber !== 1 ? true : false, color:"#444"},
     {number:currentPageNumber > 2 && currentPageNumber > 1?  currentPageNumber - 5 : "",  enable:currentPageNumber > 6 && currentPageNumber < 8? true : false, color:"gold"},
     {number:currentPageNumber > 2 && currentPageNumber > 1?  currentPageNumber - 4 : "",  enable:currentPageNumber > 5 && currentPageNumber < 8? true : false, color:"lime"},
     {number:currentPageNumber > 2 && currentPageNumber > 1?  currentPageNumber - 3 : "",  enable:currentPageNumber > 4 && currentPageNumber < 8? true : false, color:"purple"},
     {number:currentPageNumber > 2 && currentPageNumber > 1?  currentPageNumber - 2 : "",  enable:currentPageNumber > 3 ? true : false, color:"navy"},
     {number:currentPageNumber > 2 ?  currentPageNumber - 1 : "",  enable:currentPageNumber > 2 ? true : false, color:"pink"},

     {number:currentPageNumber !== 1 ? currentPageNumber : "", enable:currentPageNumber != 1 && currentPageNumber < 413? true : false, color:"gray"},

     {number:currentPageNumber + 1 < 412 ? currentPageNumber + 1 : "",enable:currentPageNumber + 1 != 412? true : false, color:"red"},
     {number:currentPageNumber + 2 < 412 ? currentPageNumber + 2: "", enable:currentPageNumber + 2 != 412? true : false, color:"green"},
    
     {number:currentPageNumber < 410 ? "..." : "", enable:currentPageNumber < 409 ? true : false, color:"blue"},
    
     {number:412, enable:currentPageNumber > 411 ? false : true, color:"#eee"}
   ];
   
   const changeCoins = (direction) => {
      dispatch({
        type:"CHANGE_PAGE",
        payload: {
          pageNumber:currentPageNumber + direction
        }
      })
   }

   const hours = [
     {hour:"1h", value:1},
     {hour:"24h", value:24},
     {hour:"7d", value:7},
     {hour:"14d", value:14},
     {hour:"30d", value:30},
     {hour:"60d", value:60},
     {hour:"200d", value:200},
     {hour:"1y", value:100},
   ];

   const setHour = (hour) => {
    dispatch({
      type:"SET_HOUR",
      payload: {
         hour:hour
      }
    })
   }

   const Hour = ({ text, isActive }) => {
     return (
       <TouchableOpacity 
         style={{
           borderRadius:30,
           borderWidth:1,
           borderColor:currentHour === text ? "#16c784" : "#444",
           backgroundColor:"#1d1f1d",
           marginRight:10,
           paddingVertical:4,
           width:49,
           justifyContent:"center",
           alignItems:"center"
         }}
         onPress={() => {setHour(text)}}
       >
         <Text style={{color:currentHour === text ? "#16c784" : "white"}}>{text}</Text>
       </TouchableOpacity>
     )
   }
 
   const orderBy = (method, name) => {
    dispatch({
      type:"ORDER_BY",
      payload: {
         order:method,
         title:name
      }
    })
    setVisible(false)
   }

   const setNewCurrency = (value, title, api, symbol) => {
    dispatch({
      type:"CHANGE_CURRENCY",
      payload: {
        value:value,
        title:title,
        api:api,
        symbol:symbol
      }
    })
    setCurrencyWebSocket(value)
    setVisible(false)
   }

   const modalContent = () => {
     return (
       <View style={styles.modalOverlay}>
         <View style={styles.modal}>
            <View style={{
              width:"100%",
              justifyContent:"space-between",
              alignItems:"center",
              flexDirection:"row",
              borderBottomColor:"#444",
              borderBottomWidth:1,
              paddingBottom:10
            }}>
               <Text style={{color:"white", fontWeight:"bold", fontSize:23}}>ORDER BY</Text>
               <AntIcon
                      name="close"
                      size={34}
                      color="#fff"
                      style={{ alignSelf: "center"}}
                      onPress={() => {setVisible(false)}}
                />
            </View>
            <View style={{
              justifyContent:"flex-start",
              alignItems:"flex-start",
              marginTop:12,
              width:"100%"
            }}>
                {
                  sortMethods.map((method, index) => (
                    <View key={index + "sort"} style={{
                      width:"100%",
                      justifyContent:"space-between",
                      alignItems:"center",
                      flexDirection:"row",
                      paddingVertical:10,
                    }}>
                        <Text style={{color:"white", fontSize:15}}>{method.text}</Text> 
                        <BouncyCheckbox 
                           fillColor='#16c784'
                           isChecked={currentOrder == method.value ? true : false}
                           style={{
                             marginRight:-10,
                           }}
                           onPress={() => orderBy(method.value, method.text)}
                        />
                    </View>
                  ))
                }
            </View>
            <View style={{width:"100%", height:1, backgroundColor:"#444", marginTop:12}}></View>
            <View style={{
              justifyContent:"flex-start",
              alignItems:"flex-start",
              marginTop:12,
              width:"100%"
            }}>
                {
                  currencySort.map((method, index) => (
                    <View key={index + "sort"} style={{
                      width:"100%",
                      justifyContent:"space-between",
                      alignItems:"center",
                      flexDirection:"row",
                      paddingVertical:10,
                    }}>
                        <Text style={{color:"white", fontSize:15}}>{method.title}</Text> 
                        <BouncyCheckbox 
                           fillColor='#16c784'
                           isChecked={currentCurrencySet == method.value ? true : false}
                           style={{
                             marginRight:-10,
                           }}
                           onPress={() => setNewCurrency(method.value, method.title, method.api, method.symbol)}
                        />
                    </View>
                  ))
                }
            </View>
        </View>
      </View>
     )
   }

   const ChangePageButton = ({icon, direction, number, color}) => {
     return (
      <TouchableOpacity style={{
          borderRadius:8,
          backgroundColor:color,
          justifyContent:"center",
          alignItems:"center",
          marginLeft:5,
          paddingVertical:5,
          paddingHorizontal:8
      }} onPress={() => {changeCoins(direction)}} 
       disabled={currentPageNumber == number ? true : false}>
      <AntIcon
             name={icon}
             size={20}
             color="#fff"
             style={{ alignSelf: "center"}}
       />  
      </TouchableOpacity>
     )
   }
   
   const SetCoin = ({item}) => {
     let chartData = item.sparkline_in_7d.price.map(function(i) {
      return {
        timestamp: i[0],
        value: i[1]
      }
    })
     return (
      <Coin 
      coin={item} 
      key={item.symbol} 
      id={item.symbol} 
      sparkline={item.sparkline_in_7d.price} 
      chartData={chartData}
      currencyWebSocket={currencyWebSocket}/>
     )
   }
  return (
    <React.Fragment>
         <Modal 
        animationType="fade"
        visible={visible}
        transparent={true}
        statusBarTranslucent
        style={{
          margin: 0,
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
        onRequestClose={() => {setVisible(false)}}
    >
      {modalContent()}
      </Modal>
    <View style={styles.container}>
      <View style={styles.inline}>
        <View style={styles.headlineBlock}>
          <Text style={styles.headline}>Live trading</Text> 
          <View style={{borderRadius:50, padding:10, zIndex:3, marginLeft:-6}}>
          <TouchableNativeFeedback
            onPress={() => {setVisible(true)}}      
           background={TouchableNativeFeedback.Ripple("#5c5e5c", true)}
          >
         <View style={{borderRadius:50, padding:5}}>
         <MaterialCommunityIcons
                      name="sort-descending"
                      size={30}
                      color="#8e9190"
                      style={{ alignSelf: "center"}}
                />
         </View>
           </TouchableNativeFeedback></View>
                </View>
          <View style={styles.endButtons}>
               <ChangePageButton icon="caretleft" direction={-1} number={1} color={currentPageNumber == 1 ? "#348038" : "#42e44a"} />
               <Text style={{color:"white", marginLeft:5}}>{currentPageNumber}</Text>
               <ChangePageButton icon="caretright" direction={1} number={9} color={currentPageNumber == 9 ? "#348038" : "#42e44a"} />
          </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:"100%", marginTop:-5, zIndex:1,backgroundColor:"#212421", paddingVertical:5, borderRadius:0, paddingHorizontal:5, marginBottom:4}}>
        {
          hours.map((hour) => (
            <Hour key={hour.value} text={hour.hour} isActive={false} />
          ))
        }
      </ScrollView>
      <View style={styles.typesFirst}>
          <Text style={styles.typeText}>Sort by: <Text style={{color: "#16c784"}}>{sortMethodName}</Text></Text>
      </View>
      <View style={styles.typesFirst}>
         <View style={{justifyContent:"flex-start", alignItems:"center", flexDirection:"row", marginTop:-1.5}}>
         <Text style={styles.typeText}>Currency: </Text>
          <View style={{backgroundColor:"#16c784", borderRadius:30, paddingHorizontal:10, paddingVertical:2}}>
            <Text style={{color: "#eee"}}>{currencyTitle}</Text>
            </View>       
         </View>
      </View>
      <View style={styles.types}>
          <Text style={styles.typeText}># <Text style={styles.and}>&</Text> COIN <Text style={styles.and}>&</Text> 24H</Text>
          <Text style={styles.typeText}>PRICE <Text style={styles.and}>&</Text> MARKET CAP</Text>
      </View>
       <FlatList data={props.coins} renderItem={SetCoin} />
      <View style={styles.pages}>
      <ChangePageButton icon="caretleft" direction={-1} number={1} color={currentPageNumber == 1 ? "#348038" : "#42e44a"}/>
          <View style={{width:15, height:1}}></View>
          {
            pages.map((page) => (
              <Text style={{
                color:currentPageNumber == page.number ? "#42e44a" : "#fff",
                fontSize:currentPageNumber > 99 ? 16.5 : 20,
                marginRight:page.enable ? 6 : 0,
                display:page.enable ? "flex" : "none"
              }}
              key={page.color}
              onPress={() => {
                 if (page.enable && page.number !== "...") {
                  dispatch({
                    type:"CHANGE_PAGE",
                    payload: {
                      pageNumber:page.number
                    }
                  })
                 }
              }}

              >{page.number}</Text>
            ))
          }
           <ChangePageButton icon="caretright" direction={1} number={412} color={currentPageNumber == 412 ? "#348038" : "#42e44a"} />
      </View>
    </View>
    </React.Fragment>
  );
}
