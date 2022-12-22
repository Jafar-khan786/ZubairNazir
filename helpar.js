const { Console } = require('console');

const isEmpty = (value) => (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )


  const getTime = () =>{
    return  new Date().toTimeString().slice(0,8);
  } 
  
   const getcurntDate = () =>{
      let date = new Date();
    var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yyyy = date.getFullYear();
            if (dd < 10) {
              dd = '0' + dd;
            }
            if (mm < 10) {
              mm = '0' + mm;
            }
            //return dd + '/' + mm + '/' + yyyy;
                 return yyyy + '-' + mm + '-' +dd ;
    
    
  }  



module.exports = {isEmpty,getTime,getcurntDate};