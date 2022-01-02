const getProperTimeString = (str) => {
    return str.split('T')[0]+' '+str.split('T')[1].split('.')[0];
}

const dialogWidth = (str) => {
    let val = document.body.clientWidth;
    const def = 768; // xs
    if (val < def) {
      return '98%'
    } else {
      return str;
    }
  }

export { getProperTimeString, dialogWidth }