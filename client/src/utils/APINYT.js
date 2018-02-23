import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getArticlesfromAPI: function(topic, startDate, endDate) {
    return axios.get("/api/nyt", {params: topic, startDate, endDate});
    
  }
};
