import Chance from 'chance';

const chance = new Chance();
export default {
  random: {
    string: () => {
      return chance.string();
    },
    errorStatus: () => {
      return chance.integer({
        min: 400,
        max: 500
      });
    }
  }
};
