# Introduction

During this lab we will learn how to:

- modify screens to include action buttons for editing and deleting data
- modify screens to perform delete actions on entities.
- create screens and forms for editing entities data.

Durante este laboratorio aprenderemos cómo:

- modificar pantallas para incluir botones de acción para editar y eliminar datos
- modificar pantallas para realizar acciones de eliminación en entidades.
- crear pantallas y formularios para editar datos de entidades.

**Explicación adicional:** Las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) son fundamentales en cualquier aplicación. Este lab se enfoca en Actualizar (PUT) y Eliminar (DELETE), complementando los labs anteriores.

We will learn how to perform an HTTP DELETE requests from the Frontend client to the backend server. It is important to remember that to performn a DELETE Request we will need:

- the URI where we will address the request,
- the id of the entity to be removed.

For instance, if we want to remove a restaurant, we will do an HTTP DELETE Request to: `/restaurants/:restaurantId`.

Aprenderemos cómo realizar solicitudes HTTP DELETE desde el cliente Frontend al servidor backend. Es importante recordar que para realizar una solicitud DELETE necesitaremos:

- la URI donde dirigiremos la solicitud,
- el id de la entidad a ser eliminada.

Por ejemplo, si queremos eliminar un restaurante, haremos una solicitud HTTP DELETE a: `/restaurants/:restaurantId`.

We will learn how to perform an HTTP PUT requests from the Frontend client to the backend server. It is important to remember that to performn a PUT Request we will need:

- the URI where we will address the request,
- the id of the entity to be edited, and
- the updated entity data.

For instance, if we want to edit some restaurant, we will do an HTTP PUT Request to: `/restaurants/:restaurantId` and we will have to provide the updated restaurant data.

Aprenderemos cómo realizar solicitudes HTTP PUT desde el cliente Frontend al servidor backend. Es importante recordar que para realizar una solicitud PUT necesitaremos:

- la URI donde dirigiremos la solicitud,
- el id de la entidad a ser editada, y
- los datos de entidad actualizados.

Por ejemplo, si queremos editar algún restaurante, haremos una solicitud HTTP PUT a: `/restaurants/:restaurantId` y tendremos que proporcionar los datos del restaurante actualizados.

**Explicación adicional:** PUT se usa para reemplazar completamente una entidad, mientras que PATCH se usa para actualizaciones parciales. Para esta aplicación, usaremos PUT para las actualizaciones.

Durante este laboratorio aprenderemos cómo:

- modificar pantallas para incluir botones de acción para editar y eliminar datos
- modificar pantallas para realizar acciones de eliminación en entidades.
- crear pantallas y formularios para editar datos de entidades.

Aprenderemos cómo realizar solicitudes HTTP DELETE desde el cliente Frontend al servidor backend. Es importante recordar que para realizar una solicitud DELETE necesitaremos:

- la URI donde dirigiremos la solicitud,
- el id de la entidad a ser removida.

Por ejemplo, si queremos eliminar un restaurante, realizaremos una solicitud HTTP DELETE a: `/restaurants/:restaurantId`.

Aprenderemos cómo realizar solicitudes HTTP PUT desde el cliente Frontend al servidor backend. Es importante recordar que para realizar una solicitud PUT necesitaremos:

- la URI donde dirigiremos la solicitud,
- el id de la entidad a ser editada, y
- los datos de la entidad actualizada.

Por ejemplo, si queremos editar algún restaurante, realizaremos una solicitud HTTP PUT a: `/restaurants/:restaurantId` y tendremos que proporcionar los datos de restaurante actualizado.

**Explicación adicional:** DELETE se usa para eliminar recursos (generalmente identificados por ID), mientras que PUT se usa para actualizar completamente un recurso existente. Ambos requieren que especifiques qué recurso afecta usando su ID en la URL.

## 0. Setup

Click on "Use this template" in GitHub and "Create a new repository" to create your own repository based on this template. Afterwards, clone your own repository by opening VScode and clone the previously created repository by opening Command Palette (Ctrl+Shift+P or F1) and `Git clone` this repository, or using the terminal and running

```PowerShell
git clone <url>
```

Alternatively, you can use the _Source Control_ button in the left-sided bar and click on _Clone Repository_ button.

In case you are asked if you trust the author, please select yes.

It may be necessary to setup your git username by running the following commands on your terminal, in order to be able to commit and push:

```PowerShell
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "MY_NAME@example.com"
```

As in previous labs, it is needed to create a copy of the `.env.example` file, name it `.env` and include your environment variables.

