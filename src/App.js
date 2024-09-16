import {useState} from 'react';
import './App.css';
import {validateItem} from './components/aditional_functions.js'
import {NewItem} from './components/NewItem.js';
import {Item} from './components/Item.js';
import { v4 as uuidv4 } from 'uuid';

function App() {
    // Estado para mantener la lista de items
    const [list,setList] = useState([]);

    // Función para añadir un nuevo item a la lista
    function addNewItemToList(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

        const formData_Item = new FormData(e.target); // Crea un objeto FormData para obtener los datos del formulario
        let name = formData_Item.get("nameItem"); // Obtiene el valor del campo "nameItem"
        let quantity = formData_Item.get("quantityItem"); // Obtiene el valor del campo "quantityItem"
        let isChecked = false; // Campo para saber si un item fue comprado o no;

        // Actualiza el estado 'list' añadiendo un nuevo objeto con id, nombre y cantidad
        setList([...list, {id: uuidv4(),name,quantity,isChecked}]);
        e.target.reset(); // Resetea el formulario después de añadir el item
    }

    // Función para eliminar un item de la lista
    function DeleteItemToList(id) {
        // Filtra la lista de items, excluyendo el item con el ID proporcionado
        setList(list.filter(item => item.id !== id));
    }

    // Función para modificar un item existente en la lista
    function ModifyItemToList(e, id, closePopup) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

        const formData_Item = new FormData(e.target); // Crea un objeto FormData para obtener los datos del formulario
        let name = formData_Item.get("nameItem"); // Obtiene el valor del campo "nameItem"
        let quantity = formData_Item.get("quantityItem"); // Obtiene el valor del campo "quantityItem"
        
        if (validateItem(name, quantity)){
            // Actualiza el estado 'list', modificando el item con el ID correspondiente
            console.log(`Modificando item: ${name} con id ${id} y cantidad ${quantity}`);
            setList((prevList) => prevList.map((item) => 
                (item.id === id
                ? {...item,name,quantity}
                : item)));
            closePopup();
        }
        else return;
    }

    // Función para confirmar item comprado de la lista (tachar)
    function checkItem(id) {
        console.log("Check!");
        setList((prevList) => {
            // Actualizamos el valor de isChecked para el item con el id correspondiente
            const updatedList = prevList.map((item) => 
                item.id === id 
                ? { ...item, isChecked: !item.isChecked }
                : item
            );
    
            // Luego reorganizamos la lista para mover los items con isChecked: true al final
            const uncheckedItems = updatedList.filter(item => !item.isChecked); // Items no checkeados
            const checkedItems = updatedList.filter(item => item.isChecked);   // Items checkeados
    
            // Devolvemos la lista reorganizada
            return [...uncheckedItems, ...checkedItems];
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>LISTA DE COMPRAS</h1>
                {/* Componente para añadir un nuevo item */}
                <NewItem addNewItemToList_Callback={addNewItemToList}/>
            </header>
            <ul>
                {/* Mapea la lista de items para mostrar cada uno en un componente 'Item'*/
                    list.length === 0 
                        ?
                        <div className='div_NoItems'>
                        <p className='p_App_NoItems' >No hay items en la lista...</p>
                        <img src='/img/loader.svg' alt='Loader' />
                        </div>
                        :
                        list.map((item_map) => (
                        <Item key={item_map.id} // Clave única para cada componente Item
                            item={item_map} // Pasa el item como propiedad al componente
                            DeleteItemToList_Callback={DeleteItemToList} // Pasa la función de eliminación como propiedad
                            ModifyItemToList_Callback={(e, closePopup) => ModifyItemToList(e, item_map.id, closePopup)} // Pasa la función de modificación como propiedad
                            checkItem_Callback={checkItem}// Pasa la función de checkItem como propiedad
                        />))             
                    }
            </ul>
            {console.table(list)} 
        </div>
    );
}

export default App;
