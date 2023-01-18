import * as React from 'react';
import {Button, View , SafeAreaView, Text, ImageBackground} from 'react-native'

const NewGroupForm = () => {

    
    return (
        <SafeAreaView style = {{flex: 1}}>
            <ImageBackground style={{flex:1}} source={require('../../img/background.png')} resizeMode='cover'>
            <View style={{flex: 1, padding: 16}}>
                <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                    <Text style={{fontSize: 40, color:'red'}}>Members</Text>
                    <Button title="2"></Button>
                    <Button title="4"></Button>
                    <Button title="8"></Button>
                </View>
            </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default NewGroupForm;