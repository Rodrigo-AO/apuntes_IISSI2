/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Pressable, View } from 'react-native'
import { getDetail } from '../../api/RestaurantEndpoints' // Para obtener las categorías del restaurante
import { showMessage } from 'react-native-flash-message'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as GlobalStyles from '../../styles/GlobalStyles'
import TextRegular from '../../components/TextRegular'

export default function ProductCategoriesScreen ({ navigation, route }) {
  const [categories, setCategories] = useState([])
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState(null)

  // 1. Cargar datos al entrar
  useEffect(() => {
    fetchCategories()
  }, [route])

  const fetchCategories = async () => {
    try {
      // El enunciado dice: categorías asociadas al restaurante que estoy visualizando
      const restaurantDetail = await getDetail(route.params.id)
      setCategories(restaurantDetail.productCategories)
    } catch (error) {
      showMessage({
        message: `Error retrieving categories: ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  // 4. FUNCIÓN DE BORRADO (Llamada al API)
  const deleteCategory = async (category) => {
    try {
      await remove(category.id)
      setCategoryToBeDeleted(null) // Cerrar modal tras éxito
      showMessage({
        message: `Category ${category.name} successfully deleted`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      await fetchCategories() // Recargar lista para reflejar cambios
    } catch (error) {
      setCategoryToBeDeleted(null)
      showMessage({
        message: `Could not delete category: ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  // 2. Renderizado de cada fila (Basado en la Figura 2 y estilos del archivo)
  const renderCategory = ({ item }) => {
    return (
      <View style={styles.categoryRow}>
        <TextRegular textStyle={styles.categoryName}>{item.name}</TextRegular>
        
        {/* El botón de borrar se pide para el Ejercicio 3, pero dejamos el hueco según la imagen */}
        <View style={styles.actionButtonsContainer}>
          <Pressable
            onPress={() => setCategoryToBeDeleted(item)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? GlobalStyles.brandPrimaryTap
                  : GlobalStyles.brandPrimary
              },
              styles.actionButton
            ]}>
            <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='delete' color={'white'} size={20} />
              <TextRegular textStyle={styles.text}>Delete</TextRegular>
            </View>
          </Pressable>
        </View>
      </View>
    )
  }

  const renderHeader = () => {
    return (
      <Pressable
        onPress={() => navigation.navigate('CreateProductCategoryScreen', { id: route.params.id })}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandGreenTap
              : GlobalStyles.brandGreen
          },
          styles.button
        ]}>
        <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
          <MaterialCommunityIcons name='plus-circle' color={'white'} size={20} />
          <TextRegular textStyle={styles.text}>Create product category</TextRegular>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<TextRegular textStyle={styles.emptyList}>No categories found</TextRegular>}
      />
      {/* 6. COMPONENTE MODAL (Siempre al final, fuera de la lista) */}
      <DeleteModal
        isVisible={categoryToBeDeleted !== null}
        onCancel={() => setCategoryToBeDeleted(null)}
        onConfirm={() => deleteCategory(categoryToBeDeleted)}>
        <TextRegular>Are you sure you want to delete category {categoryToBeDeleted?.name}?</TextRegular>
      </DeleteModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignContent: 'center', padding: 10
  },
  categoryName: {
    textAlign: 'center',
    flex: 1,
  },
  categoryRow: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 10,

    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1
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
    flex: 1,
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
    flex: 1,
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