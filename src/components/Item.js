import './Item.css';
import {useState} from 'react';

export function Item({item, DeleteItemToList_Callback, ModifyItemToList_Callback, checkItem_Callback}) {
    // Estado para controlar la visibilidad del popup de modificación
    const [isPopupOpen,setPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Función para abrir el popup
    const openPopup = () => setPopupOpen(true);

    // Función para cerrar el popup
    const closePopup = () => setPopupOpen(false);

    const[quantityItem,setQuantityItem] = useState(Number(item.quantity));

    function validateItem(name, quantity) {
        if (name === '') {
            setErrorMessage('El nombre no puede ser vacío.');
            return false;
        } else if (quantity <= 0) {
            setErrorMessage('Ingresa una cantidad mayor a 0.');
            return false;
        }
        setErrorMessage('');
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    
        const formData_Item = new FormData(e.target); // Crea un objeto FormData para obtener los datos del formulario
        let name = formData_Item.get("nameItem"); // Obtiene el valor del campo "nameItem"
        let quantity = formData_Item.get("quantityItem"); // Obtiene el valor del campo "quantityItem"
        
        if (validateItem(name, quantity)) {
            ModifyItemToList_Callback(item.id, name, quantity);
            closePopup();
        }
    }

    return (
        <div className='item_div'>
            {console.log("El item que esta llegando a Item es: " + JSON.stringify(item))}

            <div>
                <h3   className={`${item.isChecked ? 'item_h3_checked' : ''}`}>Producto</h3>
                <span className={`${item.isChecked ? 'item_h3_checked' : ''}`}>{item.name}</span>
                <h3   className={`${item.isChecked ? 'item_h3_checked' : ''}`}>Cantidad</h3>
                <span className={`${item.isChecked ? 'item_h3_checked' : ''}`}>{item.quantity}</span>
            </div>

            <div>
                {item.isChecked 
                    ? <button className='item_button item_button_checked' onClick={() => checkItem_Callback(item.id)}><i className="fa-solid fa-arrow-turn-up"></i></button>
                    /* Botón para devolver item a lista de compras */
                    : <button className='item_button item_button_checked' onClick={() => checkItem_Callback(item.id)}><i className="fa-solid fa-check"></i></button>
                    /* Botón para confirmar item comprado */
                }
                
                {/* Botón para abrir el popup de modificación */}
                <button className='item_button item_button_modify' onClick={openPopup}><i className="fa-solid fa-pen"></i></button>

                {/* Botón para eliminar el item */}
                <button className='item_button item_button_delete' onClick={() => DeleteItemToList_Callback(item.id)}><i className="fa-solid fa-trash"></i></button>
            </div>

            {/* Mostrar popup solo si isPopupOpen es true */}
            {isPopupOpen && (
                <div className={`ventana-popup ${isPopupOpen ? 'show' : ''}`}>
                    <div className="contenido-popup">
                        {/* Formulario de modificación de item */}
                        <form className="general_form" onSubmit={(e) => handleSubmit(e)}>

                                <label htmlFor='nameItem'>Producto</label>
                                <input className='general_input' name="nameItem" id='nameItem' placeholder='Producto...' maxLength={25} defaultValue={item.name}></input>

                                <label htmlFor='quantityItem'>Cantidad</label>
                                <input className='general_input' name="quantityItem" id='quantityItem' min='0' type="number" placeholder='Cantidad...' value={quantityItem} onChange={(e) => setQuantityItem(Number(e.target.value))}></input>

                            <div>
                                <button type='button' onClick={() => setQuantityItem(prev => prev + 1)} className='general_buttonPlus'><i className="fa-solid fa-plus"></i></button>
                                <button type='button' onClick={() => setQuantityItem(prev => (prev <= 0 ? 0 : prev - 1))} className='general_buttonMinus'><i className="fa-solid fa-minus"></i></button>
                            </div>

                            {errorMessage && <span className="general_error_message">{errorMessage}</span>}

                            {/* Botón para confirmar la modificación */}
                            <button type='submit' className='save_button_popup'>Guardar Cambios</button>
                            {/* Botón para cerrar el popup */}
                            <button className='cancel_button_popup' onClick={closePopup}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
