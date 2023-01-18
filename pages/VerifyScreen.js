import * as React from 'react'
import { SafeAreaView, View, ImageBackground, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../App';

const VerifyScreen = ({route, navigation}) => {

    const {verifyFunc} = React.useContext(AuthContext)
    
    const [code, setCode] = React.useState('')
    const email = route.params.email
  
    return (
        <SafeAreaView style = {{flex : 1}} >
             <ImageBackground resizeMode='cover' style={{flex:1}} source={require('../img/background.png')}>
            <View style={{ flex: 1, padding: 16, justifyContent:'center'}}>
                <TextInput placeholder='Verification Code' onChangeText={setCode} value={code} style={{backgroundColor:'white', fontSize:16, marginBottom:10}} />
                <Button  onPress={() => {verifyFunc({email: email, code:code})} } title="Verify"/>
        
            </View>

           
            </ImageBackground>
        </SafeAreaView>
    )
}

export default VerifyScreen;