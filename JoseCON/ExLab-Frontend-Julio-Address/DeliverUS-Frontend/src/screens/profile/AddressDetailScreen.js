import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Switch } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import InputItem from '../../components/InputItem'
import TextSemibold from '../../components/TextSemibold'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'
import { addAddress } from '../../api/AddressEndpoints'
import { showMessage } from 'react-native-flash-message'
import { brandPrimary, brandPrimaryTap, brandSuccess, brandSuccessTap, brandSuccessDisabled } from '../../styles/GlobalStyles'

const validationSchema = yup.object().shape({
  alias: yup.string().required('El alias es obligatorio'),
  street: yup.string().required('La calle es obligatoria'),
  city: yup.string().required('La ciudad es obligatoria'),
  province: yup.string().required('La provincia es obligatoria'),
  zipCode: yup.string().required('El código postal es obligatorio')
})
export default function AddressDetailScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState([])

  const initialValues = {
    alias: '',
    street: '',
    city: '',
    province: '',
    zipCode: '',
    isDefault: false
  }

  const handleSubmit = async (values) => {
    setBackendErrors([])
    try {
      await addAddress(values)
      showMessage({
        message: 'Dirección guardada correctamente',
        type: 'success'
      })
      navigation.goBack()
    } catch (error) {
      setBackendErrors(error.errors || [])
      showMessage({
        message: 'No se pudo guardar la dirección',
        type: 'error'
      })
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isValid, values, setFieldValue }) => (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.container}>
              <TextSemibold textStyle={styles.title}>Nueva dirección</TextSemibold>

              <InputItem name='alias' label='Alias' placeholder='Casa, Trabajo...' />
              <InputItem name='street' label='Calle' placeholder='Ej: Mejos 1' />
              <InputItem name='city' label='Ciudad' placeholder='Ej: Dos Hermanas' />
              <InputItem name='province' label='Provincia' placeholder='Ej: Sevilla' />
              <InputItem name='zipCode' label='Código postal' placeholder='41700' />

              <View style={styles.toggleContainer}>
                <TextSemibold textStyle={styles.toggleLabel}>Dirección predeterminada</TextSemibold>
                <Switch
                  value={values.isDefault}
                  onValueChange={(value) => setFieldValue('isDefault', value)}
                  trackColor={{ false: '#c9c9c9', true: '#c9d87f' }}
                  thumbColor={values.isDefault ? brandSuccess : '#f4f3f4'}
                />
              </View>

              {backendErrors.map((err, index) => (
                <TextError key={index}>{err.param + ' - ' + err.msg}</TextError>
              ))}

              <Pressable
                disabled={!isValid}
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: pressed ? brandSuccessTap : brandSuccess },
                  { backgroundColor: !isValid ? brandSuccessDisabled : (pressed ? brandSuccessTap : brandSuccess) }
                ]}
              >
                <TextRegular textStyle={styles.buttonText}>Guardar dirección</TextRegular>
              </Pressable>

              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: pressed ? brandPrimaryTap : brandPrimary }
                ]}
              >
                <TextRegular textStyle={styles.buttonText}>Cancelar</TextRegular>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  toggleContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginTop: 20,
 },
 toggleLabel: {
   fontSize: 16,
 },
})
