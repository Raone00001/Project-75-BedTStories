import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import WriteStoryScreen from './screens/WriteStoryScreen';
import ReadStoryScreen from './screens/ReadStoryScreen';

export default class App extends React.Component{
  render(){
    return (
      <AppContainer/>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  loginScreen:{screen:LoginScreen},
  TabNavigator:{screen:TabNavigator}
});

const TabNavigator = createBottomTabNavigator({
  Write: {screen: WriteStoryScreen},
  Read: {screen: ReadStoryScreen},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Write"){
        return(
          <Image
          source={require("./assets/WritingIcon.png")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "Read"){
        return(
          <Image
          source={require("./assets/ReadingIcon.png")}
          style={{width:40, height:40}}
        />)
        
      }
    }
  })
}
);

const AppContainer =  createAppContainer(TabNavigator);