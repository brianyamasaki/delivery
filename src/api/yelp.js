import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer rdawz9lXGkNbSHoDo32Xw6I8HBd_SSh37It3b6ix7lT2ObK7Uo2hlUM9f_TT59sVh2Obb4Iel-AsK8jo04brlhXu5N_58UuoQecnjc74eUGqe8c9r_Ll2iN_Sm1-XnYx`
  }
});
