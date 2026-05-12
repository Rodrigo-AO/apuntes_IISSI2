import { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Image,
  Pressable
} from 'react-native'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemiBold'    // Import nuevo
import * as GlobalStyles from '../../styles/GlobalStyles'   // Import nuevo
import { getDetail } from '../../api/RestaurantEndpoints'   // Import nuevo
import { API_BASE_URL } from '@env'

export default function RestaurantDetailScreen({ route }) {

  // Apartado 5.2
  const [restaurant, setRestaurant] = useState({})

  // Apartado 5.2
  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurant(getDetail(route.params.id))
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])

  // Renderizar imagenes (logos) de restaurantes (Apartado 7.1)
  const renderHeader = () => {
    return (
      <ImageBackground source={(restaurant?.heroImage) ? { uri: API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined } style={styles.imageBackground}>
        <View style={styles.restaurantHeaderContainer}>
            <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
            <Image style={styles.image} source={restaurant.logo ? { uri: API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
            <TextRegular textStyle={styles.text}>{restaurant.description}</TextRegular>
        </View>
      </ImageBackground>
    )
  }
  
  // Apartado 5.2
  const renderProduct = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => { }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }

  // Apartado 5.2 y 7.1
  const { id } = route.params
  return (
    // Código ya existente
    // <View style={styles.container}>
    //   <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>
    //     Restaurant details. Id: {id}
    //   </TextRegular>
    // </View>

    // Código del apartado 5.2
    // <View style={styles.container}>
    //         <TextRegular style={styles.textTitle}>{restaurant.name}</TextRegular>
    //         <TextRegular style={styles.text}>{restaurant.description}</TextRegular>
    //         <TextRegular style={styles.text}>shippingCosts: {restaurant.shippingCosts}</TextRegular>
    //         <FlatList
    //           style={styles.container}
    //           data={restaurant.products}
    //           renderItem={renderProduct}
    //           keyExtractor={item => item.id.toString()}
    //         />
    //     </View>

    // Código sugerido por el 7.1
    // No lo da explícitamente, lo he copiado y modificado de RestaurantsScreen
    <FlatList
            style={styles.container}
            ListHeaderComponent={renderHeader}
            data={restaurant.products}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
          />
          // ListHeaderComponentes un prop de FlatList. Aqui sirve literalmente para cargar la cabecera antes q el resto y no se destructure
          // Otros props de FlatList: 
          //  ListFooterComponent={renderFooter}
          //  ItemSeparatorComponent={renderSeparator}
          //  renderItem={renderProduct} (ya lo usamos)
  )
}

// Nuevos estilos (Apartado 7.1)
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  text: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  }
})