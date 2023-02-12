import TMDBCtrl from "../TMDB/TMDB.controller.js";

export default class WatchlistController {

  /**
   * get popular movies
   *  @returns {JSON} status, message, data (array of movies)
   */
  static async apiGetPopularMovies(req, res, next) {
    try {
      const data = await TMDBCtrl.movieDiscoverData();

      //error?
      if(data === undefined){
        return res.status(503).json({
          status:503,
          message: `no movies found`
        })
      }
      
      return res.status(200).json({
          status:200,
          message: `${data.length} movies found`, 
          data
      })
    }
    catch (err) {
      return next(err);
    }
  };

  /**
   * get popular tv series
   *  @returns {JSON} status, message, data (array of tv series)
   */
  static async apiGetPopularTv(req, res, next) {
    try {
      const data = await TMDBCtrl.tvDiscoverData() || undefined;

      //error?
      if(data === undefined){
        return res.status(503).json({
          status:503,
          message: `no tv series found`
        })
      }
      
      return res.status(200).json({
          status:200,
          message: `${data.length} tv series found`, 
          data
      })
    }
    catch (err) {
      return next(err);
    }
  };

  /**\   * get popular tv series
   *  @returns {JSON} status, message, data (array of tv series)
   */
  static async apiGetTvSeries(req, res, next) {
    try {
      let tvID = req.query.tvid || req.params.tvid || undefined;
      //console.log(req.params);
      //console.log(req.query);
      //console.log(req);
      
      //error?
      if(tvID === undefined){
        return res.status(503).json({
          status:503,
          message: `no tv series found`
        })
      }
      
      const data = await TMDBCtrl.tvData(tvID);

      return res.status(200).json({
          status:200, 
          data
      })
      
    }
    catch (err) {
      return next(err);
    }
    
  };

    /**\   * get popular tv series
   *  @returns {JSON} status, message, data (array of tv series)
   */
  static async apiGetTvSeriesSeason(req, res, next) {
    try {
      let tvID = req.params.tvid || undefined;
      let seasonNum = req.params.snum || 1;
      
      const data = await TMDBCtrl.tvSeasonData(tvID,seasonNum);

      return res.status(200).json({
          status:200, 
          data
      })
      
    }
    catch (err) {
      return next(err);
    }
    
  };
}