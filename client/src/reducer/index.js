const validator = require("validator");
const initialState = {
  dogs: [],
  allDogs: [],
  temps: [],
  tempsToFilter: [],
  dogDetail: [],
  defaultDogs: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        defaultDogs: action.payload,
      };
    case "REFRESH_DOGS":
      return {
        ...state,
        dogs: state.allDogs,
        defaultDogs: state.allDogs,
      };
    case "FILTER_DB_DOGS":
      return {
        ...state,
        dogs: state.allDogs.filter((dog) =>
          validator.isUUID(dog.id.toString())
        ),
        defaultDogs: state.allDogs.filter((dog) =>
          validator.isUUID(dog.id.toString())
        ),
      };
    case "FILTER_API_DOGS":
      return {
        ...state,
        dogs: state.allDogs.filter(
          (dog) => !validator.isUUID(dog.id.toString())
        ),
        defaultDogs: state.allDogs.filter(
          (dog) => !validator.isUUID(dog.id.toString())
        ),
      };
    case "SORT_BY_MAX_VALUE_ASC":
      return {
        ...state,
        dogs: state.dogs
          .map((e) => e)
          .sort((a, b) => {
            if (a.weight_max === "Not found") {
              return 1;
            }
            if (b.weight_max === "Not found") {
              return -1;
            }
            if (Number(a.weight_max) > Number(b.weight_max)) {
              return 1;
            }
            if (Number(a.weight_max) === Number(b.weight_max)) {
              return 0;
            }
            if (Number(a.weight_max) < Number(b.weight_max)) {
              return -1;
            }
          }),
      };
    case "SORT_BY_MAX_VALUE_DESC":
      return {
        ...state,
        dogs: state.dogs
          .map((e) => e)
          .sort((a, b) => {
            if (a.weight_max === "Not found") {
              return 1;
            }
            if (b.weight_max === "Not found") {
              return -1;
            }
            if (Number(a.weight_max) > Number(b.weight_max)) {
              return -1;
            }
            if (Number(a.weight_max) === Number(b.weight_max)) {
              if (Number(a.weight_min) > Number(b.weight_min)) {
                return -1;
              }
              if (Number(a.weight_min) < Number(b.weight_min)) {
                return 1;
              }
              return 0;
            }
            if (Number(a.weight_max) < Number(b.weight_max)) {
              return 1;
            }
          }),
      };
    case "ORDER_ALF_ASC":
      return {
        ...state,
        dogs: state.dogs
          .map((e) => e)
          .sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          }),
      };
    case "ORDER_ALF_DESC":
      return {
        ...state,
        dogs: state.dogs
          .map((e) => e)
          .sort((a, b) => {
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          })
          .reverse(),
      };
    case "SEARCH_BY_RACE":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_TEMPS":
      return {
        ...state,
        temps: action.payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "FILTER_TEMP":
      return {
        ...state,
        dogs: action.payload,
        defaultDogs: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        dogDetail: action.payload,
      };
    case "DELETE_TEMP":
      return {
        ...state,
        tempsToFilter: state.tempsToFilter.filter((t) => t !== action.payload),
      };
    case "RESET_TEMPS_TO_FILTER":
      return {
        ...state,
        tempsToFilter: action.payload,
      };
    case "DEFAULT_WEIGHT":
      return {
        ...state,
        dogs: state.defaultDogs,
      };
    case "DEFAULT_ORDER_ALF":
      return {
        ...state,
        dogs: state.defaultDogs,
      };
    default:
      return state;
  }
};

export default rootReducer;
