const findIndex = (element, ele) => {
  let index = element.length - 1;
  for (; index > 0; index--) {
    if (element[index] === ele) {
      return index;
    }
  }
  return -1;
};

const sample = function(element, num) {
  let random = Math.floor(Math.random() * element.length);
  if (num === undefined) return element[random];

  let collection = [];
  while (collection.length !== num) {
    if (!collection.includes(element[random])) collection.push(element[random]);

    random = Math.floor(Math.random() * element.length);
  }
  return collection;
};

const findWhere = function(element, item) {
  for (let idx = 0; idx < element.length; idx++) {
    let allMatches = true;
    for (let key of Object.keys(item)) {
      if (element[idx][key] !== item[key]) {
        allMatches = false;
      }
    }
    if (allMatches) {
      this.idx = idx;
      return this;
    }
  }

  return undefined;
};

const where = (element, item) => {
  let matches = [];
  for (let idx = 0; idx < element.length; idx++) {
    let allMatches = true;
    for (let key of Object.keys(item)) {
      if (element[idx][key] !== item[key]) {
        allMatches = false;
      }
    }
    if (allMatches) {
      matches.push(element[idx]);
    }
  }
  return matches;
};

const pick = (element, keys) => {
  let newObj = {};
  keys.forEach( key => {
    newObj[key] = element[key];
  });

  return newObj;
};

const omit = (element, keys) => {
  let newObj = Object.assign({}, element);
  keys.forEach( key => {
    delete newObj[key];
  });

  return newObj;
};

var _ = (element) => ({ first: () => element[0],
  last: () => element[element.length - 1],
  without: (...values) => element.filter( ele => !values.includes(ele) ),
  lastIndexOf: (ele) => findIndex(element, ele),
  sample: (ele) => sample(element, ele),
  findWhere: (item) => findWhere.call(this, element, item),
  where: (item) => where(element, item),
  pluck: (key) => element.map( obj => obj[key]).filter( ele => ele ),
  keys: () => Object.keys(element),
  values: () => Object.values(element),
  pick: (...keys) => pick(element, keys),
  omit: (...keys) => omit(element, keys),
  has: (key) => Object.keys(element).includes(key),
  isArray: () => _.isArray(element),
  isObject: () => _.isObject(element),
  isFunction: () => _.isFunction(element),
  isBoolean: () => _.isBoolean(element),
  isString: () => _.isString(element),
  isNumber: () => _.isNumber(element) });

_.range = function(value, endValue) {
  let counter;
  if (endValue === undefined) {
    counter = 0;
    let ar = new Array(value).fill().map( (_, idx) => counter + idx );
    return ar;
  }
  counter = value;
  let ar = new Array(endValue - value).fill().map( (_, idx) => counter + idx );
  return ar;
};

_.extend = function(...objs) {
  return Object.assign(...objs);
};

_.isArray = function(obj) {
  return Array.isArray(obj);
};

_.isObject = function(obj) {
  return ((typeof obj === 'object' && obj !== null) ||
           typeof obj === 'function' );
};

_.isFunction = function(func) {
  return typeof func === 'function';
};

_.isBoolean = function(bool) {
  return (bool === true ||
    bool === false ||
    bool.valueOf() === true ||
    bool.valueOf() === false);
};

_.isString = function(str) {
  return typeof str === 'string' || typeof str.valueOf() === 'string';
};

_.isNumber = function(num) {
  return typeof num === 'number' || typeof num.valueOf() === 'number';
};


module.exports = { _ };
