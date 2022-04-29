export const getCashBoxId = () => {
     const cb = localStorage.getItem('cb');
     const cbSeperate = cb.split(',');
     const id = cbSeperate[1].slice(0, 1);
     return id;
} 

export const getCCBCOId = () => {
     const cb = localStorage.getItem('ccbo');
     const cbSeperate = cb.split(',');
     const id = cbSeperate[1].split('.');
     return id[0];
}

export const generateId = (id) => {
     return `${Date.now() * 5235},${id}.${Date.now()*9658},${Date.now()*968},${Date.now()*987}`
}

export const generateIdentify = () => {
     /*
          This function generate a unique id for key in the children
     */
     const random = Math.random().toString(36).substring(2);

     const fecha = Date.now().toString(36);

     return random + fecha;
}