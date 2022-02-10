import React from 'react';
import { View, Alert, Image, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { DB_URL, id, chefinfo, chefIdToView, geo_coord, default_image, searchPreset, typeOfLoggedUser } from './constants';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from "react-native-maps";
import { ImageBackground } from 'react-native';
import TimedSlideshow from 'react-native-timed-slideshow';
import SplashScreen from 'react-native-splash-screen'

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

var chefIdSet = [];
var nameSet = [];
var longitudeSet = [];
var latitudeSet = [];
var slideShowImages = [];
var slideShowNames = [];
var voteSet = [];


export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      default: 'Error',
      latDelta: 0.3,
      lonDelta: 0.3,
      latitude: 0,
      longitude: 0,
      coordinates: [],
    }
  }

  retrieveChefPos = async () => {

    const result = await fetch(`${DB_URL}/users?chef=true`);
    const raw_data = await result.json();
    const data = JSON.parse(JSON.stringify(raw_data));

    if (result.status === 200) {
      //var k = Math.floor(Math.random() * data.length);
      //slideShowImages.includes( k ) ? slideShowImages[0]=Math.floor(Math.random() * data.length) : slideShowImages[0] = k  ;
      slideShowImages[0] = Math.floor(Math.random() * data.length);
      slideShowImages[1] = Math.floor(Math.random() * data.length);
      slideShowImages[2] = Math.floor(Math.random() * data.length);
      slideShowImages[3] = Math.floor(Math.random() * data.length);
      slideShowImages[4] = Math.floor(Math.random() * data.length);
      //console.log(slideShowImages)
      for (i = 0; i < data.length; i++) {
        for (let j = 0; j < 5; j++) {
          if (slideShowImages[j] == i) {
            if (data[i].dish2_image != default_image) {
              slideShowImages[j] = data[i].dish2_image;
              slideShowNames[j] = data[i].name.concat(' '.concat(data[i].last_name));
            }
            else if (data[i].dish1_image != default_image) {
              slideShowImages[j] = data[i].dish1_image;
              slideShowNames[j] = data[i].name.concat(' '.concat(data[i].last_name));
            }
            else if (data[i].dish3_image != default_image) {
              slideShowImages[j] = data[i].dish3_image;
              slideShowNames[j] = data[i].name.concat(' '.concat(data[i].last_name));
            }
            else if (data[i].dish4_image != default_image) {
              slideShowImages[j] = data[i].dish4_image;
              slideShowNames[j] = data[i].name.concat(' '.concat(data[i].last_name));
            }
            else {
              slideShowImages[j] = '';
              slideShowNames[j] = '';
            }
          }
        }
        chefIdSet[i] = data[i].id;
        nameSet[i] = data[i].name + ' ' + data[i].last_name;
        longitudeSet[i] = parseFloat(data[i].longitude);
        latitudeSet[i] = parseFloat(data[i].latitude);
        voteSet[i] = parseFloat(data[i].reviewScore).toFixed(2);
      }
      this.forceUpdate()
      //console.log(slideShowImages)

    }
    else {
      Alert.alert('Error')
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

          })
        });
        geo_coord[0] = this.state.longitude;
        geo_coord[1] = this.state.latitude;
      },

      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );

    this.retrieveChefPos();
    SplashScreen.hide();
  }

  chefSelect = (index) => e => {
    chefIdToView[0] = chefIdSet[index];
    //console.log(index);
    this.props.history.push('/ChefPage')
  }

  render() {

    const Markers = [];
    for (i = 0; i < chefIdSet.length; i++) {
      Markers.push(<Marker key={i} coordinate={{ latitude: latitudeSet[i], longitude: longitudeSet[i] }} onCalloutPress={this.chefSelect(i)}>
        
        < Callout onPress={this.chefSelect(i)} style={{width:0.3*windowW, height:0.08*windowH}}>
          <View style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
          <Text style={{fontSize:0.030*windowW, fontWeight:'bold'}}>{nameSet[i] + " " + voteSet[i] + " ★"}</Text>
          
          <Text style={{fontSize:0.025*windowW, marginTop:'3%'}}>Tap to see profile </Text>
          </View>
          </Callout> 
        </Marker>
        ); 
        
      }


    /*
          <ImageBackground source={require('./images/logoNero.png')} resizeMode="cover" style={{
          flex: 1, justifyContent: "center",
          alignItems: 'center', position: 'absolute', width: 0.9 * windowW, height: 0.9 * windowW, opacity: 0.12
        }} />
    */

    return (
      <SafeAreaView style={{ margin: 0, marginTop: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ flex: 90, width: windowW }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', backgroundColor: 'rgb(217,13,12)', height: windowH*0.11}}>
              <View style={{alignItems: 'center' }}>
                <Image source={require('./images/logo.png')} style={styles.logLogo, [{ borderRadius: 40, width: 0.15 * windowW, height: 0.15 * windowW }]} />
              </View>
              <Text style={[styles.titleText, { marginLeft:windowW*0.03, fontSize: windowW*0.1, color: 'white' }]}>ChefEasy</Text>
            </View>

            <View style={{ flex: 5, alignItems: 'center', marginTop: '5%', marginBottom: '3%' }}>
              <Text style={[styles.greyText, { fontSize: windowW*0.06 }]}>Our chefs' creations</Text>
            </View>
            <View style={{ width: windowW, height: windowH / 2.5 }}>
              <TimedSlideshow
                items={[
                  { uri: slideShowImages[0], title: slideShowNames[0], duration: 5000, fullWidth: false },
                  { uri: slideShowImages[1], title: slideShowNames[1], duration: 5000, fullWidth: false },
                  { uri: slideShowImages[2], title: slideShowNames[2], duration: 5000, fullWidth: false },
                  { uri: slideShowImages[3], title: slideShowNames[3], duration: 5000, fullWidth: false },
                  { uri: slideShowImages[4], title: slideShowNames[4], duration: 5000, fullWidth: false },
                ]}
                footerStyle={{ height: windowH / (2.5 * 3) }}
                titleStyle={{ fontSize: 17 }}
                textStyle={{ fontSize: 15 }}
                renderCloseIcon={() => { styles.closeImgWrapperSlideshow, styles.closeImgWrapperSlideshow, null }}
              //onClose={() => Alert.alert()}
              />
            </View>

            <View style={{ flex: 5, alignItems: 'center', marginTop: '5%', marginBottom: '3%' }}>
              <Text style={[styles.greyText, { fontSize: windowW*0.06 }]}>Quick Search by category</Text>
            </View>

            <View style={{ marginTop: '6%', marginBottom: '6%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <TouchableOpacity onPress={() => { searchPreset[0] = 'asia'; this.props.history.push('/search') }}>
                  <Image style={styles.logLogo, [{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 10, marginRight: '3%', width: 0.30 * windowW, height: 0.30 * windowW }]} source={require('./images/as.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { searchPreset[0] = 'northamerica'; this.props.history.push('/search') }}>
                  <Image style={styles.logLogo, [{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 10, marginRight: '3%', width: 0.30 * windowW, height: 0.30 * windowW }]} source={require('./images/na.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { searchPreset[0] = 'europe'; this.props.history.push('/search') }}>
                  <Image style={styles.logLogo, [{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 10, width: 0.30 * windowW, height: 0.30 * windowW }]} source={require('./images/eu.png')} />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: '6%', flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => { searchPreset[0] = 'southamerica'; this.props.history.push('/search') }}>
                  <Image style={styles.logLogo, [{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 10, marginRight: '3%', width: 0.30 * windowW, height: 0.30 * windowW }]} source={require('./images/sa.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { searchPreset[0] = 'africa'; this.props.history.push('/search') }}>
                  <Image style={styles.logLogo, [{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 10, marginRight: '3%', width: 0.30 * windowW, height: 0.30 * windowW }]} source={require('./images/af.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { searchPreset[0] = 'fusion'; this.props.history.push('/search') }}>
                  <Image style={styles.logLogo, [{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 10, width: 0.30 * windowW, height: 0.30 * windowW }]} source={require('./images/fusion.png')} />
                </TouchableOpacity>

              </View>
            </View>



            <View style={{ flex: 5, alignItems: 'center', marginTop: '5%', marginBottom: '3%' }}>
              <Text style={[styles.greyText, { fontSize: windowW*0.06 }]}>Chefs near you</Text>
            </View>

            <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center', marginBottom: '7%' }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: 0.9 * windowW, height: 1.0 * windowW }}
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: this.state.latDelta,
                  longitudeDelta: this.state.lonDelta,
                }}>
                <Marker coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}} pinColor={'#008000'}>
                  < Callout style={{width:0.3*windowW, height:0.08*windowH}}>
                      <View style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                      <Text style={{fontSize:0.035*windowW, fontWeight:'bold'}}>{"Your Position"}</Text>
                      
                      <Text style={{fontSize:0.028*windowW,marginTop:'3%'}}>{"You are here!"}</Text>
                      </View>
                  </Callout> 
                </Marker>
                {Markers}
              </MapView>
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
                if (typeOfLoggedUser[0] == 0) { this.props.history.push('/welcome_page') }
                else if (typeOfLoggedUser[0] == 1) { this.props.history.push('/UserPage') }
                else { chefIdToView[0] = id[0]; this.props.history.push('/ChefPage') }
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

