import { useState, useCallback, useEffect } from 'react';
import ActualList from './components/ActualList';
import NewList from './components/NewList';
import './App.css';

function App() {
    // Carga las listas guardadas desde localStorage, o un array vacío si no hay nada guardado
    const [arrayOfLists, setArrayOfLists] = useState(() => {
        const savedLists = localStorage.getItem('arrayOfLists');
        return savedLists ? JSON.parse(savedLists) : [];
    });

    const [selectedList, setSelectedList] = useState(() => {
        // Obtener los datos almacenados en localStorage
        const savedLists = JSON.parse(localStorage.getItem('arrayOfLists') || '[]');
        
        // Si hay listas, selecciona la primera; si no, deja el estado vacío
        return savedLists.length > 0 ? savedLists[0].nameList : '';
    });

    const [selectedListColor, setSelectedListColor] = useState(() => {
        // Obtener los datos almacenados en localStorage
        const savedLists = JSON.parse(localStorage.getItem('arrayOfLists') || '[]');
        
        // Si hay listas, selecciona la primera; si no, deja el estado vacío
        return savedLists.length > 0 ? savedLists[0].color : '';
    });

    const [selectedListItems, setSelectedListItems] = useState(() => {
        // Obtener los datos almacenados en localStorage
        const savedLists = JSON.parse(localStorage.getItem('arrayOfLists') || '[]');
        
        // Si hay listas, selecciona la primera; si no, deja el estado vacío
        return savedLists.length > 0 ? savedLists[0].items : '';
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Sincroniza arrayOfLists con localStorage cada vez que cambie
    useEffect(() => {
        console.log("Guardado");
        localStorage.setItem('arrayOfLists', JSON.stringify(arrayOfLists));
    }, [arrayOfLists]);

    const openPopup = () => setPopupOpen(true);
    const closePopup = () => setPopupOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData_Item = new FormData(e.target);
        let newName = formData_Item.get("nameList");
        let newColor = formData_Item.get("color");

        if (newName === '') setErrorMessage("Ingresa un nombre no vacío.");
        else {
            modifyNameList(newName, newColor);
            closePopup();
        }
    };

    const modifyNameList = (newName, newColor) => {
        setArrayOfLists(prevLists =>
            prevLists.map(list =>
                list.nameList === selectedList
                ? { ...list, nameList: newName, color: newColor }
                : list
            )
        );
        setSelectedList(newName);
        setSelectedListColor(newColor);
    };

    const deleteList = () => {
        const updatedLists = arrayOfLists.filter(list => list.nameList !== selectedList);
        setArrayOfLists(updatedLists);

        if (updatedLists.length === 0) {
            setSelectedList('');
            setSelectedListItems([]);
            setSelectedListColor('#ffffff');
        } else {
            setSelectedList(updatedLists[0].nameList);
            setSelectedListItems(updatedLists[0].items);
            setSelectedListColor(updatedLists[0].color);
        }
    };

    const addNewList = (nameNewList, listColor) => {
        const foundList = arrayOfLists.find(list => list.nameList === nameNewList);

        if (foundList) {
            return false;
        } else {
            setArrayOfLists(prevLists => [
                ...prevLists,
                { nameList: nameNewList, items: [], color: listColor }
            ]);

            if (selectedList === '') {
                setSelectedList(nameNewList);
                setSelectedListColor(listColor);
            }
            return true;
        }
    };

    const handleSelectChange = (e) => {
        const name = e.target.value;
        setSelectedList(name);

        const foundList = arrayOfLists.find(list => list.nameList === name);
        setSelectedListItems(foundList.items);
        setSelectedListColor(foundList.color);
    };

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
                <NewList addNewListToArrayofLists_Callback={addNewList} />
                {arrayOfLists.length === 0 ? (
                    <div className="div_NoItems">
                        <p className="p_App_NoItems">No hay ninguna lista que mostrar...</p>
                        <img src="/img/loader2.svg" alt="Loader" />
                    </div>
                ) : (
                    <div className="App_div_container">
                        <div className='general_form'>
                            <label className='App_label_selectList' htmlFor='selectList'>SELECCIONE UNA LISTA</label>
                            <select id="selectList" className='AppSelectList' name="selectList" value={selectedList} onChange={handleSelectChange}>
                                {arrayOfLists.map((listMap) => (
                                    <option key={listMap.nameList} value={listMap.nameList}>
                                        {listMap.nameList}
                                    </option>
                                ))}
                            </select>

                            <div className='general_form_group'>
                                <button className='item_button item_button_modify' onClick={openPopup} aria-label='Boton Modificar'>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button className='cancel_button_popup' onClick={deleteList} aria-label='Boton Cancelar'>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        {isPopupOpen && (
                            <div className={`ventana-popup ${isPopupOpen ? 'show' : ''}`}>
                                <div className="contenido-popup">
                                    <form className="general_form" onSubmit={handleSubmit}>
                                        <label htmlFor='nameList'>Nuevo Nombre</label>
                                        <input className='input_NewItem' name="nameList" id='nameList' placeholder='Lista...' maxLength={25} defaultValue={selectedList} />
                                        <label htmlFor='color'>Color de la lista</label>
                                        <input id='color' name='color' type='color' defaultValue={selectedListColor}/>
                                        {errorMessage && <span className="general_error_message">{errorMessage}</span>}
                                        <button type='submit' className='save_button_popup' aria-label='Boton Guardar'>Guardar Cambios</button>
                                        <button type='button' className='cancel_button_popup' onClick={closePopup}  aria-label='Boton Cancelar'>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        )}

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
