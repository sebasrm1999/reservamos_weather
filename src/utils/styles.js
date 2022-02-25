import Reac from 'react';
import { StyleSheet } from 'react-native';

export const home  = StyleSheet.create({
    header: {
      flex: 3,
      backgroundColor: '#002674',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      shadowColor: "#000",
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,
      paddingBottom:10
    },
    container : {
        backgroundColor: '#FFF',
        width: '90%',
        flex: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        padding: 4
    },
    textinput:{
        width : '80%',
        height: 40,
        color: '#002674',
        fontWeight: 'bold',
    },
    inputView:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: '#ce348b',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#FFF',
        width: '90%',
        height: '35%'
    },
    reservamosLogo: {
        width: 150,
        height: 60,
        resizeMode: 'contain',
        marginLeft: -10
    },
    reservamosIcon: {
        width: 60,
        height: 30,
        resizeMode: 'contain'
    },
    daysItem: {
        height: '90%',
        borderColor: '#8b8f8c',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'column',
        flex: 1,
        marginVertical: 10,
        padding: 10
    }
  });