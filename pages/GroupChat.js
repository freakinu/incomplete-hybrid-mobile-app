import * as React from 'react'
import {ImageBackground, View, Image , Text, ScrollView, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable'

import { rest, flags } from '../include'


class Match extends React.Component{

    render(){ 

        return(
            <View style={{ height:80, marginTop:10, marginBottom:10, alignItems:'center', flexDirection:'column', padding:10}}>
                
                 <Text style={{color:'white', textAlign:'center', width:200, marginTop:3, alignItems:'center',flexGrow: 1, color:'white', fontSize:15}}>{this.props.due}</Text>
                <View style={{flex: 1, flexDirection: 'row', flexGrow:1}}>
                   
                    <Image style={{width:60, height:40, alignItems:'flex-start'}} source={flags[this.props.cc1]} />
                    {this.props.done == true ?(
                    <Animatable.Text animation='fadeIn' iterationCount='infinite' delay={5000} style={{height:200 ,color:'white', textAlign:'center', width:200, marginTop:3, alignItems:'center',flexGrow: 1, color:'white', fontSize:30}}>{this.props.score_1} - {this.props.score_2}</Animatable.Text>
                    ) : (
                        <Text style={{height:200, color:'white', textAlign:'center', width:200, marginTop:3, alignItems:'center',flexGrow: 1, color:'white', fontSize:30}}>VS</Text>
                    )
                    }
                    <Image style={{width:60, height:40, alignItems:'flex-end'}} source={flags[this.props.cc2]}  />
                </View>
            </View>
        );
    }
}

class MessagesSection extends React.Component{
    render(){

        let items = [] 
        this.props.msgs.forEach( (msg) => {
            items.push( <View style={{flex:1, flexDirection:'column', padding:5, alignItems:'center'}}>
                            <Text style={{marginRight:5, color:"#fedf21", fontSize:20}}>{msg.user}</Text>
                            <Image source={{uri:`${rest}${msg.sticker}`}} style={{width:120, height:120, margin:7}} resizeMode='stretch' />
                        </View>)
        })
       
        return (

          
        
            <Animatable.View animation={this.props.animate ? 'zoomInUp' : ''} style={{flex:1, height:'100%', width:'100%'}}>
                <ScrollView>
                    {items}
                </ScrollView>
            </Animatable.View>
           
        )
    }
}


class Sticker extends React.Component{

    render(){
       
        return (
            <TouchableOpacity onPress={ async() => {
                fetch(`${rest}rest/add_group_msg`, {
                    method:'post',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({group:this.props.params.group_id,sticker:this.props.id, user:this.props.params.user_id})

                } ).then(response => response.json())
                    .then( (data) => {
                        
                    })
            }}><Image source={{uri:this.props.file}} style={{width:70, height:70, margin:7}} resizeMode='stretch' /></TouchableOpacity>
        )
    }
}

class StickersSection extends React.Component {
   
   
   render(){ 

    let items = [] 

    this.props.stickers.forEach ( (sticker) => {
        items.push(<Sticker  params={this.props.route_params} file={`${rest}${sticker.url}`} id={sticker.id.toString()} /> )
    })

      return (
   
        <View style={{flex:1,width:'100%', height:200 , flexGrow:0, flexDirection:'column',  position:'absolute', bottom:0, zIndex:1000 ,borderTopColor:'white',}}>
                <Animatable.View  animation="zoomInUp" style={{flex:1, flexDirection:'row', padding:7, flexGrow:0}}>{items}</Animatable.View>
        </View>
     
           
      )
   }
}


const styles = StyleSheet.create({
    btn_text:{
        fontSize:15, 
        width:'100%', 
        textAlign:'center', 
        alignSelf:'center' , 
        position:'absolute', 
        color:'white',
        paddingRight:10,
        paddingLeft:10
    
    },

    btn_text2:{
        fontSize:25, 
        width:'100%', 
        textAlign:'center', 
        alignSelf:'center' , 
        position:'absolute', 
        color:'#fedf21',
        paddingRight:10,
        paddingLeft:10
        
    },



    btn_image:{
        width:150,
        height:80,

      
    }
});

class Challenge extends React.Component {

    render() { 

        return(

            <View style={{ flex:1, flexDirection:'row', justifyContent:'center', backgroundColor:'red', flexGrow:0, marginTop:60, marginBottom:50, flexWrap:'nowrap'}}>
                 <View style={{ justifyContent:'center', paddingRight:10, paddingLeft:10}}>
                    <Image style={styles.btn_image}  resizeMode={'stretch'} source={require('../img/44.png')} />  
                    <Text style={styles.btn_text2}  >50</Text>
                 </View>
                 <View style={{ justifyContent:'center',  paddingRight:10, paddingLeft:10}}>
                    <Image style={styles.btn_image}  resizeMode={'stretch'} source={require('../img/44.png')} />  
                    <Text style={styles.btn_text}  >{this.props.name}</Text>
                 </View>
            </View>
           
        )
    }
}

const GroupChat = ({route, navigation}) => {


    const [loading, setLoading] = React.useState(true)
    const [stickers, setStickers] = React.useState([])
    const [match, setMatch] = React.useState([])
    const [groupInfo, setGroupInfo] = React.useState([])
    const [msgs , setMsgs] = React.useState([])
    const [animateChat, setAnimateChat] = React.useState(false)
    let msglen = 0
    React.useEffect( () => {
        
        setInterval(  () => {

            const getMatch = async () => {
                let resp = await fetch(`${rest}rest/match?id=${route.params.match_id}`)
                let data = await resp.json() 

                setMatch(data.data)
            }

            const getStickers = async() => {
                let resp = await fetch(`${rest}rest/stickers`)
                const stickers_data = await resp.json() 
                setStickers(stickers_data)
                setLoading(false)
            }

            const getGroupInfo = async () => {
                let resp = await fetch(`${rest}rest/group_info?id=${route.params.group_id}`)
                let data = await resp.json() 

                setGroupInfo(data.data)
            }

            const getMsgs = async() => {
                let resp = await fetch(`${rest}rest/group_msgs?id=${route.params.group_id}`)
                let data = await resp.json()
                
                if(data.data.length !== msglen){
                    setAnimateChat(true)
                    msglen = data.data.length 
                }
                else{
                    setAnimateChat(false)
                }
                    
            
               
                setMsgs(data.data)
                
            }

            getMatch()
            getStickers() 
            getGroupInfo()
            getMsgs() 
            
        }, 5000)


        
    }, [])

    
    return (
        <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%'}} source={loading == true ? require('../img/loading.png') : require('../img/add_grp.png')}>
            { (loading !== true && match.length !== 0 && stickers.length !== 0 && groupInfo.length !== 0 ) ? (
                 <View style={{flex:1}}>
                  
                  <Match cc1={match.cc1} cc2={match.cc2} done={ match.score_1 == -1 ? false : true} score_1={match.score_1} score_2={match.score_2}/>
                  <Challenge name={groupInfo.challenge_name} />

                  {msgs.length !== 0 ? <MessagesSection animate={animateChat} msgs={msgs}/> :  null}

                 {match.score_1 > match.score_2  ? (  <StickersSection stickers={stickers} route_params={route.params} />) : null}
                
               </View>
            ) : null}
            
          {stickers.length !== 0 && match.score_1 !== -1 ? <View style={{backgroundColor:'white' , opacity:0.7, width:'100%', height:200, position:'absolute', bottom:0}}/> : null}
        </ImageBackground>
    )
}

export default GroupChat