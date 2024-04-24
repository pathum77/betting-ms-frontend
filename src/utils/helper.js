import Swal from "sweetalert2";
import { CONSTANTS } from "./constants";

//sweet alert
async function swal(title, text, icon, cancelBtn, confirmButtonText, isAllFunc, isConfirmedFunc, isDeniedFunc) {
  let themeData = localStorage.getItem('themeData');

  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: cancelBtn,
    cancelButtonColor: 'red',
    confirmButtonColor: CONSTANTS.COLOR_PRIMARY,
    confirmButtonText: confirmButtonText,
    color: themeData === 'dark' ? 'white' : 'black',
    background: themeData === 'dark' ? CONSTANTS.COLOR_FG_DARK : '',
  });
  if (isAllFunc.toString() !== '() => {}') {
    isAllFunc();
  } else {
    if (result.isConfirmed) {
      isConfirmedFunc();
    } else if (result.dismiss === 'cancel') {
      isDeniedFunc();
    } else {
      isAllFunc();
    }
  }
}

//intersection observer
function createObserver(target, handleIntersectionCallback) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        handleIntersectionCallback();
      }
    });
  }, options);

  observer.observe(target);
}

//get current date
function getCurrentDate() {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}

export { swal, createObserver, getCurrentDate };