import { useState, useCallback } from 'react';
import ActualList from './components/ActualList';
import NewList from './components/NewList';
import './App.css';

function App() {
    const [arrayOfLists, setArrayOfLists] = useState([]);  // Estado que contiene todas las listas
    const [selectedList, setSelectedList] = useState('');  // Estado para la lista seleccionada
    const [selectedListColor, setSelectedListColor] = useState('');  // Estado para la lista seleccionada
    const [selectedListItems, setSelectedListItems] = useState([]); // Items de la lista seleccionada
    const [errorMessage, setErrorMessage] = useState('');

    // Estado para controlar la visibilidad del popup de modificación
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Función para abrir el popup
    const openPopup = () => setPopupOpen(true);
    
    // Función para cerrar el popup
    const closePopup = () => setPopupOpen(false);
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    
        const formData_Item = new FormData(e.target); // Crea un objeto FormData para obtener los datos del formulario
        let newName = formData_Item.get("nameList"); // Obtiene el valor del campo "nameList"
        let newColor = formData_Item.get("color"); // Obtiene el valor del campo "nameList"
        
        if (newName === '') setErrorMessage("Ingresa un nombre no vacío.");
        else {
            modifyNameList(newName,newColor); 
            closePopup();}
    }
    
    const modifyNameList = (newName,newColor) => {

        setArrayOfLists(prevLists =>
            prevLists.map(list => 
                list.nameList === selectedList  // Compara el name
                ? { ...list, nameList: newName, color: newColor}  // Actualiza el nombre de la lista
                : list
            )
        );

        // También actualiza la lista seleccionada
        setSelectedList(newName);
        setSelectedListColor(newColor);
    }
    
    const deleteList = () => {

        // Filtra la lista de listas para eliminar la lista seleccionada
    const updatedLists = arrayOfLists.filter(list => list.nameList !== selectedList);

        // Actualiza el estado con la lista filtrada
        setArrayOfLists(updatedLists);

        // Si el array queda vacío, limpia la lista seleccionada
        if (updatedLists.length === 0) {
            setSelectedList('');
            setSelectedListItems([]);
            setSelectedListColor('#ffffff');
        } else {
            // Si quedan listas, selecciona la primera lista disponible
            setSelectedList(updatedLists[0].nameList);
            setSelectedListItems(updatedLists[0].items);
            setSelectedListColor(updatedLists[0].color);
        }

    }

    const addNewList = (nameNewList,listColor) => {
        // Verificar si ya existe una lista con el mismo nombre
        const foundList = arrayOfLists.find(list => list.nameList === nameNewList);
        //Se usa find en lugar de filter porque find devuelve el primer elemento que cumple con la condición o undefined si no se encuentra ninguno. 
    
        // Si ya existe una lista con el mismo nombre, no agregarla
        if (foundList) {
            return false;
        }
        else{
            // Si no existe una lista con el mismo nombre, agregar la nueva lista
            setArrayOfLists(prevLists => [
                ...prevLists,
                { nameList: nameNewList, items: [], color: listColor }
            ]);

            // Si es la primera lista, seleccionarla por defecto
            if (selectedList === '') {setSelectedList(nameNewList); setSelectedListColor(listColor);}
        return true;
        } 
    };

    // Actualizar el estado cuando se selecciona una lista del dropdown
    const handleSelectChange = (e) => {
        const name = e.target.value;
        setSelectedList(name);  // Actualizar la lista seleccionada

        // Encontrar la lista seleccionada y actualizar sus ítems
        const foundList = arrayOfLists.find(list => list.nameList === name);
        setSelectedListItems(foundList.items);
        setSelectedListColor(foundList.color);
    };

    // Función para actualizar los ítems de la lista seleccionada
    const updateItemsInList = useCallback((newItems) => {
        setArrayOfLists(prevLists =>
            prevLists.map(list => 
                list.nameList === selectedList 
                ? { ...list, items: newItems } 
                : list
            )
        );
    }, [selectedList]);

    return (
        <div>
            <header className="App-header">
                <h1>APP DE COMPRAS</h1>
            </header>

            <div className="App_div_container">
                    {/* Componente para crear una nueva lista */}
                    <NewList addNewListToArrayofLists_Callback={addNewList} />

                    {/* Mostrar mensaje si no hay listas, o el selector si hay listas */}
                    {arrayOfLists.length === 0 
                    ? (
                        <div className="div_NoItems">
                            <p className="p_App_NoItems">No hay ninguna lista que mostrar...</p>
                            <img src="/img/loader2.svg" alt="Loader" />
                        </div>
                    ) 
                    : (
                        <div className="App_div_container">
                            <div className='general_form'>
                                <h2 className='App_h2_selectList'>SELECCIONE UNA LISTA</h2>
                                <select className='AppSelectList' name="selectList" value={selectedList} onChange={handleSelectChange}>
                                    {arrayOfLists.map((listMap) => (
                                        <option key={listMap.nameList} value={listMap.nameList}>
                                            {listMap.nameList}
                                        </option>
                                    ))}
                                </select>
                                
                                <div className='general_form_group'>
                                    {/* Botón para abrir el popup de modificación */}
                                    <button className='item_button item_button_modify' onClick={openPopup}><i className="fa-solid fa-pen"></i></button>

                                    {/* Botón para eliminar el item */}
                                    <button className='cancel_button_popup' onClick={deleteList}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                            
                            {/* Mostrar popup solo si isPopupOpen es true */}
                            {isPopupOpen && (
                                <div className={`ventana-popup ${isPopupOpen ? 'show' : ''}`}>
                                    <div className="contenido-popup">
                                        {/* Formulario de modificación de item */}
                                        <form className="general_form" onSubmit={handleSubmit}>
                                                <label htmlFor='nameList'>Nuevo Nombre</label>
                                                <input className='input_NewItem' name="nameList" id='nameList' placeholder='Lista...' maxLength={25} defaultValue={selectedList} />
                                                <input name='color' type='color' defaultValue={selectedListColor}/>

                                                {errorMessage && <span className="general_error_message">{errorMessage}</span>}

                                                {/* Botón para confirmar la modificación */}
                                                <button type='submit' className='save_button_popup'>Guardar Cambios</button>
                                                {/* Botón para cerrar el popup */}
                                                <button type='button' className='cancel_button_popup' onClick={closePopup}>Cancelar</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {/* Componente para mostrar la lista de ítems seleccionada */}
                            <ActualList 
                                items={selectedListItems} 
                                updateItemsInList_Callback={updateItemsInList}
                                color={selectedListColor} 
                            />
                        </div>
                    )}
            </div>

            {console.table(arrayOfLists)}
        </div>
    );
}

export default App;
