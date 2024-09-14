import './Item.css';
import {useState} from 'react';

export function Item({item, DeleteItemToList_Callback, ModifyItemToList_Callback}) {
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

    return (
        <div className='div_item'>
            {/* Mostrar detalles del item */}
            {console.log("El item que esta llegando a Item es: " + JSON.stringify(item))}

            <div className='div_item_info'>
                <h3>Producto: {item.name}</h3>
                <h3>Cantidad: {item.quantity}</h3>
            </div>

            <div className='div_item_buttons'>
                {/* Botón para eliminar el item */}
                <button onClick={DeleteItemToList_Callback(item.id)}>Eliminar</button>

                {/* Botón para abrir el popup de modificación */}
                <button onClick={openPopup}>Modificar</button>
            </div>

            {/* Mostrar popup solo si isPopupOpen es true */}
            {isPopupOpen && (
                <div className="ventana-popup">
                    <div className="contenido-popup">
                        {/* Formulario de modificación de item */}
                        <form id="newItemForm" onSubmit={(e) => ModifyItemToList_Callback(e, closePopup)}>
                            <div>
                                <label for='nameItem'>Producto:</label>
                                <input name="nameItem" id='nameItem' placeholder='Producto...' defaultValue={item.name}></input>
                            </div>
                            <div>
                                <label for='quantityItem'>Cantidad:</label>
                                <input name="quantityItem" id='quantityItem' type="number" min='0' placeholder='Cantidad...' defaultValue={item.quantity}></input>
                            </div>
                            {/* Botón para confirmar la modificación */}
                            <button className='modify-button-popup'>Modificar Item</button>
                        </form>

                        {/* Botón para cerrar el popup */}
                        <button onClick={closePopup}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    )
}
