import React from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {

    constructor(){

    super();
      this.state={
        allStories:[],
      }

  }

  componentDidMount(){
    this.retrieveStories();
  }

  retrieveStories = () => {

    var allStories = [];
    var stories = db.collection("Stories").get().then((querySnapshot)=> {
      querySnapshot.forEach((doc)=>{
        allStories.push(doc.data());
      })
      this.setState({allStories})
      console.log("These are all the stories.", allStories);
    })

  }
  
    render() {
      return (

        <View style={styles.container}> 
        <View style={styles.searchBar}> 
          <TextInput style ={styles.bar} placeholder = "Type Here..." onChangeText={(text)=>{this.setState({search:text})}}/> 
          <TouchableOpacity 
            style = {styles.searchButton} 
            onPress={()=>{
              this.retrieveStories(this.state.search)}
            }> 
            <Text>Search</Text> 
          </TouchableOpacity> 
        </View>

          <FlatList
            data = {this.state.allStories}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <Text>Title:{item.title}</Text>
                <Text>Author:{item.author}</Text>
              </View>
            )}
            keyExtractor={(item,index) => index.toString()}
          />

        </View>

      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    header:{
      backgroundColor:"pink",
      alignItems: 'center',
      fontSize: 20,
      fontWeight: '550',
      paddingBottom:10,
      paddingTop:10,
      paddingLeft:120.5,
      paddingRight:120.5,
    },

    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'pink',
      justifyContent: 'center',
      alignSelf: 'center',
    },

    searchBar:{ 
      flexDirection:'row', 
      height:40, 
      width:'auto', 
      borderWidth:0.5, 
      alignItems:'center', 
      backgroundColor:'grey', 
    }, 

    searchButton:{ 
      borderWidth:1, 
      height:30, 
      width:50, 
      alignItems:'center', 
      justifyContent:'center', 
      backgroundColor:'green' 
    } 
});