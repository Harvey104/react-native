import React, { useState, useEffect } from "react";
import { 
    Box,
    VStack,
    HStack,
    Center,
    FormControl,
    Input,
    Button,
    Text,
    Image,
    ZStack,
    Pressable,
    Icon,
    ScrollView,
    Divider,
    Spinner
} from "native-base";
import { ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authAction';

import { BASE_URL } from "../../config";

export default function() {

    const navigation = useNavigation();

    const [show, setShow]= useState(false);
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [loginLoading, setLoginLoading] = useState(0);

    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth.auth);

    const userLogin = async () => {
        setLoginLoading(1);
        var data = JSON.stringify({
            "email": email,
            "password": pw
        });
        
        var config = {
            method: 'post',
            url: BASE_URL + '/api/auth/signin',
            crossdomain: true,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                dispatch(login(response.data));
                //console.log(auth);
                setLoginLoading(0);
                navigation.navigate('MyDrawer');
            })
            .catch(function (error) {
                setLoginLoading(0);
                console.log(error);
            });
    
    };

    const googleLogin = () => {
        GoogleSignin.configure({
            androidClientId: '829864696791-mq4bl3vccijffn8pci2hdn2qkqcmt55s.apps.googleusercontent.com',
            iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
        });
        GoogleSignin.hasPlayServices()
            .then((hasPlayService) => {
                if (hasPlayService){
                    GoogleSignin.signIn()
                        .then((userInfo) => {
                            console.log(userInfo.user.email);
                            var data = JSON.stringify({
                                "email": userInfo.user.email
                            });
                            
                            var config = {
                                method: 'post',
                                url: BASE_URL + '/api/auth/social/login',
                                crossdomain: true,
                                headers: { 
                                    'Content-Type': 'application/json'
                                },
                                data : data
                            };
                            
                            axios(config)
                                .then(function (response) {
                                    //console.log(JSON.stringify(response.data));
                                    dispatch(login(response.data));
                                    //console.log(auth);
                                    navigation.navigate('MyDrawer');
                                })
                                .catch(function (error) {
                                    GoogleSignin.signOut()
                                        .then((respones) => {
                                            console.log('logout sucess');
                                        })
                                        .catch((err) => {
                                            console.log(err.message);
                                        })
                                    console.log(error);
                                });
                        })
                        .catch((e) => {
                            console.log("ERROR IS: " + JSON.stringify(e));
                        })
                }
            })
            .catch((e) => {
                console.log("ERROR IS " + JSON.stringify(e));
            })
    }

    return(
        <Box safeArea w={'full'} h = {'full'} justifyContent = {'center'} alignItems = {'center'}>
            <ImageBackground
                source={require('../../../assets/img/purple_bg.png')}
                resizeMode = {'stretch'}
                style = {{
                    flex: 1,
                    width : '100%',
                    height : '100%',
                    justifyContent : 'center',
                    alignContent : 'center'
                }}
            >
                <VStack w={'full'} h={'full'}>
                    <Box h={'1/3'} justifyContent = {'center'} alignItems = {'center'}>
                        <Image source={require("../../../assets/img/multi_logo_login.png")}
                            resizeMode = {'contain'}
                            w = {'1/2'}
                            h = {'200px'}
                            alt="bee"
                        />
                    </Box>
                    <VStack w={'full'} h={'1/3'} space = {'8'} justifyContent = {'flex-start'} alignItems = {'center'}>
                        <VStack w={'5/6'} space = {'4'} alignItems={'center'}>
                            <FormControl>
                                <FormControl.Label
                                    _text={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: '14px',
                                        lineHeight: '17px',
                                        color:'white'
                                    }}
                                >
                                    Correo
                                </FormControl.Label>
                                    <Input
                                        type="email"
                                        size={'md'}
                                        defaultValue={email}
                                        onChangeText={newText => setEmail(newText)}
                                        variant="filled"
                                        _light={{
                                            bg: "coolGray.100",
                                            _hover: { bg: "white" },
                                            _focus: { bg: "white" } }}
                                        placeholder="Ingrese su correo"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                    />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label 
                                    _text={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: '14px',
                                        lineHeight: '17px',
                                        color:'white'
                                    }}
                                >
                                    Contraseña
                                </FormControl.Label>
                                <Input 
                                    type={show ? "text" : "password"}
                                    size={'md'}
                                    defaultValue = {pw}
                                    onChangeText={newText => setPw(newText)}
                                    variant="filled"
                                    _light={{
                                        bg: "coolGray.100",
                                        _hover: { bg: "white" },
                                        _focus: { bg: "white" }
                                    }}
                                    InputRightElement={
                                        <Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} mr="2" color="muted.400" /></Pressable>
                                    }
                                    placeholder="Ingrese su clave"
                                />
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('ForgotPasswordScreen');
                                }}>
                                    <Text textAlign={'right'} fontSize={'xs'} fontFamily = {'Inter-Medium'} color = {'white'}>
                                        Olvidaste tu contraseña?
                                    </Text>
                                </TouchableOpacity>
                            </FormControl>
                        </VStack>
                        <Box w={'5/6'}>
                            <Button h={'12'} mt="2" borderRadius = {'md'} isDisabled = {!email || !pw} bg = {'yellow.50'} onPress = {() => {
                                //navigation.navigate('MyDrawer');
                                userLogin();
                            }} >
                                {
                                    !loginLoading ?
                                        "Iniciar sesión"
                                    :
                                        <Spinner accessibilityLabel="Loading posts" size="lg" />
                                }
                            </Button>
                        </Box>
                    </VStack>
                    <Box w={'full'} h={'1/3'}>
                        <VStack space={'8'} w={'full'} alignItems = {'center'} >
                            <HStack w={'5/6'} space = {'2'} alignItems = {'center'} justifyContent = {'space-between'}>
                                <Divider
                                    w={'1/4'}
                                    _light={{
                                        bg: "white:alpha.50"
                                    }}
                                />
                                <Text
                                    w={'1/3'}
                                    textAlign = {'center'}
                                    fontFamily = {'Inter-Regular'}
                                    color={'white'}
                                >
                                    Inicia sesión con
                                </Text>
                                <Divider
                                    w={'1/4'}
                                    _light={{
                                        bg: "white:alpha.50"
                                    }}
                                />
                            </HStack>
                            <HStack w={'5/6'} space = {'8'}>
                                <TouchableOpacity style = {{flex: 1, width : '100%' }}
                                    onPress = {() => { googleLogin(); }}
                                >
                                    <Box h = {'12'} shadow = {'1'} bgColor = {'white'} borderRadius = {'5'} justifyContent = {'center'} alignItems = {'center'}>
                                        <Image source={require("../../../assets/img/google_logo.png")} alt="google_logo" />
                                    </Box>
                                </TouchableOpacity >
                                <TouchableOpacity style = {{flex: 1, width : '100%' }}>
                                    <Box h = {'12'} shadow = {'1'} bgColor = {'white'} borderRadius = {'5'} justifyContent = {'center'} alignItems = {'center'}>
                                        <Image source={require("../../../assets/img/apple_logo.png")} alt="apple_logo" />
                                    </Box>
                                </TouchableOpacity >
                            </HStack>
                            <HStack mt={'8'} justifyContent="center">
                                <Text fontSize="sm" color="white" _dark={{ color: "warmGray.200" }}>
                                    No estás registrado?{" "}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('RegisterScreen');
                                    }}
                                >
                                    <Text fontSize={'sm'} fontWeight = {'medium'} color = {'white'}>
                                        Crea tu cuenta
                                    </Text>
                                </TouchableOpacity>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </ImageBackground>
        </Box>
    )
}

