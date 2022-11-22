const { Router } = require("express");
const axios = require("axios");
const validator = require("validator");
const { Race, Temperament } = require("../db");
const { API_KEY } = process.env;
const url = "https://api.thedogapi.com/v1/breeds";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* 


{ metic: "Nan" }
{ metric: "NaN - 8" }
{ metric: "2 - 8" }
*/

const getApiInfo = async () => {
  let resultApi = await axios.get(`${url}?api_key=${API_KEY}`);
  let dogsApiInfo = resultApi.data.map((el) => {
    let weight = el.weight.metric.split(" - ");
    let height = el.height.metric.split(" - ");
    let life_span = el.life_span.split(" - ");
    let life_span_max = el.life_span[1].split("y");

    return {
      id: el.id,
      name: el.name,
      img: el.image.url,
      weight_min: weight[0] !== "NaN" ? weight[0] : "Not found",
      weight_max: weight[1] !== undefined ? weight[1] : "Not found",
      height_min: height[0] !== "NaN" ? height[0] : "Not found",
      height_max: height[1] !== undefined ? height[1] : "Not found",
      life_span_min: life_span[0],
      life_span_max: life_span_max[0],
      temps: el.temperament,
      origin: el.origin,
    };
  });
  return dogsApiInfo;
};

router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    const dogsApiInfo = await getApiInfo();
    const dogsDb = await Race.findAll();
    const allDogs = [...dogsDb, ...dogsApiInfo];
    if (!name) {
      res.status(200).send(allDogs);
    } else {
      const filterDogs = allDogs.filter((el) => {
        return el.name.toLowerCase().includes(name.toLowerCase());
      });
      filterDogs.length
        ? res.status(200).send(filterDogs)
        : res.status(404).json({ msg: "Race not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/dogs/:idRace", async (req, res) => {
  try {
    const { idRace } = req.params;
    const isUUIDv4 = await validator.isUUID(idRace);
    if (isUUIDv4) {
      const dbRace = await Race.findByPk(idRace);
      res.status(200).send(dbRace);
    } else {
      const dogsApiInfo = await getApiInfo();
      const apiRace = dogsApiInfo.filter((el) => {
        console.log(el);
        return el.id === parseInt(idRace);
      });
      res.status(200).send(apiRace);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/dogs", async (req, res) => {
  try {
    const {
      name,
      img,
      weight_max,
      weight_min,
      height_max,
      height_min,
      life_span_min,
      life_span_max,
      temps,
      origin,
    } = req.body;
    if (!name || !weight_max || !weight_min || !height_max || !height_min) {
      throw Error("Faltan datos para crear el perro");
    } else {
      const newRace = await Race.create({
        name,
        img,
        weight_max,
        weight_min,
        height_max,
        height_min,
        life_span_max,
        life_span_min,
        temps,
        origin,
      });
      console.log(newRace);
      res.status(200).send(newRace);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    // ****** Ruta para traer de la api y guardar en la DB ******
    // -
    // -
    // const dogsApiInfo = await getApiInfo();
    // let allTemps = [];
    // dogsApiInfo.forEach((el) => {
    //   if (el.temperaments) {
    //     let dogTemperaments = el.temperaments.split(", ");
    //     allTemps = [...allTemps, ...dogTemperaments];
    //   }
    // });
    // const filteredTempsValues = [];
    // const filteredTemps = [];
    // allTemps.forEach((el) => {
    //   if (!filteredTempsValues.includes(el)) {
    //     filteredTempsValues.push(el);
    //     filteredTemps.push({ name: el });
    //   }
    // });
    // console.log(filteredTemps);
    // const tempsFromApixDB = await Temperament.bulkCreate(filteredTemps);
    // console.log(filteredTemps);
    // res.status(200).send("Temperaments was created in database");
    // -
    // -
    // ********* Ruta para mostrar desde la DB *********
    // -
    // -
    const DBtemps = await Temperament.findAll();
    DBtemps.length
      ? res.status(200).send(DBtemps)
      : res.status(404).send("Temperaments not found");
    // -
    // -
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

module.exports = router;
