import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Pressable, View } from 'react-native'
import { getAll } from '../../api/RestaurantEndpoints'
import TextSemiBold from '../../components/TextSemiBold'
import TextRegular from '../../components/TextRegular'
import ImageCard from '../../components/ImageCard'                    // Import nuevo
import * as GlobalStyles from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import { API_BASE_URL } from '@env'

export default function RestaurantsScreen({ navigation, route }) {

  // useState para guardar el estado del array restaurants (Apartado 5.1)
  const [restaurants, setRestaurants] = useState([])

  // useEffect para cargar todos los restaurantes (Apartado 5.1)
  useEffect(() => {
    console.log('Loading restaurants, please wait 2 seconds')
    setTimeout(() => {
      setRestaurants(getAll()) // getAll function has to be imported
      console.log('Restaurants loaded')
    }, 2000)
  }, []) // Array de dependencias vacío pq no depende de objetos para cargarse

  // renderRestaurant para mostrar cada elemento del array (Apartado 5.1)
  const renderRestaurant = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }

  // Renderizar restaurante como una tarjeta (Apartado 7.2)
  const renderRestaurantWithImageCard = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.logo ? { uri: API_BASE_URL + '/' + item.logo } : restaurantLogo}
        title={item.name}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}
      >
        <TextRegular numberOfLines={2}>{item.description}</TextRegular>
        {item.averageServiceMinutes !== null &&
          <TextSemiBold>Avg. service time: <TextSemiBold textStyle={{ color: GlobalStyles.brandPrimary }}>{item.averageServiceMinutes} min.</TextSemiBold></TextSemiBold>
        }
        <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: GlobalStyles.brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
      </ImageCard>
    )
  }

  // Cambiar el return (Apartado 5.1)
  return (
    // Código ya existente
    // <View style={styles.container}>
    //   <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>
    //     Random Restaurant
    //   </TextRegular>
    //   <Pressable
    //     onPress={() => {
    //       navigation.navigate('RestaurantDetailScreen', {
    //         id: Math.floor(Math.random() * 100)
    //       })
    //     }}
    //     style={({ pressed }) => [
    //       {
    //         backgroundColor: pressed
    //           ? GlobalStyles.brandBlueTap
    //           : GlobalStyles.brandBlue
    //       },
    //       styles.actionButton
    //     ]}
    //   >
    //     <TextRegular textStyle={styles.text}>Restaurant Details</TextRegular>
    //   </Pressable>
    // </View>
    
    // Nuevo código del readme
    <FlatList
        style={styles.container}
        data={restaurants}
        //renderItem={renderRestaurant} // Dejamos de usarlo para usar el renderizado como tarjeta
        renderItem={renderRestaurantWithImageCard}
        keyExtractor={item => item.id.toString()}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'absolute',
    width: '90%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  }
})
