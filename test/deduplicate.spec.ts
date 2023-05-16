const {deduplicate} = require("../src/deduplicate");
import { expect } from 'chai'

describe("deduplicate should", () => {
  const wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son']

  it("return duplicates free array", function() {
    const nonDuplicatedArray = (deduplicate(wordList));
    nonDuplicatedArray.forEach((el: any) => {
      expect([ 'not', 'a', 'pheasant', 'plucker', 'but', 'plucker\'s', 'son' ]).to.include(el);
    });
  });
});
