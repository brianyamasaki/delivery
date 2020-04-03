import axios from 'axios';

export default axios.create({
  baseURL: 'http://wa.catch22delivery.com/wp-json/wp/v2'
});
