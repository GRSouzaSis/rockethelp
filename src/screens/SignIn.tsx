import { useState } from 'react';
import auth from '@react-native-firebase/auth'
import {VStack, Heading, Icon, useTheme } from 'native-base'
import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Envelope, Key } from 'phosphor-react-native';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('giva@bb.com')
  const [passWord, setPassWord] = useState('123456')
  
  const { colors } = useTheme();

  function handleSingIn() {
    if(!email || !passWord){
      return Alert.alert(
        'Entrar', 'Informe e-mail e senha.'
      );
    }
    setIsLoading(true)
    auth()
    .signInWithEmailAndPassword(email,passWord)    
    .catch((error)=> {
      setIsLoading(false)
      console.log(error)
      return Alert.alert(
        'Entrar', 'Não foi possivel logar.'
      );
     
     
    })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>Acesse sua conta</Heading>
      <Input 
        mb={4} 
        placeholder="E-mail" 
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} /> } ml={4} />}
        onChangeText={setEmail}
     />
      <Input 
        mb={8}
        placeholder="Senha" 
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} /> } ml={4} />}
        secureTextEntry
        onChangeText={setPassWord}
      />
      <Button 
        title='Entrar' 
        w="full" 
        onPress={handleSingIn}
        isLoading={isLoading}
      />
    </VStack>
  )
}