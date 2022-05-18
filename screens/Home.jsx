import React, { useEffect, useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl, LogBox } from "react-native";
import {HeaderTab} from "../components/Home/HeaderTab";
import {BannerCoins} from "../components/Home/BannerCoins";
import {LiveTrading} from "../components/Home/LiveTrading";
import { getCoinsByPageNumber } from "../services/request";
import { useSelector } from "react-redux";

LogBox.ignoreLogs(['VirtualizedLists should never be nested',"Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.","Invariant Violation: Tried to register two views with the same name RNSVGSvgView","Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.", "Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."])

export function Home({ navigation }) {

  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const pageNumber = useSelector((state) => state.marketReducer.selectedItems.pageNumber);
  const hour = useSelector((state) => state.marketHourReducer.selectedItems.hour);
  const order = useSelector((state) => state.orderReducer.selectedItems.order);
  const currency = useSelector((state) => state.priceReducer.selectedItems.api);

  const getCoins = async () => {
    setRefreshing(true)
    const data = await getCoinsByPageNumber(pageNumber, hour, order, currency);
    setCoins(data);
    setRefreshing(false)
  }

  const refetchCoins = async () => {
        setRefreshing(true)
        let data = []
        setCoins(data)
         data = await getCoinsByPageNumber(pageNumber, hour, order, currency);
        setCoins(data);
        setRefreshing(false)
  }

  useEffect(() => {
      getCoins();
  }, [pageNumber, hour, order])

  useEffect(() => {
    refetchCoins()
  }, [currency]);

  return (
   <>
   <StatusBar barStyle="default" translucent={true}></StatusBar>
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor:"black",
        paddingTop:StatusBar.currentHeight
      }}
    >
      <HeaderTab />
      <ScrollView 
         showsVerticalScrollIndicator={false}
         refreshControl={
          <RefreshControl
             refreshing={refreshing}
             color="#444"
             onRefresh={refetchCoins}
        />
         }
         >
       <BannerCoins coins={coins} navigation={navigation} />
        <LiveTrading coins={coins} navigation={navigation} refreshing={refreshing} />
      </ScrollView>
    </View>
    </>
  );
}

const a = () => (<></>)

export default a;