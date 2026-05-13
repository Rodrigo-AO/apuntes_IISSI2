import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { create, getRestaurantCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'
import ImagePicker from '../../components/ImagePicker'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'

export default function CreateRestaurantScreen({ navigation }) {
    const initialRestaurantValues = {   // Valores iniciales para los campos del formulario
        name: null,
        description: null,
        address: null,
        postalCode: null,
        url: null,
        shippingCosts: null,
        email: null,
        phone: null,        // No hay que añadir las imagenes aqui, las gestiona ImagePicker
        restaurantCategoryId: null
    }

  return (
    <Formik
    initialValues={initialRestaurantValues}
    >
      {({ setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
                <InputItem        // Archivo components/InputItem.js, implementa varios campos de entrada para el formulario
                    name='name'
                    label='Name:'
                />
                <InputItem
                    name='description'
                    label='Description:'
                />
                <InputItem
                    name='address'
                    label='Address:'
                />
                <InputItem
                    name='postalCode'
                    label='Postal Code:'
                />
                <InputItem
                    name='url'
                    label='URL:'
                />
                <InputItem
                    name='shippingCosts'
                    label='Shipping Costs:'
                />
                <InputItem
                    name='email'
                    label='Email:'
                />
                <InputItem
                    name='phone'
                    label='Phone:'
                />
                <ImagePicker
                    label="Logo:"
                    image={values.logo}
                    defaultImage={restaurantLogo}
                    onImagePicked={result => setFieldValue('logo', result)}
                />
                <ImagePicker
                    label="Hero Image:"
                    image={values.heroImage}
                    defaultImage={restaurantBackground}
                    onImagePicked={result => setFieldValue('heroImage', result)}
                />

                <Pressable
                    onPress={() => console.log('Submit pressed')}
                    style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                        ? GlobalStyles.brandSuccessTap
                        : GlobalStyles.brandSuccess
                    },
                    styles.button
                    ]}
                >
                    <View
                        style={[
                            { flex: 1, flexDirection: 'row', justifyContent: 'center' }
                        ]}
                    >
                    <MaterialCommunityIcons
                        name="content-save"
                        color={'white'}
                        size={20}
                    />
                        <TextRegular textStyle={styles.text}>Save</TextRegular>
                    </View>
                </Pressable>

            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )

 /* TODO ESTO ES EL RETURN CON OBJETIS SIN FORMULARIO DE FORMIK CON SCROLLVIEW
 return (   // A ScrollView se le puede agregar un estilo, pero lo necesario es que sea el contenedor padre
    <ScrollView> 
        <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
                <InputItem                // Cada uno de estos servirá como un campo
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem                // Se ponen muchas para forzar a que haya q scrollear
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <InputItem
                    name='sampleInput'
                    label='Sample input'
                />
                <Pressable    // Definimos que habrá un botón
                    onPress={() => console.log('Button pressed')
                    }
                    style={({ pressed }) => [   // Estilo cuando se presione (cambia de color) y abajo su texto
                    {
                        backgroundColor: pressed
                        ? GlobalStyles.brandPrimaryTap
                        : GlobalStyles.brandPrimary
                    },
                    styles.button
                    ]}>     
                    <TextRegular textStyle={styles.text}>
                    Create restaurant
                    </TextRegular>
                </Pressable>
            </View>
        </View>
    </ScrollView>
    
  )
    */
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
