import React from 'react';
import { View, Alert, Image, Text, Dimensions, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import { Input, Button, CheckBox } from 'react-native-elements';
import { DB_URL, default_image, id, chefinfo, chefIdToView, geo_coord, typeOfLoggedUser } from './constants';
import ChefProfileButton from './ChefProfileButton';
import Dish1 from './Dish1';
import Dish2 from './Dish2';
import Dish3 from './Dish3';
import Dish4 from './Dish4';

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;


export default class SignUpChef extends React.Component {

  constructor(props) {
    super(props);
    this.state = { default: 'Error', eu: false, asia: false, na: false, sa: false, af: false, fus: false, description: '' }
  }

  handleDescription = (text) => {
    this.setState({ description: text })
  }
  handleTipology = (text) => {
    this.setState({ tipology: text })
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


  //    const result = await fetch(`${DB_URL}/users?email=${mail.toLowerCase()}`);

  submit = (description, eu, asia, na, sa, af, fus, instagram, youtube, twitter) => {
    const vector = '';
    const zero = 0;
    const update = {
      "id": `${id[0]}`,
      "name": `${id[2]}`,
      "last_name": `${id[3]}`,
      "Phone_Number": `${id[4]}`,
      "email": `${id[0]}`,
      "password": `${id[1]}`,
      "chef": true,
      "city": `${id[6]}`,
      "description": `${description}`,
      "europe": `${eu}`,
      "asia": `${asia}`,
      "northamerica": `${na}`,
      "southamerica": `${sa}`,
      "africa": `${af}`,
      "fusion": `${fus}`,
      "profile_image": `${id[7]}`,
      "dish1_image": `${id[8]}`,
      "dish2_image": `${id[9]}`,
      "dish3_image": `${id[10]}`,
      "dish4_image": `${id[11]}`,
      "instagram": `${instagram}`,
      "youtube": `${youtube}`,
      "twitter": `${twitter}`,
      "authorization": `${vector}`,
      "reviewScore": `${zero}`,
      "reviewNumber": `${zero}`,
      "longitude": `${geo_coord[0]}`,
      "latitude": `${geo_coord[1]}`,
    }

    const requestOptionsUpdate = {
      method: 'PUT',
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

        this.setState({ postId: data.id })
        id[5] = true;
        chefinfo[0] = eu;
        chefinfo[1] = asia;
        chefinfo[2] = na;
        chefinfo[3] = sa;
        chefinfo[4] = af;
        chefinfo[5] = fus;
        chefinfo[6] = description;

        //rimanda su chefpage
        chefIdToView[0] = id[0];
        typeOfLoggedUser[0] = 2;
        this.props.history.replace('/ChefPage')

      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      })
  }

  UNSAFE_componentWillMount() {
    if (typeOfLoggedUser[0] != 1) {
      this.props.history.goBack();
    }
  }

  render() {
    //console.log(this.state.eu);
    //console.log(this.state.asia);
    //console.log(this.state.na);
    //<Icon name="heart" size={20} color="#949494" />

    /*
    <View style={{ flex: 2, alignItems: 'center', width: windowW / 3, zIndex: 100 }}>
              <Image style={styles.logLogo, [{ width: 0.25 * windowW, height: 0.25 * windowW }]} source={require('./images/logo.png')} />
            </View>
            <View style={{ flex: 2, alignItems: 'center', width: windowW / 3, zIndex: 1 }}>
              <Image style={{ width: 0.5 * windowW, height: 0.25 * windowW }} source={require('./images/Animation.gif')} />
            </View>


  <Text style={{ fontSize: 0.08 * windowW, color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}>ChefEasy Needs You!</Text>
    */
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginBottom: 0 }}>
        <View style={{flex:90}}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', backgroundColor: 'rgb(217,13,12)', height: windowH*0.11 }}>
                <View style={{alignItems: 'center' }}>
                  <Image source={require('./images/logo.png')} style={styles.logLogo, [{ borderRadius: 40, width: 0.15 * windowW, height: 0.15 * windowW }]} />
                </View>
                <Text style={[styles.titleText, { marginLeft:windowW*0.03, fontSize: 0.1*windowW, color: 'white' }]}>Chef SignUp</Text>
          </View>


          <View style={{ marginTop: 10  ,marginLeft:10, marginRight:10}}>
          
            <View style={{ flex: 2, alignItems: 'center'}}>
              <ChefProfileButton > </ChefProfileButton>
            </View>
          </View>

          <View style={{ height: 0.02 * windowH ,marginLeft:10, marginRight:10}} />
          <View style={{ flex: 60, justifyContent: 'space-evenly', alignItems: 'center' ,marginLeft:10, marginRight:10}}>
            
            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 0.038 * windowW, color: 'gray', fontWeight: 'bold' }}>First, set your profile image</Text>
            </View>

            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 0.038 * windowW, color: 'gray', fontWeight: 'bold' }}>and enter here a basic description</Text>
            </View>

            <View style={{ flex: 30 }}>
              <TextInput style={{ borderRadius: 5, height: 0.25 * windowH, width: 0.9 * windowW, margin: 12, borderWidth: 0.5, textAlignVertical: 'top', fontSize:0.035*windowW }}
                multiline={true} maxlength={240} 
                placeholder='Enter a short description here' onChangeText={this.handleDescription} />
            </View>

            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 0.038 * windowW, color: 'gray', fontWeight: 'bold' }}>Please, select one or more cuisine macro-areas </Text>
            </View>
            <View style={{ height: 0.01 * windowH }} />
            <View style={{ width: 0.9 * windowW, flexDirection: 'row' }}>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='European' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='red' uncheckedIcon='circle-o' checked={this.state.eu} onPress={() => this.setState({ eu: !this.state.eu })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='North American' checkedIcon='dot-circle-o' checkedColor='red' uncheckedIcon='circle-o' checked={this.state.na} containerStyle={{ width: "90%", alignItems: 'flex-start' }} onPress={() => this.setState({ na: !this.state.na })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='African' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='red' uncheckedIcon='circle-o' checked={this.state.af} onPress={() => this.setState({ af: !this.state.af })} />
              </View>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='Asian' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='red' uncheckedIcon='circle-o' checked={this.state.asia} onPress={() => this.setState({ asia: !this.state.asia })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='South American' checkedIcon='dot-circle-o' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedColor='red' uncheckedIcon='circle-o' checked={this.state.sa} onPress={() => this.setState({ sa: !this.state.sa })} />
                <CheckBox textStyle={{fontSize:0.035*windowW}} center title='Fusion' containerStyle={{ width: "90%", alignItems: 'flex-start' }} checkedIcon='dot-circle-o' checkedColor='red' uncheckedIcon='circle-o' checked={this.state.fus} onPress={() => this.setState({ fus: !this.state.fus })} />
              </View>

            </View>
            <View style={{ flex: 10 }}>
              <Text style={{ fontSize: 0.038 * windowW, color: 'gray', fontWeight: 'bold' }}>Please, upload 4 pictures of your most iconic dishes! </Text>
            </View>

            <View style={{ marginTop: '6%', marginBottom: '6%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Dish1 style={styles.logLogo, [{ marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish1>
                <Dish2 style={styles.logLogo, [{ width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish2>
              </View>
              <View style={{ marginTop: '6%', flexDirection: 'row' }}>
                <Dish3 style={styles.logLogo, [{ marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish3>
                <Dish4 style={styles.logLogo, [{ width: 0.40 * windowW, height: 0.40 * windowW }]}></Dish4>
              </View>
            </View>
          </View>

          <View style={{ marginTop: '3%', marginBottom: '2%', justifyContent: 'space-evenly', alignItems: 'center',marginLeft:10, marginRight:10 }}>
            <Input label='Instagram' labelStyle={{ color: 'red', fontFamily: 'Times New Roman',fontSize: 0.035 * windowW  }}
              placeholder="Instagram Username" leftIcon={<Icon name="instagram" size={windowW * 0.055} color="#949494" />}
              onChangeText={this.handleInstagram} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
              inputStyle={{ fontSize: 0.04 * windowW }}/>

            <Input label='Youtube' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.035 * windowW  }}
              placeholder="Youtube Channel Id" leftIcon={<Icon name="youtube" size={windowW * 0.055} color="#949494" />}
              onChangeText={this.handleYoutube} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
              inputStyle={{ fontSize: 0.04 * windowW }}/>


            <Input label='Twitter' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.035 * windowW  }}
              placeholder="Twitter Username" leftIcon={<Icon name="twitter" size={windowW * 0.055} color="#949494" />}
              onChangeText={this.handleTwitter} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
              inputStyle={{ fontSize: 0.04 * windowW }}/>
          </View>


          <View style={{ height: 0.02 * windowH,marginLeft:10, marginRight:10 }} />
          <View style={{ flex: 6, alignItems: 'center',marginLeft:10, marginRight:10 }}>
            <Button title="To the kitchen !" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize:0.04*windowW }}
              buttonStyle={{ backgroundColor: 'rgb(217,13,12)' }} containerStyle={{ marginTop: 1, width: "45%" }}
              onPress={() => this.state.eu || this.state.asia || this.state.na || this.state.sa || this.state.af || this.state.fus ?
                this.submit(this.state.description, this.state.eu, this.state.asia, this.state.na, this.state.sa, this.state.af, this.state.fus, this.state.instagram,
                  this.state.youtube, this.state.twitter) :
                Alert.alert('Choose at least one option between the types of kitchen')} />

          </View>

          <View style={{ flex: 6, alignItems: 'center',marginLeft:10, marginRight:10, marginTop:10 }}>
            <Button title="Back" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', color: 'gray', fontSize:0.04*windowW }}
              containerStyle={{ width: "40%" }} type="clear" onPress={() => this.props.history.goBack()} />


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
