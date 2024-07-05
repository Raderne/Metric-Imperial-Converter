function ConvertHandler() {
  const splitInput = (input) => {
    const numbers = input.match(/[.\d\/]+/gm) || "1";
    const unit = input.match(/[a-zA-Z]+/gm);

    return [numbers[0], unit[0]];
  }

  const checkFraction = (number) => {
    const nums = number.split("/");
    const isDoubleFraction = nums.length > 2;

    if (isDoubleFraction) return false;

    return nums;
  }
  
  this.getNum = function(input) {
    let number = splitInput(input)[0];
    const nums = checkFraction(number);

    if (!nums) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";
    number = parseFloat(num1) / parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) return undefined;

    let result = number.toString().length > 5 ? number.toFixed(5) : number;
    return Number(result);
  };
  
  this.getUnit = function(input) {
    const units = ["km", "gal", "lbs", "mi", "l", "kg"];
    let unit = splitInput(input)[1].toString().toLowerCase();

    if (!units.includes(unit)) return undefined;

    if (unit === "l") unit = "L";

    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const dict = {
      "km": "mi",
      "L": "gal",
      "kg": "lbs"
    };

    for (let [key, value] of Object.entries(dict)) {
      if (initUnit === key) {
        return value;
      } else if (initUnit === value) {
        return key;
      }
    }

    return "I don't know";
  };

  this.spellOutUnit = function(unit) {
    const dict = {
      "km": "kilometers",
      "L": "liters",
      "kg": "kilograms",
      "mi": "miles",
      "gal": "galons",
      "lbs": "pounds"
    };
    
    return dict[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    
    switch (initUnit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
    
      default:
        return undefined;
    }

    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
