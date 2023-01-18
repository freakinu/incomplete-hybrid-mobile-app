import * as React from 'react';
import { Text,ImageBackground } from 'react-native';


const Live = () => {

    let loading = false
    return (
            <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{ flex:1, height:'100%', justifyContent:'center'}} source={loading == true ? require('../../img/loading.png') : require('../../img/background.png')}>
                <Text style={{padding:16, justifyContent:'center', alignSelf:'center', textAlign:'center' ,fontFamily:'Kanit-Bold', color:'yellow', fontSize:30}}>No Broadcasts at the moment</Text>
            </ImageBackground>
    )
    
}

export default Live;