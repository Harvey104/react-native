import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import {
  Box,
  Text,
  VStack,
  Image,
  FormControl,
  Input,
  Pressable,
  Icon,
  HStack,
  Button
} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  cell: {
    width: 54,
    height: 51,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#F8F8FD'
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 5;

export default function DashboardScreen() {

  const [email, setEmail] = useState('');
  const [show, setShow]= useState(false);
  const [pw, setPw] = useState('');

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/yellow_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <Text>Dashboard</Text>
      </ImageBackground>
    </SafeAreaView>    
  );
}