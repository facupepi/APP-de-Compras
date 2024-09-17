import './NewItem.css';
import { useState } from 'react';

export function NewItem({addNewItemToList_Callback}) {

  const[nameItem,setNameItem] = useState('');
  const[quantityItem,setQuantityItem] = useState(0);

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
    <form id="newItemForm" onSubmit={handleSubmit}>

      <div className='div-group'>
        <label htmlFor='nameItem'>Nuevo Item:</label>
        <input className='input_NewItem' name="nameItem" id='nameItem' placeholder='Producto...' maxLength={25} value={nameItem} onChange={(e) => setNameItem(e.target.value)}></input>
      </div>

      <div className='div-group'>

        <div className='div-group'>
          <label htmlFor='quantityItem'>Cantidad:</label>
          <input className='input_NewItem' name="quantityItem" id='quantityItem' type="number" placeholder='Cantidad...' value={quantityItem} onChange={(e) => setQuantityItem(Number(e.target.value))}></input>
        </div>

        {/*Para evitar que al cambiar el valor, este se concatene como una cadena, se debe convertir el valor a un número. Esto se hace usando Number(e.target.value) en el manejador onChange del input de cantidad.*/}

      </div>

      <div className='div-group-buttons'>
        <button type='button' onClick={() => setQuantityItem(prev => prev + 1)} className='buttonPlus_newItem'><i className="fa-solid fa-plus"></i></button>
        <button type='button' onClick={() => setQuantityItem(prev => (prev <= 0 ? 0 : prev - 1))} className='buttonMinus_newItem'><i className="fa-solid fa-minus"></i></button>
      </div>

      <button type='submit' className='button_AddNewItem' >Agregar Item <i className="fa-solid fa-note-sticky"></i></button>
    </form>
  )
}