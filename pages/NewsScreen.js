import * as React from 'react';
import {View, Text,Button, SafeAreaView, ImageBackground, Image, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const NewsScreen = ({navigation}) => {
    return (
        
        <SafeAreaView style = {{flex : 1}} >
             <ImageBackground resizeMode='cover' style={{flex:1}} source={require('../img/background.png')}>

                <Image style={{height:100, width:80, alignSelf:'center', marginBottom:10}} resizeMode={'contain'} source={require('../img/logo0.png')}/>
             <View style={{justifyContent:'center'}}>
                <Image style={styles.btn_image}  resizeMode={'cover'} source={require('../img/44.png')} />  
             <Text style={styles.btn_text} onPress={ () => {navigation.navigate('TeamGroups') }}>Team Groups</Text>
             </View>

             <View style={{justifyContent:'center'}}>
                <Image style={styles.btn_image}  resizeMode={'cover'} source={require('../img/44.png')} />  
             <Text style={styles.btn_text} onPress={() => {navigation.navigate('Matches')}} >Matches</Text>
             </View>

             <View style={{justifyContent:'center'}}>
                <Image style={styles.btn_image}  resizeMode={'cover'} source={require('../img/44.png')} />  
             <Text style={styles.btn_text} onPress={() => {navigation.navigate('Live')}}>Live</Text>
             </View>

             <View style={{justifyContent:'center'}}>
                <Image style={styles.btn_image}  resizeMode={'cover'} source={require('../img/44.png')} />  
             <Text style={styles.btn_text} onPress={() => {navigation.navigate('ScorersScreen')}}>Scorers</Text>
             </View>

             <View style={{justifyContent:'center'}}>
                <Image style={styles.btn_image} resizeMode={'cover'} source={require('../img/44.png')} />  
             <Text style={styles.btn_text} onPress={() => {navigation.navigate('LatestNews')}}>Latest News</Text>
             </View>

                </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btn_text:{
        fontSize:25, 
        width:'100%', 
        textAlign:'center', 
        alignSelf:'center' , 
        position:'absolute', 
        color:'white'
    },

    btn_image:{
        width:'100%',
        height:60
    }
});

export default NewsScreen;