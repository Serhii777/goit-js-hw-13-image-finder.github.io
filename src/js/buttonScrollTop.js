// document
//   .querySelector('#scrollTtop-button')
//   .addEventListener('click', function () {
//     let scrolled = window.pageYOffset;
//     scrollTop(scrolled, 1);
//   });

// function scrollTop(endPos, i) {
//   setTimeout(function () {
//     if (parseInt(endPos) > 0) {
//       let y = parseInt(endPos) - 5 * parseInt(i);
//       window.scroll(0, y); //Устанавливаем новую позицию вертикального скрола
//       scrollTop(y, parseInt(i) + 2); //Рекурсивный вызов функции
//     }
//   }, 10);
// }

window.onscroll = function () {
  let scrollElement = document.querySelector('#scrollTtop-button');
  console.dir(scrollElement);
  // console.log(document.body.scrollTop);
  console.log(document.documentElement.scrollTop);
  console.log(document.documentElement.clientHeight);
  // console.log(document.documentElement.scrollTop);
  
  // console.dir(scrollElement.style.opasity);

  if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
    // scrollElement.style.opasity = '1';
    scrollElement.classList.remove('is-hidden');

  } else {
    // scrollElement.style.opasity = '0';
    scrollElement.classList.add('is-hidden');
  }
};

// let timeOut;
function goToUp() {
  let top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop,
  );
  if (top > 0) {
    window.scrollBy(0, -100);
    let timeOut = setTimeout(goToUp(), 20);
  } else clearTimeout(timeOut);
}
