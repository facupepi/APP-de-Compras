import './NewItem.css';
import { useState } from 'react';

export function NewItem({addNewItemToList_Callback}) {

  const[nameItem,setNameItem] = useState('');
  const[quantityItem,setQuantityItem] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  function validateItem(name, quantity) {
    if (name === '') { setErrorMessage('El item no puede ser vacío...'); return false;} 
    else if (quantity <= 0) {setErrorMessage('La cantidad debes ser mayor a 0...'); return false;}
    else{setErrorMessage(''); return true;}
  }

   // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Evitar la recarga de la página al enviar el formulario

    if (validateItem(nameItem, quantityItem)){
      // Ejecutar la callback con el evento del formulario
      addNewItemToList_Callback(e);

      // Resetear los estados después de agregar un nuevo item
      setNameItem('');
      setQuantityItem(0);
    }
  }

  return(
    <form className="general_form" onSubmit={handleSubmit}>

      <div>
        <label className='general_label' htmlFor='nameItem'>Nuevo Item</label>
        <input className='general_input' name="nameItem" id='nameItem' placeholder='Producto...' maxLength={25} value={nameItem} onChange={(e) => setNameItem(e.target.value)}></input>
      </div>

      <div>
        <label className='general_label' htmlFor='quantityItem'>Cantidad</label>
        <input className='general_input' name="quantityItem" id='quantityItem' type="number" placeholder='Cantidad...' value={quantityItem} onChange={(e) => setQuantityItem(Number(e.target.value))}></input>
      </div>

        {/*Para evitar que al cambiar el valor, este se concatene como una cadena, se debe convertir el valor a un número. Esto se hace usando Number(e.target.value) en el manejador onChange del input de cantidad.*/}

      <div className='general_div_group_buttons'>
        <button type='button' onClick={() => setQuantityItem(prev => prev + 1)} className='general_buttonPlus'><i className="fa-solid fa-plus"></i></button>
        <button type='button' onClick={() => setQuantityItem(prev => (prev <= 0 ? 0 : prev - 1))} className='general_buttonMinus'><i className="fa-solid fa-minus"></i></button>
      </div>

      <button type='submit' className='general_button_add' >Agregar Item <i className="fa-solid fa-note-sticky"></i></button>

      {errorMessage && <span className="general_error_message">{errorMessage}</span>}
    </form>
  )
}