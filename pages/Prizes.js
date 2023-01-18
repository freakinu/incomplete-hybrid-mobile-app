import * as React from 'react';
import {View, Text, SafeAreaView, ImageBackground, ScrollView, Image, Alert, Button, TouchableOpacity} from 'react-native';

import { rest} from '../include';
import { MobileAds, TestIds, InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import { createStackNavigator } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable'

let turn = 0;

const AdMobTest = () => {
    
    const ad = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL)
    ad.addAdEventListener( AdEventType.LOADED , () => { ad.show() })
    ad.load()
}

const popAd = (nav) => {
    if(turn == 0){
        AdMobTest()
        turn = 1
        return 
    } 

    turn = 0
    nav.navigate('Youtube') 
}


class Prize extends React.Component{

    render() {

        return(
         
        <TouchableOpacity onPress={ () => {  popAd(this.props.nav)} } >
        <View style={{ alignItems:'center', marginLeft:5, marginRight:5, width:140}} >
        <View style={{width:'100%', flex:1, alignItems:'center'}} >
               <Image style={{width:'100%', height:60}} resizeMode='stretch' source={require('../img/44.png')} />  
               <Text style={{fontFamily:'Kanit-Regular', position:'absolute', color:'white', fontSize:20, marginTop:12}}>{this.props.name}</Text>
        </View>
        <Image style={{alignSelf:'center', width:120, height:150}} resizeMode='contain' source={{uri:`${rest}${this.props.prize_img}`}} />

            <View style={{width:'100%', flex:1, alignItems:'center'}}>
               <Image style={{width:'100%', height:60}} resizeMode='stretch' source={require('../img/44.png')} />  
               <Text style={{fontFamily:'Kanit-Regular', position:'absolute', color:'#ffdc24', fontSize:20, marginTop:12}}>{this.props.points} Points</Text>
            </View>
        <Image style={{alignSelf:'center', width:70, height:70}} resizeMode='stretch' source={{uri: `${rest}${this.props.sponsor_img}`}}/>
        
        </View>
        </TouchableOpacity>
        )
    }
}


const PrizesScreen = ({navigation}) => {

    const [loading, setLoading] = React.useState(true) 
    const [data, setData] = React.useState([])
    const fetchPrizes = async() => {

        //Admob Ads initialize
        await MobileAds().initialize()

        setInterval(  async() => {
            const resp = await fetch(`${rest}rest/prizes`)
            const data = await resp.json()

            let items = []
            data.forEach( (item) => {
                items.push(<Prize nav={navigation}name={item.name} points={item.points_to_win} prize_img={item.prize_img} sponsor_img={item.sponsor_img} />)
            })

            setLoading(false)
            setData(items)
        } , 5000)
        
    }

    React.useEffect( () => {   fetchPrizes() }, [])

    return(


        <SafeAreaView style={{flex:1}}>
            <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%'}} source={loading == true ? require('../img/loading.png') : require('../img/background.png')}>

            <ScrollView>
            {loading == true ? (
                    null
                ) : (
                    <Animatable.View animation="bounceInRight" style={{padding: 5, flex:1, flexDirection:'row', alignContent:'space-between', flexWrap:'wrap', justifyContent:'center'}}>
                    {data}
                   </Animatable.View>
                )}

            </ScrollView>
  

            </ImageBackground>
        </SafeAreaView>
    )
}

export default PrizesScreen;