Open a terminal a run `npm run install:all:bash` (`npm run install:all:win` for Windows OS) to install dependencies. A folder `node_modules` will be created under the `DeliverUS-Backend` and `DeliverUS-Frontend` folders.

Once you should setup your .env file for DeliverUS-Backend project. API_BASE_URL must points to your server. For instance `API_BASE_URL=http://localhost:3000`.

You have to run the backend server as well. Go to your global project folder and run `start:backend`.

You can then run `start:frontend`. Check that the base project is working.

# 1. Action buttons for editing and removing Restaurants.

We need to include some actions for editing and removing restaurants. One possible implementation is to include `Pressable` components in the card that renders each restaurant in the `RestaurantsScreen`.

To this end you can include the following `Pressable` instances in the renderRestaurant function of `RestaurantScreen`:

# 1. Botones de acción para editar y eliminar restaurantes.

Necesitamos incluir algunas acciones para editar y eliminar restaurantes. Una posible implementación es incluir componentes `Pressable` en la tarjeta que renderiza cada restaurante en `RestaurantsScreen`.

Para ello, puede incluir las siguientes instancias de `Pressable` en la función renderRestaurant de `RestaurantScreen`:

**Explicación adicional:** Los botones de acción permiten al usuario realizar operaciones sobre los elementos de una lista. Es importante proporcionar retroalimentación visual (como un icono de lápiz para editar o un icono de basura para eliminar) para que el usuario entienda la función de cada botón.

```JSX
<Pressable
  onPress={() => console.log(`Edit pressed for restaurantId = ${item.id}`)}
  style={({ pressed }) => [
    {
      backgroundColor: pressed
        ? GlobalStyles.brandBlueTap
        : GlobalStyles.brandBlue
    },
    styles.actionButton
  ]}>
  <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
    <MaterialCommunityIcons name='pencil' color={'white'} size={20}/>
    <TextRegular textStyle={styles.text}>
      Edit
    </TextRegular>
  </View>
</Pressable>

<Pressable
  onPress={() => console.log(`Delete pressed for restaurantId = ${item.id}`)}
  style={({ pressed }) => [
    {
      backgroundColor: pressed
        ? GlobalStyles.brandPrimaryTap
        : GlobalStyles.brandPrimary
    },
    styles.actionButton
  ]}>
  <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
    <MaterialCommunityIcons name='delete' color={'white'} size={20}/>
    <TextRegular textStyle={styles.text}>
      Delete
    </TextRegular>
  </View>
</Pressable>
```

You can try both buttons and check that messages are printed in the console.

Puedes probar ambos botones y verificar que los mensajes se impriman en la consola.

# 2. Delete Modal and HTTP DELETE Request for removing Restaurants.

We need to implement the delete action when the user press the corresponding button.

# 2. Modal de Eliminación y Solicitud HTTP DELETE para eliminar Restaurantes.

Necesitamos implementar la acción de eliminación cuando el usuario presiona el botón correspondiente.

**Explicación adicional:** Un modal de confirmación es una práctica UX importante: antes de permitir una operación destructiva (como eliminar un restaurante), debemos pedir confirmación al usuario para evitar eliminaciones accidentales.

1. Include a remove function in the `src/api/RestaurantEndpoints.js` file. The functions receives the `id` of a restaurant and is in charge of doing the request to the corresponding endpoint. You can use the following implementation:

1. Incluye una función remove en el archivo `src/api/RestaurantEndpoints.js`. La función recibe el `id` de un restaurante y es responsable de hacer la solicitud al endpoint correspondiente. Puedes usar la siguiente implementación:

   ```Javascript
   function remove (id) {
     return destroy(`restaurants/${id}`)
   }
   ```

    Remember to export the function so that it can be used outside this module.

    Recuerda exportar la función para que pueda ser usada fuera de este módulo.

    **Explicación adicional:** La función remove encapsula la lógica de la solicitud DELETE. De esta manera, si cambia el endpoint o necesitas agregar lógica adicional, solo tienes que modificar esta función en un lugar.

2. Implement the needed elements in `RestaurantsScreen.js`. It is a good practice to ask for confirmation when performing undoable operations.