// import axios from 'axios';

// import { useSelector, useDispatch } from 'react-redux';
// import { login } from '../../redux/actions/authAction';

// export default function LoginScreen() {

    // const navigation = useNavigation();

    // const [show, setShow]= useState(false);
    // const [email, setEmail] = useState('');
    // const [pw, setPw] = useState('');

    // const dispatch = useDispatch();
    // const auth = useSelector((store) => store.auth.auth);

    // const userLogin = async () => {

    //     var data = JSON.stringify({
    //         "email": email,
    //         "password": pw
    //     });
        
    //     var config = {
    //         method: 'post',
    //         url: 'http://10.0.2.2:8080/api/auth/signin',
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         data : data
    //     };
        
    //     axios(config)
    //         .then(function (response) {
    //             //console.log(JSON.stringify(response.data));
    //             dispatch(login(response.data));
    //             //console.log(auth);
    //             navigation.navigate('MyDrawer');
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    
    // };

//     return(
//         <ImageBackground
//             source={require('../../../assets/img/purple_bg.png')}
//             resizeMode = {'stretch'}
//             style = {{
//                 flex: 1,
//                 width : '100%',
//                 height : '100%',
//                 justifyContent : 'center',
//                 alignContent : 'center'
//             }}
//         >
//             <VStack w={'full'} h = {'full'}>
//                 <Box width = {'full'} h = {'1/3'} justifyContent = {'center'} alignItems = {'center'}>
//                     <Image source={require("../../../assets/img/multi_logo_login.png")}
//                         resizeMode = {'contain'}
//                         w = {'1/2'}
//                         h = {'200px'}
//                         alt="bee"
//                     />
//                 </Box>
//                 <Box w={'full'} h = {'2/3'} justifyContent = {'flex-start'} alignItems = {'center'} >
//                     <VStack w={'5/6'}>
//                         <FormControl>
//                             <FormControl.Label _text={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', lineHeight: '17px', color:'white' }}>Correo</FormControl.Label>
//                             <Input
//                                 type="email"
//                                 defaultValue={email}
//                                 onChangeText={newText => setEmail(newText)}
//                                 h={'10'}
//                                 variant="filled"
//                                 _light={{
//                                     bg: "coolGray.100",
//                                     _hover: { bg: "white" },
//                                     _focus: { bg: "white" } }}
//                                 placeholder="Ingrese su correo"
//                                 autoCapitalize="none"
//                                 keyboardType="email-address"
//                                 returnKeyType="next"
//                             />
//                         </FormControl>
//                         <FormControl>
//                             <FormControl.Label _text={{ fontFamily: 'Poppins-SemiBold', fontSize: '14px', lineHeight: '17px', color:'white' }}>Contraseña</FormControl.Label>
//                             <Input 
//                                 type={show ? "text" : "password"}
//                                 defaultValue = {pw}
//                                 onChangeText={newText => setPw(newText)}
//                                 variant="filled"
//                                 _light={{ bg: "coolGray.100", _hover: { bg: "white" }, _focus: { bg: "white" } }}
//                                 InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} mr="2" color="muted.400" /></Pressable>}
//                                 h = {'10'}
//                                 placeholder="Ingrese su clave"
//                             />
//                             <TouchableOpacity onPress={() => {
//                                 navigation.navigate('ForgotPasswordScreen');
//                             }}>
//                                 <Text textAlign={'right'} fontSize={'xs'} fontFamily = {'Inter-Medium'} color = {'white'}>
//                                     Olvidaste tu contraseña?
//                                 </Text>
//                             </TouchableOpacity>
//                         </FormControl>
//                         <Button h={'12'} mt="2" borderRadius = {'md'} isDisabled = {!email || !pw} bg = {'yellow.50'} onPress = {() => {
//                             // navigation.navigate('MyDrawer');
//                             userLogin();
//                         }} >
//                             Iniciar sesión
//                         </Button>
//                         <HStack space={'9'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
                            
