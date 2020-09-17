/* eslint-disable default-case */
import { ACTION } from "./constants";

const initialState = {
  allCourses: [{
    index: 1,
    module: "Introduction",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }]
  },
  {
    index: 2,
    module: "Basic Logic Gates",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 3,
    module: "Universal Logic Gates",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 4,
    module: "Combinational Logic",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 5,
    module: "Arithmetic Circuits",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 6,
    module: "Code Convertors",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 7,
    module: "Flip Flop",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 8,
    module: "Registers",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 9,
    module: "Counters",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  },
  {
    index: 10,
    module: "Dislays",
    courses: [{ name: "AND Gate", expNo: "1" }, { name: "NOR Gate", expNo: "2" }, { name: "NAND Gate", expNo: "3" }, { name: "OR Gate", expNo: "4" }, { name: "XOR Gate", expNo: "5" }]
  }
  ],

};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.GET_SOME_DATA: {
      state = { ...state, someData: action.payload };
      break;
    }
  }

  return state;
};

export default homeReducer;
