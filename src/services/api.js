import axios from 'axios';

const BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTickets = async () => {
  let data;
  try {
    const response = await axios.get(BASE_URL);
    data=response.data
  } catch (error) {
    console.log(error);
  }
  
  return data;
};
