import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, View, FlatList, SafeAreaView, TextInput } from 'react-native';
import { height } from 'styled-system';



export default function SearchComponent(props) {

  const [filtereddata, setFiltereddata] = useState([]);
  const [masterdata, setMasterdata] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetchposts();
    return () => {

    }
  }, [])

  const fetchposts = () => {
    const url = props.apiurl;
    fetch(url)
      .then((response) => response.json())
      .then((responsejson) => {
        console.log(responsejson)
        setFiltereddata(responsejson);
        setMasterdata(responsejson);
        // setApiresult(responsejson)
      }).catch((error) => {
        console.log(error);
      })
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterdata.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase()
          : ' '.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFiltereddata(newData);
      setSearch(text);
    } else {
      setFiltereddata(masterdata);
      setSearch(text);

    }
  }

  const ItemView = ({ item }) => {
    return (<Text>
      {item.id}{'. '}{item.title.toUpperCase()}
    </Text>)
  }

  const ItemSeparatorView = () => {
    return (<View style={{ height: 0.5, width: "100%" }} />)
  }

  return (<SafeAreaView>
    <View style={styles.container}>

      {/* here is the search box */}
      <TextInput
        style={{ height: 20, border: "2px solid grey", width: "100%" }}
        value={search}
        placeholder="search here"
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)} />
      

      <FlatList
        data={filtereddata}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView} />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



