import './NewList.css';
import { useState } from 'react';

export default function NewList({addNewListToArrayofLists_Callback}) {

    const [nameList,setNameList] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [listColor, setlistColor] = useState('#ffffff'); // Estado para el color de fondo

    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (nameList === '') setErrorMessage("Asigna un nombre a tu nueva lista...");
      else if (nameList.length < 3) setErrorMessage("Ingresa al menos 3 caracteres...");
      else if (addNewListToArrayofLists_Callback(nameList,listColor)) {setNameList(''); setErrorMessage('');}
      else setErrorMessage("Ya existe una lista con ese nombre...");
  }
    
  return(
    <form className="general_form" onSubmit={(e) => handleOnSubmit(e)}>
      <label className='general_label' htmlFor='nameList'>Nueva Lista</label>
      <input className='general_input' name="nameList" id='nameList' placeholder='Lista...' maxLength={25} 
              value={nameList} onChange={(e) => setNameList(e.target.value)}></input>

      <label className='general_label' htmlFor='color'>Color de la lista</label>
      <input id='color' name='color' type='color' defaultValue={'#ffffff'} onChange={(e) => setlistColor(e.target.value)}></input>

      <button type='submit' className='general_button_add' aria-label='Boton Agregar'>Agregar Lista <i className="fa-solid fa-clipboard-list"></i></button>

      {errorMessage && <span className="general_error_message">{errorMessage}</span>}
    </form>
  )
}
