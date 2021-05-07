import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailID:'',
            password:''
        }
    }

    login = async(email,password) =>{

        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                if(response){
                    this.props.navigation.navigate('Transaction');
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert("User does not exist");
                    console.log("User does not exist");
                    break;

                    case 'auth/invalid-email': Alert.alert("Incorrect email ID or password");
                    console.log("Invalid");
                    break;
                }
            }
        } else {
            Alert.alert("Enter email ID or password");
        }

    }

    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>
                <View>
                    <Image source={require('../assets/bookLogo.png')} style={{width:200,height:200}}/>
                    <Text style={{textAlign:'center', fontSize:30}}>Bedtime Stories</Text>
                </View>

                <View>
                    <TextInput 
                    style={styles.loginBox}
                    placeHolder="abc@gmail.com"
                    keyboardType='email-address'
                    onChangeText={(text) => {
                        this.setState({emailID:text});
                    }}
                    />

                    <TextInput 
                    style={styles.loginBox}
                    secureTextEntry={true}
                    placeHolder="Enter Password"
                    onChangeText={(text) => {
                        this.setState({password:text});
                    }}
                    />

                </View>

                <TouchableOpacity 
                    style={{
                        height:20,
                        width:90,
                        borderWidth:1,
                        marginTop:20,
                        paddingTop:5,
                        borderRadius:7
                    }}
                    onPress={()=>{
                        this.login(this.state.emailID,this.state.password);
                        <Text style={{textAlign:'center'}}>Login</Text>
                    }}
                >

                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({ 

    loginBox: { 
        width: 300, 
        height: 40, 
        borderWidth: 1.5, 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 
    } 
    
})