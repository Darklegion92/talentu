export const getAge = (fecha: string) => {
console.log("entra?");

    const now = new Date();
    const birthday = new Date(fecha);
    let age = now.getFullYear() - birthday.getFullYear();
    const m = now.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) {
        age--;
    }

    return age || 0; 
}