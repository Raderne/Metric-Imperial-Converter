const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("Whole number input", function(done) {
        let input = "5kg";
        assert.equal(convertHandler.getNum(input), 5);
        done();
    });

    test("Decimal number input", function(done) {
        assert.equal(convertHandler.getNum("3.2kg"), 3.2);
        done();
    });

    test("Correctly read a fractional input", function(done) {
        assert.equal(convertHandler.getNum("3/2kg"), 3 / 2);
        done();
    });

    test("Correctly read a fractional input with a decimal", function(done) {
        assert.equal(convertHandler.getNum("3.2/2kg"), 3.2/2);
        done();
    });

    test("Correctly return an error on a double-fraction", function(done) {
        assert.equal(convertHandler.getNum("3/2/4kg"), undefined);
        done();
    });

    test("Correctly default to a numerical input of 1 when no numerical input is provided", function(done) {
        assert.equal(convertHandler.getNum("kg"), 1);
        done();
    });

    test("Correctly read each valid input unit", function(done) {
        const dict = {
            "KM": "km",
            "l": "L",
            "KG": "kg",
            "MI": "mi",
            "GAL": "gal",
            "LBS": "lbs",
        };

        for (const [key, value] of Object.entries(dict)) {
            assert.equal(convertHandler.getUnit(key), value);
        }
        done();
    });

    test("Correctly return an error for an invalid input unit", function(done) {
        assert.equal(convertHandler.getUnit("32kilo"), undefined);
        done();
    });

    test("return the correct return unit for each valid input unit", function(done) {
        const dict = {
            "km": "mi",
            "L": "gal",
            "kg": "lbs",
            "mi": "km",
            "gal": "L",
            "lbs": "kg",
        };

        for (const [key, value] of Object.entries(dict)) {
            assert.equal(convertHandler.getReturnUnit(key), value);
        }
        done();
    });

    test("Correctly return the spelled-out string unit for each valid input unit", function(done) {
        const dict = {
            "km": "kilometers",
            "L": "liters",
            "kg": "kilograms",
            "mi": "miles",
            "gal": "galons",
            "lbs": "pounds",
        };

        for (const [key, value] of Object.entries(dict)) {
            assert.equal(convertHandler.spellOutUnit(key), value);
        }
        done();
    });

    test("convert gal to L", function(done) {
        let input = [1, "gal"];
        let expected = 3.78541;

        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    test("convert L to gal", function(done) {
        let input = [1, "L"];
        let expected = 0.26417;

        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    test("convert km to mi", function(done) {
        let input = [1, "km"];
        let expected = 0.62137;

        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    test("convert mi to km", function(done) {
        let input = [1, "mi"];
        let expected = 1.60934;

        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    test("convert kg to lbs", function(done) {
        let input = [1, "kg"];
        let expected = 2.20462;

        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });

    test("convert kg to lbs", function(done) {
        let input = [1, "lbs"];
        let expected = 0.45359;

        assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
        done();
    });
  
});