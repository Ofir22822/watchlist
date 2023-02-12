import axios from "axios";

const TMDB_API_KEY = process.env['TMDB_API_KEY'];

const TMDB_URL = "https://api.themoviedb.org/3";
const TMDB_URL_MOVIE = TMDB_URL + "/discover/movie";
const TMDB_URL_TV = TMDB_URL + "/discover/TV";
const TMDB_URL_SEARCH = TMDB_URL + "/search";

//const TEST_APILINK = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=${TMDB_API_KEY}`;

export default class TMDBController {

  /**
   * Fetch popular movies from TMDB
   *  @returns {Array} movies
   */
  static async movieDiscoverData() {
    try {
      let result;
      await axios
        .get(TMDB_URL + "/discover/movie?sort_by=popularity.desc&page=1&api_key=" + TMDB_API_KEY)
        .then((response) => {
          result = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    }
    catch (error) {
      console.error(error);
    }

  }

  /**
   * Fetch popular tv series from TMDB
   *  @returns {Array} tv series
   */
  static async tvDiscoverData() {
    try {
      let result;
      await axios
        .get(TMDB_URL + "/discover/tv?sort_by=popularity.desc&page=1&api_key=" + TMDB_API_KEY)
        .then((response) => {
          result = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    }
    catch (error) {
      console.error(error);
    }

  }

  /**
   * Fetch tv series from TMDB by series ID
   *  @returns tv series details
   */
  static async tvData(tvID) {
    try {
      let result;
      const url = `${TMDB_URL}/tv/${tvID}?api_key=${TMDB_API_KEY}&language=en-US`;
      await axios
        .get(url)
        .then((response) => {
          result = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return result;
    }
    catch (error) {
      console.error(error);
    }

  }

    /**
   * Fetch tv series season from TMDB by series ID
   *  @returns tv series details
   */
  static async tvSeasonData(tvID, seasonNum) {
    try {
      let result;
      const url = `${TMDB_URL}/tv/${tvID}/season/${seasonNum}?api_key=${TMDB_API_KEY}&language=en-US`;
      await axios
        .get(url)
        .then((response) => {
          result = response.data;
        })
        .catch((error) => {         
          console.log(error);
          return error;
        });
      return result;
    }
    catch (error) {
      console.error(error);
    }

  }
}