import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import { Formik } from 'formik'
import { showMessage } from 'react-native-flash-message'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { createProductCategory } from '../../api/RestaurantEndpoints' // Ajustar según nombre real en API

export default function CreateProductCategoryScreen ({ navigation, route }) {
  const [backendErrors, setBackendErrors] = useState()

  // 1. Esquema de validación (Yup)
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(255, 'Name too long')
      .required('Name is required')
  })

  // 2. Valores iniciales
  const initialValues = { name: '' }

  // 3. Función de guardado
  const createCategory = async (values) => {
    setBackendErrors([])
    try {
      // Importante: Asociar al restaurante que viene por parámetros
      const payload = { ...values, restaurantId: route.params.id }
      const createdCategory = await createProductCategory(payload)
      
      showMessage({
        message: `Category ${createdCategory.name} successfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.goBack() // Volver al listado
    } catch (error) {
      setBackendErrors(error.errors)
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={createCategory}>
      {({ handleSubmit }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%', marginTop: 20 }}>
              
              <InputItem
                name='name'
                label='Name:'
              />

              {/* Errores del servidor */}
              {backendErrors &&
                backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
              }

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                  <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                  <TextRegular textStyle={styles.text}>
                    Save
                  </TextRegular>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
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
  },
  switch: {
    marginTop: 5
  }
})