import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as React from 'react'
import {  View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';


const YoutubeWebView = ({navigation}) => {

    let [canSkip, setCanSkip] = React.useState(false)
    let [seconds, setSeconds] = React.useState(5)
    React.useEffect( () => { 

        setInterval( () => { seconds -= 1;  setSeconds(seconds) }, 1000)

        setTimeout( () => {
            setCanSkip(true)} , 5000) 
    }, [])
    return (
     
       
            <View style={{flex:1}}>

            
            {canSkip == true ? <TouchableOpacity onPress={ () => {navigation.navigate('Prizes')}}><FontAwesomeIcon style={{color:'black'}} icon={faClose} /></TouchableOpacity>
            
            : <Text style={{position:'absolute', color:'white', fontSize:20,zIndex:1000 }}>{seconds}</Text> }
            <WebView style={{flex:1}}
            mediaPlaybackRequiresUserAction={false}
             source={{uri: "https://www.youtube.com/embed/PTZ-kZ1Zo-A?autoplay=1&controls=0"}} 
         />
         
         </View>
    
   
    )
}


export default YoutubeWebView