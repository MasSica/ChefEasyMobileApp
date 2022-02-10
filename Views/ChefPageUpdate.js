import React from 'react';
import { View, Alert, Image, Text, Dimensions, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import { Input, Button, CheckBox } from 'react-native-elements';
import { DB_URL, default_image, id, chefinfo, chefIdToView, typeOfLoggedUser } from './constants';
import ChefProfileButton2 from './ChefProfileButton2';
import Dish1 from './Dish1';
import Dish2 from './Dish2';
import Dish3 from './Dish3';
import Dish4 from './Dish4';

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;


export default class ChefPageUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { default: 'Error', loaded: false }
  }

  handleDescription = (text) => {
    this.setState({ description: text })
  }

  handleInstagram = (text) => {
    this.setState({ instagram: text })
  }

  handleYoutube = (text) => {
    this.setState({ youtube: text })
  }

  handleTwitter = (text) => {
    this.setState({ twitter: text })
  }

  handlename = (text) => {
    this.setState({ name: text })
  }
  
  handlelastname = (text) => {
    this.setState({ lastname: text })
  }

  handlephonenumber = (text) => {
    this.setState({ phoneNumber: text })
  }
  handlecity = (text) => {
    this.setState({ city: text })
  }
  handlepassword = (text) => {
    this.setState({ password: text })
  }

  //    const result = await fetch(`${DB_URL}/users?email=${mail.toLowerCase()}`);

  update = () => {
    id[1] = this.state.password;
    id[2] = this.state.name;
    id[3] = this.state.lastname;
    id[4] = this.state.phoneNumber;
    id[6] = this.state.city;
    chefinfo[0] = this.state.european;
    chefinfo[1] = this.state.asian;
    chefinfo[2] = this.state.northamerican;
    chefinfo[3] = this.state.southamerican;
    chefinfo[4] = this.state.african;
    chefinfo[5] = this.state.fusion;
    chefinfo[6] = this.state.description;
    const update = {
      "id": `${id[0]}`,
      "name": `${id[2]}`,
      "last_name": `${id[3]}`,
      "Phone_Number": `${id[4]}`,
      "email": `${id[0]}`,
      "password": `${id[1]}`,
      "chef": true,
      "city": `${id[6]}`,
      "description": `${chefinfo[6]}`,
      "europe": `${chefinfo[0]}`,
      "asia": `${chefinfo[1]}`,
      "northamerica": `${chefinfo[2]}`,
      "southamerica": `${chefinfo[3]}`,
      "africa": `${chefinfo[4]}`,
      "fusion": `${chefinfo[5]}`,
      "instagram": `${this.state.instagram}`,
      "youtube": `${this.state.youtube}`,
      "twitter": `${this.state.twitter}`
    }

    const requestOptionsUpdate = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    };

    fetch(`${DB_URL}/users/${id[0]}`, requestOptionsUpdate)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        //rimanda su chefpage
        this.props.history.replace('/ChefPage')
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      })
  }


  handleDatas = (datas) => {
    this.setState({ name: datas.name })
    this.setState({ password: datas.password })
    this.setState({ lastname: datas.last_name })
    this.setState({ description: datas.description })
    this.setState({ profileImage: datas.profile_image })
    this.setState({ phoneNumber: datas.Phone_Number })
    this.setState({ city: datas.city })

    this.setState({ european: (datas.europe === 'true')})
    this.setState({ asian: (datas.asia=== 'true') })
    this.setState({ northamerican: (datas.northamerica=== 'true') })
    this.setState({ southamerican: (datas.southamerica=== 'true') })
    this.setState({ african: (datas.africa === 'true')})
    this.setState({ fusion: (datas.fusion=== 'true') })
    //console.log(this.state.asian)
    //console.log(this.state.northamerican)

    this.setState({ dish1: datas.dish1_image })
    this.setState({ dish2: datas.dish2_image })
    this.setState({ dish3: datas.dish3_image })
    this.setState({ dish4: datas.dish4_image })

    this.setState({ instagram: datas.instagram })
    this.setState({ youtube: datas.youtube })
    this.setState({ twitter: datas.twitter })

    this.setState({ authorization: datas.authorization })
    this.setState({ reviewScore: parseFloat(datas.reviewScore) })
    this.setState({ reviewNumber: parseFloat(datas.reviewNumber) })

    //console.log(this.state.authorization)
    //console.log(id[0])
    //console.log(this.state.autList)
    //console.log(this.state.autList.indexOf(id[0]))
  }

  handleView = async (chefID) => {

    const result = await fetch(`${DB_URL}/users/${chefID}`);
    const raw_data = await result.json();
    const data = JSON.parse(JSON.stringify(raw_data));

    if (result.status === 200) {
      this.handleDatas(data);
      this.state.loaded = true;
      //console.log(this.state.loaded)
      this.forceUpdate();
    }
    else {
      Alert.alert('Error')
    }
  }
  UNSAFE_componentWillMount() {
    this.handleView(chefIdToView[0]);
  }

  render() {
    //console.log(this.state.eu);
    //console.log(this.state.asia);
    //console.log(this.state.na);
    return (
      <SafeAreaView style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 1 }}>
        {this.state.loaded && (
        <View style={{ flex: 90, width:windowW}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', backgroundColor: 'rgb(217,13,12)',height: windowH*0.11}}>
              <View style={{alignItems: 'center' }}>
                <Image source={require('./images/logo.png')} style={styles.logLogo, [{ borderRadius: 40, width: 0.15 * windowW, height: 0.15 * windowW }]} />
              </View>
              <Text style={[styles.titleText, { marginLeft:windowW*0.03, fontSize: 0.1*windowW, color: 'white' }]}>Update</Text>
        </View>
          <View style={{ height: 0.02 * windowH }} />


          

            <View style={{ flex: 2, alignItems: 'center', marginLeft: "5%" }}>
              <ChefProfileButton2> </ChefProfileButton2>
            </View>

            <View style={{ flexDirection: 'column', flex: 2, alignItems: 'flex-start', marginLeft: '5%'}}>
                <View style={{flexDirection:'row'}}>
                <Input containerStyle={{width:'50%'}} value={this.state.name}  leftIcon= {<Icon name="pencil" size={0.05*windowW} color="#949494"/>}
                onChangeText={this.handlename} inputStyle={{fontSize:0.04*windowW}}/>
              
                <Input containerStyle={{width:'50%'}} value={this.state.lastname}  leftIcon= {<Icon name="pencil" size={0.05*windowW} color="#949494"/>}
                onChangeText={this.handlelastname} inputStyle={{fontSize:0.04*windowW}}/>
                </View>
                
                <View style={{flexDirection:'row'}}>
                <Input containerStyle={{width:'50%'}} value={this.state.city}  leftIcon= {<Icon name="home" size={0.05*windowW} color="#949494"/>}
                onChangeText={this.handlecity} inputStyle={{fontSize:0.04*windowW}}/>

                <Input containerStyle={{width:'50%'}} value={this.state.phoneNumber}  leftIcon= {<Icon name="phone" size={0.05*windowW} color="#949494"/>}
                onChangeText={this.handlephonenumber} inputStyle={{fontSize:0.04*windowW}}/>
                </View>
                
                <Input containerStyle={{width:'50%', marginLeft:'25%'}} value={this.state.password}  leftIcon= {<Icon name="lock" size={0.05*windowW} color="#949494"/>}
                onChangeText={this.handlepassword} inputStyle={{fontSize:0.04*windowW}} secureTextEntry={true}/>
                
            </View>

         

          <View style={{ flex: 60, justifyContent: 'space-evenly', alignItems: 'center' }}>
            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 0.04 * windowW, color: 'gray', fontWeight: 'bold' }}>Description</Text>
            </View>

            <View style={{ flex: 30 }}>
              <TextInput style={{ fontSize:0.035*windowW,height: 0.25 * windowH, width: 0.9 * windowW, margin: 12, borderWidth: 0.5, textAlignVertical: 'top', borderRadius:5 }}
                multiline={true} maxlength={240}
                value={this.state.description} onChangeText={this.handleDescription} />
            </View>

            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 0.04 * windowW, color: 'gray', fontWeight: 'bold' }}>Cuisine macro-areas </Text>
            </View>
            <View style={{ height: 0.01 * windowH }} />
            <View style={{ width: 0.9 * windowW, flexDirection: 'row' }}>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='European' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='rgb(217,13,12)' uncheckedIcon='circle-o' checked={this.state.european} onPress={() => this.setState({ european: !this.state.european })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='North American' checkedIcon='dot-circle-o' checkedColor='rgb(217,13,12)' uncheckedIcon='circle-o' checked={this.state.northamerican} containerStyle={{ width: "90%", alignItems: 'flex-start' }} onPress={() => this.setState({ northamerican: !this.state.northamerican })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='African' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='rgb(217,13,12)' uncheckedIcon='circle-o' checked={this.state.african} onPress={() => this.setState({ african: !this.state.african })} />
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='Asian' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='rgb(217,13,12)' uncheckedIcon='circle-o' checked={this.state.asian} onPress={() => this.setState({ asian: !this.state.asian })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='South American' checkedIcon='dot-circle-o' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedColor='rgb(217,13,12)' uncheckedIcon='circle-o' checked={this.state.southamerican} onPress={() => this.setState({ southamerican: !this.state.southamerican })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='Fusion' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='rgb(217,13,12)' uncheckedIcon='circle-o' checked={this.state.fusion} onPress={() => this.setState({ fusion: !this.state.fusion })} />
              </View>

            </View>
          </View>


          <View style={{ flex: 10, alignItems: 'center', marginTop:'5%' }}>
            <Text style={{ fontSize: 0.04 * windowW, color: 'gray', fontWeight: 'bold' }}>You can also modify your images </Text>
          </View>

          <View style={{ marginTop: '6%', marginBottom: '3%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Dish1 style={styles.logLogo, [{ marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish1>
              <Dish2 style={styles.logLogo, [{ width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish2>
            </View>
            <View style={{ marginTop: '6%', flexDirection: 'row' }}>
              <Dish3 style={styles.logLogo, [{ marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish3>
              <Dish4 style={styles.logLogo, [{ width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish4>
            </View>
          </View>

          <View style={{ margin: '6%', marginBottom:'0%', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Input label='Instagram' labelStyle={{ color: 'rgb(217,13,12)', fontFamily: 'Times New Roman', fontSize: 0.035*windowW }}
              value={this.state.instagram} leftIcon={<Icon name="instagram" size={20} color="#949494" />}
              onChangeText={this.handleInstagram}  containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
              inputStyle={{ fontSize: 0.04 * windowW }}/>

            <Input label='Youtube' labelStyle={{ color: 'rgb(217,13,12)', fontFamily: 'Times New Roman', fontSize: 0.035*windowW }}
              value={this.state.youtube} leftIcon={<Icon name="youtube" size={20} color="#949494" />}
              onChangeText={this.handleYoutube}  containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
              inputStyle={{ fontSize: 0.04 * windowW }}/>

            <Input label='Twitter' labelStyle={{ color: 'rgb(217,13,12)', fontFamily: 'Times New Roman', fontSize: 0.035*windowW }}
              value={this.state.twitter} leftIcon={<Icon name="twitter" size={20} color="#949494" />}
              onChangeText={this.handleTwitter}  containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
              inputStyle={{ fontSize: 0.04 * windowW }}/>
          </View>
          
          <View style={{ flex: 6, alignItems: 'center', marginTop:'3%' }}>
            <Button title="Update" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize:0.04*windowW }}
              buttonStyle={{ backgroundColor: 'rgb(217,13,12)' }} containerStyle={{ marginTop: 1, width: "40%" }}
              onPress={() => this.update()} />

          </View>

          <View style={{ flex: 6, alignItems: 'center', marginTop:'2%', marginBottom:'2%' }}>
            <Button title="Back" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', color: 'gray', fontSize:0.04*windowW }}
              containerStyle={{ width: "40%" }} type="clear" onPress={() => this.props.history.replace('/ChefPage')} />


          </View>
        </ScrollView>
        </View>
        )}

        {this.state.loaded && (
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



        )}
      </SafeAreaView>
    );
  }
}
