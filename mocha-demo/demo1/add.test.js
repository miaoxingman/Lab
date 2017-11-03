var add = require("./add.js");
var expect = require('chai').expect;

describe("add function testing", function() {
    it('one plus one equals two', function() {
        expect(add(1,1)).to.be.equals(2);
    });
});