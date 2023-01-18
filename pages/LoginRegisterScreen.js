import * as React from 'react';
import {Button, View , SafeAreaView, Text, TextInput, Image, ImageBackground} from 'react-native'
import { AuthContext } from '../App';


const LoginRegisterScreen = ({navigation}) => {
    const { signIn } = React.useContext(AuthContext)
    const {signUp} = React.useContext(AuthContext)

    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)

    return (
        <SafeAreaView style = {{flex: 1}}>
          <ImageBackground resizeMode='cover' style={{flex:1}} source={require('../img/background.png')}>
          <View style={{flex: 1, padding: 16, flexDirection:'column', justifyContent:'center'}}>
            <Image source={require('../img/logo.png')} style={{width:150, height:150, alignSelf:'center', marginBottom:5}} />
            <View>
                <Text style={{textAlign:'center', fontSize:24, color:'white', fontFamily:'Arial'}}>Registration</Text>
                <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={{ height: 40,borderWidth: 1,padding: 10, marginTop:10 , backgroundColor:'white', color:'black'}}/>
                <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} placeholder='Password' style={{ backgroundColor:'white', height: 40,borderWidth: 1,padding: 10, marginTop:10, marginBottom:10, color:'black'}}  />
            </View>

            <Button  title='Register' color="#84ac94" onPress={ () =>{signUp({email:email, password:password})}}></Button>
            <View style={{flex:1 , flexDirection:'row', flexGrow:1, justifyContent:'center'}}>
            <Text style={{color:'white'}}>Already Have an account? </Text><Text style={{color:'#2089ee', textDecorationLine:'underline'}} onPress={ () => { navigation.navigate('LoginScreen') }}>Login</Text>
            </View>
            </View>
            </ImageBackground>
        
        </SafeAreaView>
    )
}

export default LoginRegisterScreen;