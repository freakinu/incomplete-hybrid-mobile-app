import * as React from 'react';
import {Text,ImageBackground, Alert, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContext } from '../App';
import { rest } from '../include';

class ProfileInfo extends React.Component{

    render(){

    return(
        <View style={{flex:1}}>
            <Text style={{color:'white', fontFamily:'Kanit-Bold', fontSize:20}}>Name: {this.props.data.full_name}</Text>
            <Text style={{color:'white', fontFamily:'Kanit-Bold', fontSize:20}}>Email: {this.props.data.email}</Text>
            <Text style={{color:'white', fontFamily:'Kanit-Bold', fontSize:20}}>Sex: {this.props.data.sex}</Text>
            <Text style={{color:'white', fontFamily:'Kanit-Bold', fontSize:20}}>Age: {this.props.data.age}</Text>
        </View>
    )
    }
}


const ProfileScreen = () => {

    let [loading, setLoading] = React.useState(true) 
    let [info, setInfo] = React.useState('')
    let { signOut } = React.useContext(AuthContext)

    
    React.useEffect( () => {

        const getInfo = async () => { 
            let token = null 
            try{
                token = await EncryptedStorage.getItem('token')
            }
            catch{
                Alert.alert('please recheck your permissions')
                return
            }
    
            
            const resp = await fetch(`${rest}rest/get_user_info?token=${token}`)
            const data = await resp.json() 
            console.log(data)
    
            if(data.status !== 'success'){
                Alert.alert('An Error Have been occured, please check your internet connection')
                signOut()
                return
            }
    
            setInfo(<ProfileInfo data={data.data} />)
            setLoading(false)
        }

        getInfo()
        }  , [])

    return (
        <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{ flex:1, height:'100%', justifyContent:'center'}} source={loading == true ? require('../img/loading.png') : require('../img/background.png')}>
            <Text style={{padding:16, justifyContent:'center', alignSelf:'center', textAlign:'center' ,fontFamily:'Kanit-Bold', color:'yellow', fontSize:30}}>Section Under development</Text>
    </ImageBackground>
    )
}

export default ProfileScreen;