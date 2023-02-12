import express from "express";
import WatchlistCtrl from "./watchlist.controller.js";

const router = express.Router();

//router.route("/").get((req, res) => { res.send("hello") });

router.route("/moviediscover").get(WatchlistCtrl.apiGetPopularMovies);
router.route("/tvdiscover").get(WatchlistCtrl.apiGetPopularTv);
router.route("/tvseries").get(WatchlistCtrl.apiGetTvSeries);
router.route("/tvseries/:tvid").get(WatchlistCtrl.apiGetTvSeries);
router.route("/tvseries/:tvid/season/:snum").get(WatchlistCtrl.apiGetTvSeriesSeason);

export default router;