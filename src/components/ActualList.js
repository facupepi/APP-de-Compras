import {useState , useEffect} from 'react';
import {Item} from './Item.js';
import {NewItem} from './NewItem.js';
import { v4 as uuidv4 } from 'uuid';
import './ActualList.css';

export default function ActualList({items,updateItemsInList_Callback}) {
    const [list, setList] = useState(items);

    // Actualizar los ítems de la lista seleccionada cuando cambien los props
    useEffect(() => {
        setList(items);
    }, [items]);

    // Notifica al componente padre cuando la lista cambie
    useEffect(() => {
        updateItemsInList_Callback(list);
    }, [list, updateItemsInList_Callback]);

    // Función para añadir un nuevo item a la lista
    function addNewItemToList(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    
        const formData_Item = new FormData(e.target); // Crea un objeto FormData para obtener los datos del formulario
        let name = formData_Item.get("nameItem"); // Obtiene el valor del campo "nameItem"
        
        let quantity = formData_Item.get("quantityItem"); // Obtiene el valor del campo "quantityItem"
        let isChecked = false; // Campo para saber si un item fue comprado o no. Inicializa como falso porque no esta comprado.

        // Actualiza el estado 'list' añadiendo un nuevo objeto con id, nombre y cantidad
        const newItem = { id: uuidv4(), name, quantity, isChecked};
        const newList = [...list, newItem];

        reorganice_list(newList); // Reorganiza la lista inmediatamente y actualiza el estado Lista

        e.target.reset(); // Resetea el formulario después de añadir el item
    }
    
    // Función para eliminar un item de la lista
    function DeleteItemToList(id) {
        // Filtra la lista de items, excluyendo el item con el ID proporcionado
        setList(list.filter(item => item.id !== id));
    }
    
    // Función para modificar un item existente en la lista
    function ModifyItemToList(id, name, quantity) { 
        // Actualiza el estado 'list', modificando el item con el ID correspondiente
        setList((prevList) => prevList.map(item => 
            item.id === id 
            ? { id, name, quantity } 
            : item));
    }
    
    // Función para confirmar item comprado de la lista (tachar)
    function checkItem(id) {
        console.log("Check!");
        let updatedList = [];
        setList((prevList) => updatedList = prevList.map(
            item => item.id === id 
            ? { ...item, isChecked: !item.isChecked } 
            : item));
        // Actualizamos el valor de isChecked para el item con el id correspondiente
        
        reorganice_list(updatedList); // Reorganiza la lista inmediatamente
    }
    
    // Función para reorganizar la lista
    function reorganice_list(updatedList) {
        // Reorganizamos la lista para mover los items con isChecked: true al final
        const uncheckedItems = updatedList.filter(item => !item.isChecked); // Items no checkeados
        const checkedItems = updatedList.filter(item => item.isChecked);   // Items checkeados

        // Actualiza la lista reorganizada
        setList([...uncheckedItems, ...checkedItems]);
    }

    return (
        <div className='div_container_ActualList'>
            <NewItem addNewItemToList_Callback={addNewItemToList}/>
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
                            ModifyItemToList_Callback={ModifyItemToList} // Pasa la función de modificación como propiedad
                            checkItem_Callback={checkItem}// Pasa la función de checkItem como propiedad
                        />))             
                    }
            </ul>
            {console.table(list)} 
        </div>
    )
}