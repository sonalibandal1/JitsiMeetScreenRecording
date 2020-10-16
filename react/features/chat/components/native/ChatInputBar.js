// @flow

import React, { Component  } from 'react';
import { TextInput, TouchableOpacity, View,Button,Text,Image } from 'react-native';

import { Icon, IconChatSend } from '../../../base/icons';
import { Platform } from '../../../base/react';

import styles from './styles';
import { ColorPalette } from '../../../base/styles';
//import { ActionSheet,ActionSheetAndroid } from 'react-native-cross-actionsheet'

//import DocumentPicker from 'react-native-document-picker';
//import FileViewer from "react-native-file-viewer";

var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 0;


type Props = {

    /**
     * Callback to invoke on message send.
     */
    onSend: Function
};

type State = {

    /**
     * Boolean to show if an extra padding needs to be added to the bar.
     */
    addPadding: boolean,

    /**
     * The value of the input field.
     */
    message: string,

    /**
     * Boolean to show or hide the send button.
     */
    showSend: boolean
};



    //const [singleFile, setSingleFile] = useState(null);

/**
 * Implements the chat input bar with text field and action(s).
 */
class ChatInputBar extends Component<Props, State> {

    /**
     * Instantiates a new instance of the component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            addPadding: false,
            message: '',
            showSend: false,
            singleFile: '',
           multipleFile: [],
        };
        

        this._onChangeText = this._onChangeText.bind(this);
        this._onFocused = this._onFocused.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    // showActionsheet = async () => {

    //   ActionSheet.showActionSheetWithOptions(
    //     {
    //       title: 'Action Sheet',
    //       message: 'Choose an option',
    //       options: ['Create', 'Edit', 'Delete', 'Cancel'],
    //       destructiveButtonIndex: 2,
    //       cancelButtonIndex: 3,
    //       tintColor: '#008888'
    //     },
    //     buttonIndex => {
    //       console.log("on press"
    //   )
        
    //     });
    // }
      
    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <View
                style = { [
                    styles.inputBar,
                    this.state.addPadding ? styles.extraBarPadding : null
                ] }>
                  {/* <TouchableOpacity onPress={
                  this.onPress
                  
                }>
                    <Image style={styles.imagestyle} source = {require('../../../../../images/Save.png')} />
                </TouchableOpacity> */}
                 
                  <TextInput
                    blurOnSubmit = { false }
                    multiline = { false }
                    placeholder = "Type a message"
                    keyboardType="ascii-capable"
                    placeholderTextColor =  "#FFFFFF"
                    onBlur = { this._onFocused(false) }
                    onChangeText = { this._onChangeText }
                    onFocus = { this._onFocused(true) }
                    onSubmitEditing = { this._onSubmit }
                    returnKeyType = 'send'
                    style = { styles.inputField }
                    value = { this.state.message } 
                    
                    />
                {
                    this.state.showSend && <TouchableOpacity onPress = { this._onSubmit }>
                        <Icon
                            src = { IconChatSend }
                            style = { styles.sendButtonIcon } />
                    </TouchableOpacity>
                }

                

                
            </View>
        );
    }

    _onChangeText: string => void;


    /**
     * 
     * @param {ChatModule} text  - Chat module send document
     */
   /* async onPress() {
      console.log("on press ))))"
      )
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
          //There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        });
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        //Setting the state to show single file attributes
        this.setState({ singleFile: res });
      } catch (err) {
  
        console.log("error",err);
        //Handling any exception (If any)
        // if (DocumentPicker.isCancel(err)) {
        //   //If user canceled the document selection
        //   alert('Canceled from single doc picker');
        // } else {
        //   //For Unknown Error
        //   alert('Unknown Error: ' + JSON.stringify(err));
        //   throw err;
        // }
      }
  }*/




    //  selectOneFile = async () => {
    //   try {
    //     const res = await DocumentPicker.pick({
    //         type: [DocumentPicker.types.csv],
    //     })
    //     console.log(
    //         res.uri,
    //         res.type,
    //         res.name,
    //         res.size
    //     )
    // } catch (err) {
    //   console.log("button pressed error ",err);

    //     // if (DocumentPicker.isCancel(err)) {
    //     //     console.log("is cancel");
    //     // } else {
    //     //     throw err;
    //     // }
    // }
    // console.log("button pressed");

        //() => setActionSheet(false)
        //Opening Document Picker for selection of one file
        /*try {
          const res = await DocumentPicker.pick({
            type: DocumentPicker.types.pdf,
            //There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          //Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          console.log('URI : ' + res.uri);
          console.log('Type : ' + res.type);
          console.log('File Name : ' + res.name);
          console.log('File Size : ' + res.size);
          //Setting the state to show single file attributes
         // this.setState({ singleFile: res });
         console.log('single file : ' ,this.state.singleFile);

         this.state.singleFile = res

         //this.setState({ this.state.singleFile : res });
          console.log('single file : ' ,this.state.singleFile);
    
          this.uploadImage();
        } catch (err) {
          //Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            //If user canceled the document selection
            
            alert('Canceled from single doc picker');
          } else {
            //For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }*/
        //}
      //}

      /////Upload Image Method


      /*uploadImage = async () => {

        console.log('single file **********: ' ,this.state.singleFile);
        //Check if any file is selected or not
        if (this.state.singleFile != null) {
          //If file selected then create FormData
          const fileToUpload = this.state.singleFile;
          const data = new FormData();
          data.append('meetingId', 23030303003);
          data.append('file', fileToUpload);
    
          console.log('fileToUpload file : ' ,data);
          //Please change file upload URL
          let res = await fetch(
            'https://clicktoconnect.hyundai.co.in/vc-api/video/aws/s3/uploadFile',
            {
              method: 'post',
              body: data,
              
              headers: {
                'Content-Type': 'multipart/form-data; ',
              },
            }
          );
          let responseJson = await res.json();
    
          console.log('responseJson file : ' ,responseJson);
            this.state.message = responseJson["FileUrl"]
            this._onSubmit()
          if (responseJson.status == 1) {
            // this.state.message = "Hi"
            //     this._onSubmit()
            alert('Upload Successful');
          }
        } else {
          //if no file selected the show alert
          alert('Please Select File first');
        }
      }*/
    
    /**
     * Callback to handle the change of the value of the text field.
     *
     * @param {string} text - The current value of the field.
     * @returns {void}
     */
    _onChangeText(text) {
        this.setState({
            message: text,
            showSend: Boolean(text)
        });
    }

    _onFocused: boolean => Function;

    /**
     * Constructs a callback to be used to update the padding of the field if necessary.
     *
     * @param {boolean} focused - True of the field is focused.
     * @returns {Function}
     */
    _onFocused(focused) {
        return () => {
            Platform.OS === 'android' && this.setState({
                addPadding: focused
            });
        };
    }

    _onSubmit: () => void;

    removeEmojis (string) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return string.replace(regex, '');
      }

    /**
     * Callback to handle the submit event of the text field.
     *
     * @returns {void}
     */
    _onSubmit() {
        

        const message = this.removeEmojis(this.state.message).trim();

         console.log('remove  ' ,this.removeEmojis(this.state.message).trim());

        message && this.props.onSend(message);
        this.setState({
            message: '',
            showSend: false
        });
    }
}
const Actionstyles = {
  titleBox: {
    background: 'pink'
  },
  titleText: {
    fontSize: 16,
    color: '#000'
  }
}
export default ChatInputBar;