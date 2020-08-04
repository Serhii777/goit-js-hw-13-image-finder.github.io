// import galleryTemplate from '../templates/pixabayGallery.hbs';
import galleryTemplate from '../templates/photoGallery.hbs';

const galleryRef = document.querySelector('.js-gallery');

//* 'https://pixabay.com/api/?key=17627900-033e401422c15b0db6e889732&q=yellow+flowers&image_type=photo'

const picturesRef = 'https://pixabay.com/api/';
const key = '?key=17627900-033e401422c15b0db6e889732';
const choose = '&q=art+body';
const type = '&image_type=photo';

fetch(picturesRef + key + choose + type)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.hits);

    renderGallery(data.hits);
  });

function renderGallery(pictures) {
  const gallery = pictures.map(picture => galleryTemplate(picture)).join('');
  console.log(gallery);

  galleryRef.insertAdjacentHTML('beforeend', gallery);
}