//                             <Text fontFamily = {'Inter-Medium'} color={'white'}>Inicia sesión con</Text>
                            
//                         </HStack>
//                         <HStack space={'6'} justifyContent = {'center'}>
//                             <TouchableOpacity style = {{flex: 1, width : '100%' }}>
//                                 <Box h = {'12'} shadow = {'1'} bgColor = {'white'} borderRadius = {'5'} justifyContent = {'center'} alignItems = {'center'}>
//                                     <Image source={require("../../../assets/img/google_logo.png")} alt="google_logo" />        
//                                 </Box>
//                             </TouchableOpacity >
//                             <TouchableOpacity style = {{flex: 1, width : '100%' }}>
//                                 <Box h = {'12'} shadow = {'1'} bgColor = {'white'} borderRadius = {'5'} justifyContent = {'center'} alignItems = {'center'}>
//                                     <Image source={require("../../../assets/img/apple_logo.png")} alt="apple_logo" />        
//                                 </Box>
//                             </TouchableOpacity >
                            
//                         </HStack>
//                         <HStack mt="6" justifyContent="center">
//                             <Text fontSize="sm" color="white" _dark={{ color: "warmGray.200" }}>
//                                 No estás registrado?{" "}
//                             </Text>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     navigation.navigate('RegisterScreen');
//                                 }}
//                             >
//                                 <Text fontSize={'sm'} fontWeight = {'medium'} color = {'white'}>
//                                     Crea tu cuenta
//                                 </Text>
//                             </TouchableOpacity>
//                         </HStack>
//                     </VStack>
//                 </Box>
//             </VStack>
//         </ImageBackground>
//     );
// }

