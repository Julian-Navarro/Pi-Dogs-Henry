import axios from "axios";
//import { GET_DOGS } from "../types";
const GET_DOGS = "GET_DOGS";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function refreshDogs() {
  return async function (dispatch) {
    return dispatch({
      type: "REFRESH_DOGS",
    });
  };
}
export function filterDogsOrigin(isTakenFromDb) {
  return async function (dispatch) {
    if (isTakenFromDb) {
      return dispatch({
        type: "FILTER_DB_DOGS",
      });
    } else {
      return dispatch({
        type: "FILTER_API_DOGS",
      });
    }
  };
}

export function orderWeight(ascOrDesc) {
  return async function (dispatch) {
    if (ascOrDesc === "Default") {
      return dispatch({
        type: "REFRESH_DOGS",
      });
    }
    if (ascOrDesc === "ASC") {
      return dispatch({
        type: "SORT_BY_MAX_VALUE_ASC",
      });
    } else {
      console.log(ascOrDesc);
      return dispatch({
        type: "SORT_BY_MAX_VALUE_DESC",
      });
    }
  };
}

export function orderAlf(ascOrDesc) {
  return async function (dispatch) {
    if (ascOrDesc === "ASC") {
      return dispatch({
        type: "ORDER_ALF_ASC",
      });
    } else {
      return dispatch({
        type: "ORDER_ALF_DESC",
      });
    }
  };
}

export function getTemps() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/temperaments", {});
    return dispatch({
      type: "GET_TEMPS",
      payload: json.data,
    });
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/dogs", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
export function searchByRace(race) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/dogs?name=${race}`);
      return dispatch({
        type: "SEARCH_BY_RACE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterTemps(arrayTemps) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs");
      let array = [];
      arrayTemps.forEach((t) => {
        json.data.forEach((el) => {
          console.log(el);
          el.temps ? (el.temps.includes(t) ? array.push(el) : null) : null;
        });
      });
      return dispatch({
        type: "FILTER_TEMP",
        payload: array,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs");
      const res = json.data.filter((d) => d.id.toString() === id);
      return dispatch({
        type: "GET_DETAIL",
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteTemp(e) {
  return async function (dispatch) {
    return dispatch({
      type: "DELETE_TEMP",
      payload: e.target.value,
    });
  };
}
