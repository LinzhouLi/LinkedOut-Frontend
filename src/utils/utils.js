const getProperTimeString=(str) => {
    return str.split('T')[0]+' '+str.split('T')[1].split('.')[0];
}

export {getProperTimeString}