2. Implementa los elementos necesarios en `RestaurantsScreen.js`. Es una buena práctica pedir confirmación cuando se realizan operaciones irreversibles.

   To this end, you have been provided with a component named `DeleteModal`. This component opens a modal window that includes:

   Para ello, se te ha proporcionado un componente llamado `DeleteModal`. Este componente abre una ventana modal que incluye:

   - a button to cancel the operation
   - a button to confirm the operation
   - the elements passed as children of this component are rendered as the body of the modal window.

   - un botón para cancelar la operación
   - un botón para confirmar la operación
   - los elementos pasados como hijos de este componente se representan como el cuerpo de la ventana modal.

   Therefore, the `DeleteModal` component needs three properties:

   Por lo tanto, el componente `DeleteModal` necesita tres propiedades:

   - `isVisible`: a boolean expression that is evaluated to show or hide the modal window.
   - `onCancel`: the function that will be run when the user presses on the cancel button.
   - `onConfirm`: the function that will be run when the user presses the confirmation button.

   - `isVisible`: una expresión booleana que se evalúa para mostrar u ocultar la ventana modal.
   - `onCancel`: la función que se ejecutará cuando el usuario presiona el botón Cancelar.
   - `onConfirm`: la función que se ejecutará cuando el usuario presiona el botón de confirmación.

   **Explicación adicional:** El componente DeleteModal encapsula toda la lógica de UI del modal. Solo necesita saber cuándo mostrar/ocultar y qué hacer cuando el usuario confirma o cancela, manteniendo el código limpio y reutilizable.

3. The component should be included in the return block of the `RestaurantsScreen` as follows:

3. El componente debe incluirse en el bloque de retorno de `RestaurantsScreen` de la siguiente manera:

   ```jsx
      <DeleteModal
        isVisible={restaurantToBeDeleted !== null}
        onCancel={() => setRestaurantToBeDeleted(null)}
        onConfirm={() => removeRestaurant(restaurantToBeDeleted)}
      >
        <TextRegular>
          The products of this restaurant will be deleted as well
        </TextRegular>
        <TextRegular>
          If the restaurant has orders, it cannot be deleted.
        </TextRegular>
      </DeleteModal>
   ```

4. Notice that we need to include a state object to store the restaurant that would be deleted when the user presses the delete button. Include the following state:

4. Observe que necesitamos incluir un objeto de estado para almacenar el restaurante que sería eliminado cuando el usuario presiona el botón de eliminar. Incluye el siguiente estado:

   ```javascript
   const [restaurantToBeDeleted, setRestaurantToBeDeleted] = useState(null)
   ```

5. Next, we will change the `onPress` property of the delete `Pressable` previously included in the `renderRestaurant`, so when the user presses, the `restaurantToBeDeleted` state will be set with the rendered restaurant.

5. A continuación, cambiaremos la propiedad `onPress` del `Pressable` de eliminar incluido previamente en `renderRestaurant`, de modo que cuando el usuario presione, el estado `restaurantToBeDeleted` se establezca con el restaurante renderizado.

    ```javascript
    onPress={() => {
      setRestaurantToBeDeleted(item)
    }}
    ```

6. Finally, we need to implement the `removeRestaurant` function that is called when the user confirms the deletion. This function calls to the `remove` method of the `RestaurantEndpoints`, then refreshes the view by fetching all the restaurants again and reset the restaurantToBeDeleted state object.

6. Finalmente, necesitamos implementar la función `removeRestaurant` que se llama cuando el usuario confirma la eliminación. Esta función llama al método `remove` de `RestaurantEndpoints`, luego actualiza la vista recuperando todos los restaurantes nuevamente y reinicia el objeto de estado `restaurantToBeDeleted`.

   **Explicación adicional:** El flujo es: el usuario presiona eliminar → se abre el modal → el usuario confirma → se ejecuta removeRestaurant → se actualiza la lista. Esto proporciona un flujo claro y seguro para operaciones destructivas.

    ```javascript
    const removeRestaurant = async restaurant => {
      try {
        await remove(restaurant.id)
        await fetchRestaurants()
        setRestaurantToBeDeleted(null)
        showMessage({
          message: `Restaurant ${restaurant.name} successfully removed`,
          type: 'success',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      } catch (error) {
        console.log(error)
        setRestaurantToBeDeleted(null)
        showMessage({
          message: `Restaurant ${restaurant.name} could not be removed.`,
          type: 'error',
          style: GlobalStyles.flashStyle,
          titleStyle: GlobalStyles.flashTextStyle
        })
      }
    }
    ```

Please, check that restaurants are deleted after this implementation is done.

Por favor, verifica que los restaurantes se eliminan después de que se completa esta implementación.

# 3. Edit Form and HTTP PUT Request for editing Restaurants.

We need to implement the update action when the user press the corresponding button. To this end, we will complete the implementation of the `EditRestaurantScreen.js`. This component should:

