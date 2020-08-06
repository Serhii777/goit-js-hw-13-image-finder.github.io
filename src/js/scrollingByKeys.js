const colors = ['green', 'olive', 'yellow', 'tomato', 'orange'];

const refs = {
  demo: document.querySelector('.demo'),
  list: document.querySelector('.list'),
};

const counter = {
  index: 0,
};

const html = colors.map((e, i) => `<li class="list-item" data-index="${i}" style="background-color: ${e};"> Click me! </li> `).join('\n');

refs.list.insertAdjacentHTML('afterbegin', html)

const repaintBG = i => {
  refs.demo.style.backgroundColor = colors[i];
}

function setBG ({target}) {
  counter.index = +target.dataset.index;
  repaintBG(counter.index)
}

refs.list.addEventListener('click', setBG);

function setNextBG (event) {
  let i = 0;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown' ) {
    i = 1
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    i = -1;
  }
  counter.index = (counter.index + i ) % colors.length;
  repaintBG (  Math.abs(counter.index));
}

window.addEventListener('keydown', setNextBG);