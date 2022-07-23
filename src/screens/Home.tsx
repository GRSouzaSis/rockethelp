import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Alert } from 'react-native';

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([
    {
    id: '123',
    patrimony: 'A123',
    when: '18/07/2022 às 21:15',
    status: 'open',
    },
    {
    id: '1234',
    patrimony: 'A1234',
    when: '18/07/2022 às 21:16',
    status: 'closed',
    },

  ])

  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', {orderId})
  }

  function handleLogout() {
    auth()
    .signOut()
    .catch((error)=> {
      console.log(error)
      return Alert.alert('Sair', 'Erro ao sair.')
    })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">
              5
          </Text>
        </HStack>
      
        <HStack space={3} mb={8}>
          <Filter 
            title='em andamento' 
            isActive={statusSelected === 'open'} 
            type="open"
            onPress={()=> setStatusSelected('open')}
          />

          <Filter 
            title='finalizados' 
            isActive={statusSelected === 'closed'} 
            type="closed"
            onPress={()=> setStatusSelected('closed')}
          />
        </HStack>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({item})=> <Order data={item} onPress={()=> handleOpenDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40}/>
              <Text color={colors.gray[300]} fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui{`\n`} solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button 
          title='Nova solicitação'
          onPress={handleNewOrder}
        />

      </VStack>


    </VStack>
  );
}