import * as React from 'react'
import { ImageBackground, Text } from 'react-native'

const LatestNews = () => {

    let loading = false; 

    return (
        <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%', justifyContent:'center'}} source={loading == true ? require('../../img/loading.png') : require('../../img/background.png')}>
            <Text style={{justifyContent:'center', alignSelf:'center', textAlign:'center' ,fontFamily:'Kanit-Bold', color:'yellow', fontSize:30}}>Nothing New, if anything happens we'll let you know :)</Text>
        </ImageBackground>
    )
}


export default LatestNews