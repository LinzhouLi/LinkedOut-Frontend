const getProperTimeString = (str) => {
    return str.split('T')[0]+' '+str.split('T')[1].split('.')[0];
}

const dialogWidth = (str) => {
    let val = document.body.clientWidth;
    if (val < 768) { // xs
      return '98%'
    } else {
      return str;
    }
  }

export { getProperTimeString, dialogWidth }