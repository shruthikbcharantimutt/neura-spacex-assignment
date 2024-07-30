import { defineStore } from "pinia";
import axios from "axios";
interface Launch {
  flight_id: string;
  date_utc: string;
  name: string;
  flight_number: number;
}
const requestUrl = "http://localhost:3001/api/launches";
export const useLaunchesStore = defineStore("launches", {
  state: () => ({
    launches: [] as Launch[],
    savedLaunches: [] as Launch[],
  }),
  actions: {
    async fetchLaunches() {
      try {
        const response = await axios.get(`${requestUrl}/`, {});
        this.launches = response.data;
      } catch (error) {
        console.error("Failed to fetch launches:", error);
      }
    },
    async saveLaunch(launch: Launch) {
      try {
        const response = await axios.post(`${requestUrl}/save`, launch);
        this.savedLaunches.push(response.data);
      } catch (error) {
        console.error("Failed to save launch:", error);
      }
    },
    async fetchSavedLaunches() {
      try {
        const response = await axios.get(`${requestUrl}/savedLaunches`);
        this.savedLaunches = response.data;
      } catch (error) {
        console.error("Failed to fetch saved launches:", error);
      }
    },
    async deleteLaunch(id: number) {
      try {
        await axios.delete(`${requestUrl}/delete/${id}`);
        this.savedLaunches = this.savedLaunches.filter(
          (launch:Launch) => launch.flight_number !== id
        );
      } catch (error) {
        console.error("Failed to delete launch:", error);
      }
    },
  },
});
