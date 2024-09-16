// Función de validación de item
export function validateItem(name, quantity) {
    if (name === '') {
        alert('Ingresa un producto con un nombre no vacío...');
        return false;
    } else if (quantity <= 0) {
        alert('Ingresa un producto con una cantidad mayor a 0...');
        return false;
    }
    return true;
}