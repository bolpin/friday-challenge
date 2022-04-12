const apiRoot = 'http://localhost:3000';

// for an example of a dynamic lookup table over
// http, see /stores/players-*.js
const locales = [
  {
    id: 1,
    code: "en_US",
  },
  {
    id: 2,
    code: "es_AR",
  },
  {
    id: 3,
    code: "es_MX",
  },
  {
    id: 4,
    code: "zh_TW",
  },
];

const genders = [
  {
    id: 1,
    name: "female",
  },
  {
    id: 2,
    name: "male",
  },
  {
    id: 3,
    name: "non-binary",
  },
]; 

const operatingSystems = [
  {
    id: 1,
    name: "android",
  },
  {
    id: 2,
    name: "ios",
  }
];

export {
  apiRoot,
  locales,
  genders,
  operatingSystems
};