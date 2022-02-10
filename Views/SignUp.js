import React from 'react';
import {View,Alert, Image, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import { Input, Button } from 'react-native-elements';
import { DB_URL,default_image,id, typeOfLoggedUser } from './constants';

const windowW= Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

export default class SignUp extends React.Component{

constructor(props){
  super(props);
  this.state={default:'Error'}
}

  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }

  handlename = (text) => {
    this.setState({ name: text })
  }
  
  handlelastname = (text) => {
    this.setState({ lastname: text })
  }

  handlephonenumber = (text) => {
    this.setState({ phonenumber: text })
  }
  handlecity = (text) => {
    this.setState({ city: text })
  }

  submit = (name,lastname,phonenumber,email,password,city) =>{
    // POST request using fetch with error handling
    const new_user= {
      "id": `${email.toLowerCase()}`,
      "name": `${name}`,
      "last_name":`${lastname}`,
      "Phone_Number":`${phonenumber}`,
      "email":`${email.toLowerCase()}`,
      "password":`${password}`,
      "chef": false,
      "city":`${city}`,
      "profile_image":`${default_image}`,
      "dish1_image":`${default_image}`,
      "dish2_image":`${default_image}`,
      "dish3_image":`${default_image}`,
      "dish4_image":`${default_image}`
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_user)
    };
    
    fetch(`${DB_URL}/users`, requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.setState({ postId: data.id })
            id[0]=email.toLowerCase();
            id[1]=password;
            id[2]=name;
            id[3]=lastname;
            id[4]=phonenumber;
            id[5]=false;
            id[6]=city;
            id[7]=default_image;
            id[8]=default_image;
            id[9]=default_image;
            id[10]=default_image;
            id[11]=default_image;
            typeOfLoggedUser[0] = 1;
            setTimeout(()=>{this.props.history.push('/UserPage')}, 100)
            
            
            
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
}

UNSAFE_componentWillMount(){
  if(typeOfLoggedUser[0] != 0){
    this.props.history.goBack();
  }
}

  render(){
    //            <Image style={styles.logLogo, [{width:0.30*windowW ,height:0.30*windowW}]} source={require('./images/logo.png')} />

    return (
      <SafeAreaView style={{flex:1}}>
        <View style={{ flex: 90, width:windowW}}>
        <ScrollView contentContainerStyle={{ flexGrow:1}}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', backgroundColor: 'rgb(217,13,12)', height: windowH*0.11}}>
              <View style={{alignItems: 'center' }}>
                <Image source={require('./images/logo.png')} style={styles.logLogo, [{ borderRadius: 40, width: 0.15 * windowW, height: 0.15 * windowW }]} />
              </View>
              <Text style={[styles.titleText, { marginLeft:windowW*0.03, fontSize: windowW*0.1, color: 'white' }]}>SignUp</Text>
        </View>
 

        <View style={{margin:10}}>
            <View style={{ flex: 10, alignItems:'center', marginBottom:10, marginTop: 10}}>
              <Text style={{ fontSize: 0.045 * windowW, color: 'gray' }}>Please, provide us with some basic info</Text>
            </View>
         <View style={{flex:60, justifyContent:'space-evenly', alignItems:'center'}}>

                <Input containerStyle={{width:windowW*0.95, maxWidth:500, marginTop:'2%'}}
                placeholder="Name"  leftIcon= {<Icon2 name="pencil" size={windowW*0.055} color="#949494"/>}
                onChangeText={this.handlename} inputStyle={{fontSize:0.04*windowW}}/>

                <Input containerStyle={{width:windowW*0.95, maxWidth:500 , marginTop:'2%'}}
                placeholder="Last Name"  leftIcon= {<Icon2 name="pencil" size={windowW*0.055} color="#949494"/>}
                onChangeText={this.handlelastname} inputStyle={{fontSize:0.04*windowW}}/>

                <Input containerStyle={{width:windowW*0.95, maxWidth:500, marginTop:'2%'}}
                placeholder="City"  leftIcon= {<Icon name="home" size={windowW*0.055} color="#949494"/>}
                onChangeText={this.handlecity} inputStyle={{fontSize:0.04*windowW}}/>

                <Input containerStyle={{width:windowW*0.95, maxWidth:500, marginTop:'2%'}}
                placeholder="Phone Number"  leftIcon= {<Icon name="phone" size={windowW*0.055} color="#949494"/>}
                onChangeText={this.handlephonenumber} inputStyle={{fontSize:0.04*windowW}}/>

                <Input containerStyle={{width:windowW*0.95, maxWidth:500, marginTop:'2%'}}
                placeholder="Email"  leftIcon= {<Icon name="envelope" size={windowW*0.055} color="#949494"/>}
                onChangeText={this.handleEmail} inputStyle={{fontSize:0.04*windowW}}/>
                
                <Input containerStyle={{width:windowW*0.95, maxWidth:500, marginTop:'2%'}}
                placeholder="Password" secureTextEntry={true} leftIcon= {<Icon name="lock" size={windowW*0.055} color="#949494" />}
                onChangeText={this.handlePassword} inputStyle={{fontSize:0.04*windowW}}/>
        </View>

        <View style={{flex:6,alignItems:'center', marginTop:'5%'}}>
              <Button title="Join !" titleStyle={{fontFamily: 'Times New Roman', fontWeight:'bold', fontSize:0.045*windowW}} 
               buttonStyle={{backgroundColor: 'rgb(217,13,12)'}} containerStyle={{ marginTop: 1, width: "40%" }} 
               onPress={() => this.submit(this.state.name, this.state.lastname,this.state.phonenumber,this.state.email,this.state.password, this.state.city)}/>

        </View>

        <View style={{flex: 6,alignItems:'center', marginTop:'3%'}}>
                  <Button title="Back" titleStyle={{fontFamily: 'Times New Roman', fontWeight:'bold', color:'gray', fontSize:0.045*windowW}} 
                  containerStyle={{width: "40%" }} type="clear" onPress={() => this.props.history.goBack()}/>

                  
        </View>

        </View>

        </ScrollView>
        </View>



        <View style={{
          flex: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', alignItems: 'center', justifyContent: 'center',
          borderTopColor: 'grey', borderTopWidth: 2, width: windowW, height: 0.1 * windowH, borderStyle: 'solid',

        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.props.history.push('/')} >
                <Icon name="home" size={0.09 * windowW} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: '20%', marginRight: '20%', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => {
                if (typeOfLoggedUser[0]==0){ this.props.history.push('/welcome_page') }
                else if (typeOfLoggedUser[0]==1){this.props.history.push('/UserPage')}
                else {chefIdToView[0] = id[0]; this.props.history.push('/ChefPage')}
                }}>
                <Icon name="user-circle-o" size={0.09 * windowW} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.props.history.push('/search')} >
                <Icon name="search" size={0.09 * windowW} color="#000000" />
              </TouchableOpacity>
            </View>

          </View>


        </View>


      </SafeAreaView>
    );
  }
}