- receive the `restaurantId` to be edited as a route param `route.params.id`
- fetch the details of that restaurant from backend.
- store the fetched restaurant in a state object
- update the initialRestaurantValues of the form
- when the user presses the button labelled with edit, validates the data and eventually send an HTTP PUT Request to the backend.
- if the update is successful, sends the user back to the `RestaurantsScreen.js`

Let's complete the implementation:

1. Include an update function in the `src/api/RestaurantEndpoints.js` file. The functions receives the `id` of the restaurant and the updated restaurant data, and is in charge of doing the request to the corresponding endpoint. You can use the following implementation:

   ```javascript
   function update (id, data) {
     return put(`restaurants/${id}`, data)
   }
   ```

2. Modify the `onPress` action of the Edit `Pressable` at the `renderRestaurant`of the `RestaurantsScreen.js` component to navigate to this edit screen including the id of the restaurant. You can use the following:

   ```jsx
    onPress={() =>
      navigation.navigate('EditRestaurantScreen', { id: item.id })
    }   
    ```

3. At the `EditRestaurantScreen` import the `update` function from `RestaurantEndpoints`. Next, include state objects to store the restaurant to be fetched and the initialValues for the `Formik` edit form.

   ```Javascript
   const [restaurant, setRestaurant] = useState({})

   const [initialRestaurantValues, setInitialRestaurantValues] = useState({ name: null, description: null, address: null, postalCode: null, url: null, shippingCosts: null, email: null, phone: null, restaurantCategoryId: null, logo: null, heroImage: null })
   ```

4. Include an effect that fetches the restaurant details and set the `restaurant` state object and the `initialRestaurantValues`. You can use the following implementation:

   ```Javascript
   useEffect(() => {
     async function fetchRestaurantDetail () {
       try {
         const fetchedRestaurant = await getDetail(route.params.id)
         const preparedRestaurant = prepareEntityImages(fetchedRestaurant, ['logo', 'heroImage'])
         setRestaurant(preparedRestaurant)
         const initialValues = buildInitialValues(preparedRestaurant, initialRestaurantValues)
         setInitialRestaurantValues(initialValues)
       } catch (error) {
         showMessage({
           message: `There was an error while retrieving restaurant details (id ${route.params.id}). ${error}`,
           type: 'error',
           style: GlobalStyles.flashStyle,
           titleStyle: GlobalStyles.flashTextStyle
         })
       }
     }
     fetchRestaurantDetail()
   }, [route])
   ```

   Notice that we have to perform some processing of the entity data. We will use a couple of functions:

   - `prepareEntityImages`: receives an entity and an array of fieldNames that include images and returns the entity including the images in a form that can be rendered by `ImagePickers`.
   - `buildInitialValues`: receives an entity and return an object of initialValues valid for the `Formik` component.

5. Include the function to be run when the user presses on the submit/save button at the end of the form:

   ```Javascript
   const updateRestaurant = async (values) => {
     setBackendErrors([])
     try {
       const updatedRestaurant = await update(restaurant.id, values)
       showMessage({
         message: `Restaurant ${updatedRestaurant.name} succesfully updated`,
         type: 'success',
         style: GlobalStyles.flashStyle,
         titleStyle: GlobalStyles.flashTextStyle
       })
       navigation.navigate('RestaurantsScreen', { dirty: true })
     } catch (error) {
       console.log(error)
       setBackendErrors(error.errors)
     }
   }
   ```

   Notice that after the restaurant is update, we navigate back the the `RestaurantsScreen` that will re-render the restaurants list.

6. Update the `Formik` component with these properties:

   ```JSX
   enableReinitialize
   initialValues={initialRestaurantValues}
   onSubmit={updateRestaurant}
   ```

   The `enableReinitialize` property forces `Formik` to check for changes in the `intialRestaurantValues` assigned to the `initialValues` property.

# 4. Implement Edit and Delete of Products

Follow the steps of the previous exercices to implement the Edit and Deletion of products from the `RestaurantDetailScreen.js`.

You will need to include the `EditProductScreen` in the `RestaurantsStack.js` as follows:

```jsx
  <Stack.Screen
    name="EditProductScreen"
    component={EditProductScreen}
    options={{
      title: 'Edit Product'
    }}
  />
```

You will need to import the `EditProductScreen` as well:

```javascript
  import EditProductScreen from './EditProductScreen'
```

Remember that the backend does not expect to receive the `restaurantId` of the product, since you cannot change the product from one restaurant to another.
