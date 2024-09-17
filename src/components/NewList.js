import './NewList.css';
import { useState } from 'react';

export default function NewList({addNewListToArrayofLists_Callback}) {

    const [nameList,setNameList] = useState('');

    const handleOnClick = () => {
        if(nameList === ''){
            alert("Asigna un nombre a tu nueva lista...");
        }
        else{
            if(nameList.length < 3)alert("Asigna un nombre a tu nueva lista que sea mayor a 3 caracteres...");
            else if(addNewListToArrayofLists_Callback(nameList)) setNameList(''); // Resetear los estados después de agregar una nueva lista
            else alert("Ya existe una lista con ese nombre. Asigna otro...");
        }
    }
    
  return(
    <div id="newListDiv">

      <div>
        <label htmlFor='nameList'>Nueva Lista:</label>
        <input className='input_NewList' name="nameList" id='nameList' placeholder='Lista...' maxLength={25} 
              value={nameList} onChange={(e) => setNameList(e.target.value)}></input>
      </div>

      <button className='button_AddNewList' onClick={handleOnClick}>Agregar Lista <i className="fa-solid fa-clipboard-list"></i></button>
    </div>
  )
}
