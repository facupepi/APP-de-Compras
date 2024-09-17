import './Item.css';
import {useState} from 'react';

export function Item({item, DeleteItemToList_Callback, ModifyItemToList_Callback, checkItem_Callback}) {
    // Estado para controlar la visibilidad del popup de modificación
    const [isPopupOpen,setPopupOpen] = useState(false);

    // Función para abrir el popup
    const openPopup = () => setPopupOpen(true);

    // Función para cerrar el popup
    const closePopup = () => setPopupOpen(false);

    const[quantityItem,setQuantityItem] = useState(Number(item.quantity));

    function validateItem(name, quantity) {
        if (name === '') {
            alert('Ingresa un producto con un nombre no vacío...');
            return false;
        } else if (quantity <= 0) {
            alert('Ingresa un producto con una cantidad mayor a 0...');
            return false;
        }
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
        <div className='div_item'>
            {console.log("El item que esta llegando a Item es: " + JSON.stringify(item))}

            <div className='div_item_info'>
                <h3   className={`${item.isChecked ? 'h3-item-checked' : ''}`}>Producto</h3>
                <span className={`${item.isChecked ? 'h3-item-checked' : ''}`}>{item.name}</span>
                <h3   className={`${item.isChecked ? 'h3-item-checked' : ''}`}>Cantidad</h3>
                <span className={`${item.isChecked ? 'h3-item-checked' : ''}`}>{item.quantity}</span>
            </div>

            <div className='div_item_buttons'>
                {item.isChecked 
                    ? <button className='button_info_item button_checked' onClick={() => checkItem_Callback(item.id)}><i className="fa-solid fa-arrow-turn-up"></i></button>
                    /* Botón para devolver item a lista de compras */
                    : <button className='button_info_item button_checked' onClick={() => checkItem_Callback(item.id)}><i className="fa-solid fa-check"></i></button>
                    /* Botón para confirmar item comprado */}

                
                {/* Botón para abrir el popup de modificación */}
                <button className='button_info_item button_modify' onClick={openPopup}><i className="fa-solid fa-pen"></i></button>

                {/* Botón para eliminar el item */}
                <button className='button_info_item button_delete' onClick={() => DeleteItemToList_Callback(item.id)}><i className="fa-solid fa-trash"></i></button>
            </div>

            {/* Mostrar popup solo si isPopupOpen es true */}
            {isPopupOpen && (
                <div className={`ventana-popup ${isPopupOpen ? 'show' : ''}`}>
                    <div className="contenido-popup">
                        {/* Formulario de modificación de item */}
                        <form id="newItemForm" onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label htmlFor='nameItem'>Producto:</label>
                                <input className='input_NewItem' name="nameItem" id='nameItem' placeholder='Producto...' maxLength={25} defaultValue={item.name}></input>
                            </div>

                            <div >
                                <label htmlFor='quantityItem'>Cantidad:</label>
                                <input className='input_NewItem' name="quantityItem" id='quantityItem' min='0' type="number" placeholder='Cantidad...' value={quantityItem} onChange={(e) => setQuantityItem(Number(e.target.value))}></input>
                            </div>

                            <div className='form-group'>
                                <button type='button' onClick={() => setQuantityItem(prev => prev + 1)} className='buttonPlus_newItem'><i className="fa-solid fa-plus"></i></button>
                                <button type='button' onClick={() => setQuantityItem(prev => (prev <= 0 ? 0 : prev - 1))} className='buttonMinus_newItem'><i className="fa-solid fa-minus"></i></button>
                            </div>

                            {/* Botón para confirmar la modificación */}
                            <button type='submit' className='modify-button-popup'>Guardar Cambios</button>
                            {/* Botón para cerrar el popup */}
                            <button className='cancel-button-popup' onClick={closePopup}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
