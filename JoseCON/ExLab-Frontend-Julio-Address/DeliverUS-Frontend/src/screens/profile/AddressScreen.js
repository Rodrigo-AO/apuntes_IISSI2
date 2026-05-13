import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import { brandPrimary, brandPrimaryTap, brandSecondary } from '../../styles/GlobalStyles'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import TextError from '../../components/TextError'
import { getAddresses, setDefault, deleteAddress } from '../../api/AddressEndpoints'
import { showMessage } from 'react-native-flash-message'
import { Ionicons } from '@expo/vector-icons'
import DeleteModal from '../../components/DeleteModal'


export default function AddressScreen({ navigation, route }) {
  const [addresses, setAddresses] = useState([])
  const [error, setError] = useState(null)
  const [addressToBeDeleted, setAddressToBeDeleted] = useState(null)

  useEffect(() => {
    fetchAddresses()
  }, [route])

  useFocusEffect(
    useCallback(() => {
      fetchAddresses()
    }, [])
  )

  const fetchAddresses = async () => {
    try {
      const fetchedAddresses = await getAddresses()
      setAddresses(fetchedAddresses)
      setError(null)
    } catch (err) {
      setError('No se pudieron cargar las direcciones')
      showMessage({
        message: 'Error retrieving addresses. ' + err,
        type: 'error'
      })
    }
  }

  const handleSetDefault = async (id) => {
    try {
      await setDefault(id)
      await fetchAddresses()
      showMessage({
        message: 'Default address updated',
        type: 'success'
      })
    } catch (err) {
      showMessage({
        message: 'Could not update default address. ' + err,
        type: 'error'
      })
    }
  }

  const handleDeleteAddress = async (address) => {
    try {
      await deleteAddress(address.id)
      setAddressToBeDeleted(null)
      await fetchAddresses()
      showMessage({
        message: 'Address deleted successfully',
        type: 'success'
      })
    } catch (err) {
      setAddressToBeDeleted(null)
      showMessage({
        message: 'Could not delete address. ' + err,
        type: 'error'
      })
    }
  }

  const renderAddress = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.aliasContainer}>
          <TextSemiBold>{item.alias}</TextSemiBold>
        </View>

        <View style={styles.addressContainer}>
          <TextRegular>
            {item.street + ', ' + item.city + ', ' + item.province + ', ' + item.zipCode}
          </TextRegular>
        </View>

        <View style={styles.actionsContainer}>
          <Pressable
            onPress={() => handleSetDefault(item.id)}
            style={styles.iconButton}
          >
            <Ionicons
              name={item.isDefault ? 'star' : 'star-outline'}
              size={24}
              color={brandPrimary}
            />
          </Pressable>

          <Pressable
            onPress={() => setAddressToBeDeleted(item)}
            style={styles.iconButton}
          >
            <Ionicons
              name='trash'
              size={22}
              color={brandPrimary}
            />
          </Pressable>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <TextSemiBold textStyle={styles.title}>Mis direcciones</TextSemiBold>

        {error && (
          <View style={styles.errorContainer}>
            <TextError>{error}</TextError>
          </View>
        )}

        <FlatList
          data={addresses}
          renderItem={renderAddress}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<TextRegular>No hay direcciones guardadas</TextRegular>}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate('AddressDetailScreen')}
        style={({ pressed }) => [
          styles.footerButton,
          { backgroundColor: pressed ? brandPrimaryTap : brandPrimary }
        ]}
      >
        <TextRegular textStyle={styles.footerButtonText}>Añadir nueva dirección</TextRegular>
      </Pressable>

      <DeleteModal
        isVisible={addressToBeDeleted !== null}
        onCancel={() => setAddressToBeDeleted(null)}
        onConfirm={() => handleDeleteAddress(addressToBeDeleted)}
      >
        <TextRegular>¿Seguro que quieres eliminar esta dirección?</TextRegular>
      </DeleteModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10
  },
  listContainer: {
    flex: 1
  },
  title: {
    fontSize: 30,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  aliasContainer: {
    flex: 2
  },
  addressContainer: {
    flex: 3,
    paddingHorizontal: 8
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  iconButton: {
    marginLeft: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  footerButton: {
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  footerButtonText: {
    color: brandSecondary,
    fontSize: 16
  },
  errorContainer: {
    marginBottom: 10
  }
})
