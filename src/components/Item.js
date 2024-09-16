import './Item.css';
import {useState} from 'react';

export function Item({item, DeleteItemToList_Callback, ModifyItemToList_Callback, checkItem_Callback}) {
    // Estado para controlar la visibilidad del popup de modificación
    const [isPopupOpen,
        setPopupOpen] = useState(false);

    // Función para abrir el popup
    const openPopup = () => {
        setPopupOpen(true);
    };

    // Función para cerrar el popup
    const closePopup = () => {
        setPopupOpen(false);
    };

    const[quantityItem,setQuantityItem] = useState(Number(item.quantity));

    return (
        <div className='div_item'>
            {/* Mostrar detalles del item */}
            {console.log("El item que esta llegando a Item es: " + JSON.stringify(item))}

            <div className='div_item_info'>
                <h3 className={`${item.isChecked ? 'h3-item-checked' : ''}`}>Producto: {item.name} </h3>
                <h3 className={`${item.isChecked ? 'h3-item-checked' : ''}`}>Cantidad: {item.quantity}</h3>
            </div>

            <div>
                {item.isChecked 
                    ? <button className='button_info_item' onClick={() => checkItem_Callback(item.id)}><i className="fa-solid fa-arrow-turn-up"></i></button>
                    /* Botón para devolver item a lista de compras */
                    : <button className='button_info_item' onClick={() => checkItem_Callback(item.id)}><i className="fa-solid fa-check"></i></button>
                    /* Botón para confirmar item comprado */}

                
                {/* Botón para abrir el popup de modificación */}
                <button className='button_info_item' onClick={openPopup}><i className="fa-solid fa-pen"></i></button>

                {/* Botón para eliminar el item */}
                <button className='button_info_item' onClick={() => DeleteItemToList_Callback(item.id)}><i className="fa-solid fa-trash"></i></button>
            </div>

            {/* Mostrar popup solo si isPopupOpen es true */}
            {isPopupOpen && (
                <div className={`ventana-popup ${isPopupOpen ? 'show' : ''}`}>
                    <div className="contenido-popup">
                        {/* Formulario de modificación de item */}
                        <form id="newItemForm" onSubmit={(e) => ModifyItemToList_Callback(e, closePopup)}>
                            <div>
                                <label htmlFor='nameItem'>Producto:</label>
                                <input className='input_NewItem' name="nameItem" id='nameItem' placeholder='Producto...' maxLength={25} 
                                defaultValue={item.name}></input>
                            </div>

                            <div >
                                <label htmlFor='quantityItem'>Cantidad:</label>
                                <input  className='input_NewItem' name="quantityItem" id='quantityItem' min='0' type="number" placeholder='Cantidad...' 
                                value={quantityItem} 
                                onChange={(e) => setQuantityItem(Number(e.target.value))}></input>
                            </div>

                            <div className='form-group'>
                                <button type='button' onClick={() => setQuantityItem(prev => prev + 1)} className='buttonPlus_newItem'><i className="fa-solid fa-plus"></i></button>
                                <button type='button' onClick={() => setQuantityItem(prev => (prev <= 0 ? 0 : prev - 1))} className='buttonMinus_newItem'><i className="fa-solid fa-minus"></i></button>
                            </div>

                            {/* Botón para confirmar la modificación */}
                            <button className='button_info_item modify-button-popup'>Guardar Cambios</button>
                            {/* Botón para cerrar el popup */}
                            <button className='button_info_item cancel-button-popup' onClick={closePopup}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
