
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet,Dimensions } from 'react-native';
import styles from './Styles';
import { DB_URL,id,default_image } from './constants';
import { Alert } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const windowW= Dimensions.get('window').width;

export default class ChefProfileButton extends React.Component {


  constructor(props){
    super(props);
    this.state={default:'None'}
  }
  
    handleImage = (image) => {
      this.setState({ image_state: image })
    }


  get_image_from_db =async()=>{

    var identifier =id[0];

    //console.log("inside get image from db")

    const result = await fetch(`${DB_URL}/users/${identifier}`);

    const raw_data = await result.json();  

    const data = JSON.parse(JSON.stringify(raw_data));

    if (result.status===200){

      this.handleImage(data.profile_image);
      //console.log(this.state.image_state)

    }
  
    else{
      Alert.alert('No such mail/password in our system imagebutton')
    }

  }

   

    submit_image_to_db = (imagecode) =>{

        // PUT request using fetch the profile image

        var identifier =id[0];   
      
        
        
        const update= {
          "id":`${identifier}`,  
          "profile_image":`${imagecode}`
        }
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
        };
        
        fetch(`${DB_URL}/users/${identifier}`, requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                this.setState({ postId: data.identifier })
                id[7] = imagecode;
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    ImageLoader = (type) => {
        let options = {
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 550,
          includeBase64: true,
          quality: 1,
        };

        launchImageLibrary(options, (response) => {
          //console.log('Response = ', response);
    
          if (response.didCancel) {
            //alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
       
          const image = Platform.OS === 'ios'? response.assets[0].base64 : response.base64;
          const format= "data:image/jpeg;base64,"
          //Alert.alert(format.concat(image));
          this.submit_image_to_db(format.concat(image));
          this.handleImage(format.concat(image));
          //his.get_image_from_db();
        });
      }
      

      componentDidMount() {
        this.get_image_from_db();
         };


    render() {

     

      return (
        <TouchableOpacity onPress={() => this.ImageLoader()}>
          <Image
            source={{uri:this.state.image_state}}
            style={styles.logLogo, [{borderRadius: 1000, width:0.5*windowW ,height:0.5*windowW}]} />
        </TouchableOpacity>
      )
    }
  }




