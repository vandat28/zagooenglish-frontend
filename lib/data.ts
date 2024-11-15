import { API_TOPIC} from "@/constants/api";
import axios from 'axios';
import { API_DASHBOARD_UPDATE_VISITS } from "@/constants/api";

export async function getTopicTitle(id: number){
    return axios
    .get(`${API_TOPIC}/${id}`)
    .then((response) => {
      if (!response.data) {
        throw new Error("Empty response data");
      }
      return {
        title: `Zagoo English - Học | ${response.data.result.name}`,
        description: "",
      };
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Return default metadata or handle the error case
      return {
        title: "Default Title",
        description: "Default Description",
      };
    });
}


export async function updateVisits(){
  return  axios.post(`${API_DASHBOARD_UPDATE_VISITS}`, {});
}
