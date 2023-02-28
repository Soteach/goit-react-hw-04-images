const baseURL = 'https://pixabay.com/api/?';
const options = '&image_type=photo&orientation=horizontal=photo';
const key = '30152134-ae58c77c91fd8c4469302fe78';
const perPage = 12;

export default function ImageAPI(querry, page) {
  const URL = `${baseURL}key=${key}&q=${querry}&page=${page}${options}&per_page=${perPage}`;

  return fetch(URL).then(response => {
    return response.json();
  });
}
