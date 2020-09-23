/* eslint-disable default-case */
import { ACTION } from "./constants";

const initialState = {
  allCourses: [{
    index: 1,
    name: "Introduction",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }]
  },
  {
    index: 2,
    name: "Basic Logic Gates",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 3,
    name: "Universal Logic Gates",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 4,
    name: "Combinational Logic",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 5,
    name: "Arithmetic Circuits",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 6,
    name: "Code Convertors",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 7,
    name: "Flip Flop",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 8,
    name: "Registers",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 9,
    name: "Counters",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 10,
    name: "Dislays",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  }
  ],

  allModules: []

};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.GET_SOME_DATA: {
      state = { ...state, someData: action.payload };
      break;
    }
    case ACTION.GET_ALL_MODULES: {
      state = {...state, allModules:[...action.payload]}
    }
  }

  return state;
};

export default homeReducer;
