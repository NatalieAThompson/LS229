const { expect } = require('@jest/globals');
const { _ } = require('./utilities_v2');

test("_ is defined", () => {
  expect(_).not.toBe("undefined");
});

test("first is defined", function() {
  expect(typeof _().first).toBe("function");
});

test("first returns first element in an array", function() {
  expect(_([4]).first()).toBe(4);
});

(function() {
  var a = [];
  a[1] = 4;
  test("first does not return second element even if first is undefined", function() {
    expect(_(a).first()).toBe(undefined);
  });
})();

test("last is defined", function() {
  expect(typeof _().last).toBe("function");
});

test("last returns last element in an array", function() {
  expect(_([1, 2, 3, 4]).last()).toBe(4);
});

test("without is defined", function() {
  expect(typeof _().without).toBe("function");
});

test("without returns new array that does not contain the supplied value", function() {
  expect(_([1, 2, 3, 4, 5]).without(4).indexOf(4)).toBe(-1);
});

test("without removes any number of arguments", function() {
  var a = _([1, 2, 3, 4, 5, 6]).without(6, 4);
  expect(a.indexOf(6)).toBe(-1);
  expect(a.indexOf(4)).toBe(-1);
});

test("without removes only the specified number of arguments", function() {
  var a = _([1, 2, 3, 4, 5, 6]).without(6, 4);
  expect(a.length).toBe(4);
});

test("without retains the elements that aren't remove", function() {
  var a = _([1, 2, 3, 4, 5, 6]).without(6, 4);
  expect(a.indexOf(1)).toBe(0);
  expect(a.indexOf(2)).toBe(1);
  expect(a.indexOf(3)).toBe(2);
  expect(a.indexOf(5)).toBe(3);
});

test("range is defined", function() {
  expect(typeof _.range).toBe("function");
});

test("range returns an array of values starting at 0 when one argument supplied", function() {
  expect(_.range(10)[0]).toBe(0);
  expect(_.range(10).length).toBe(10);
});

test("range returns an array of values starting with the first value when two arguments supplied", function() {
  expect(_.range(1, 10)[0]).toBe(1);
  expect(_.range(1, 10).length).toBe(9);
});

test("lastIndexOf is defined", function() {
  expect(typeof _().lastIndexOf).toBe("function");
});

test("lastIndexOf returns last index of supplied value", function() {
  expect(_([1, 1, 1]).lastIndexOf(1)).toBe(2);
  expect(_([1, 2, 3]).lastIndexOf(2)).toBe(1);
});

test("sample is defined", function() {
  expect(typeof _().sample).toBe("function");
});

test("sample returns a single element when no argument supplied", function() {
  expect(_([1]).sample()).toBe(1);
});

test("sample returns multiple, non-repetitive elements when a numeric argument supplied", function() {
  expect(_([1, 2, 3]).sample(3).length).toBe(3);
});

test("findWhere is defined", function() {
  expect(typeof _().findWhere).toBe("function");
});

(function() {
  var dict = [{ foo: "bar", idx: 0 }, { foo: "baz", idx: 1 }, { foo: "bar", idx: 2 }];

  test("findWhere returns the first object with matched properties", function() {
    expect(_(dict).findWhere({ foo: "bar" }).idx).toBe(0);
  });
})();

(function() {
  var dict = [{ foo: "bar", quux: "q", idx: 0 }, { foo: "baz", quux: "z", idx: 1 }, { foo: "bar", quux: "z", idx: 2 }];

  test("findWhere returns the first object with multiple matched properties", function() {
    expect(_(dict).findWhere({ foo: "bar", quux: "z" }).idx).toBe(2);
  });
})();

(function() {
  var dict = [{ foo: "bar", idx: 0 }, { foo: "baz", idx: 1 }, { foo: "bar", idx: 2 }];

  test("findWhere returns undefined with no matched properties", function() {
    expect(_(dict).findWhere({ foo: "quux" })).toBeUndefined();
  });
})();

test("where is defined", function() {
  expect(typeof _().where).toBe("function");
});

(function() {
  var dict = [{ foo: "bar", idx: 0 }, { foo: "baz", idx: 1 }, { foo: "bar", idx: 2 }];

  test("where returns an array with one matched object", function() {
    expect(_(dict).where({ idx: 0 }).length).toBe(1);
  });

  test("where returns an array with two matched objects", function() {
    expect(_(dict).where({ foo: "bar" }).length).toBe(2);
  });
})();

test("pluck is defined", function() {
  expect(typeof _().pluck).toBe("function");
});

test("pluck returns array of two values", function() {
  var coll = [{ foo: "bar" }, { foo: "baz" }],
    pluck = _(coll).pluck("foo");

  expect(pluck.length).toBe(2);
});

test("pluck returns both values", function() {
  var coll = [{ foo: "bar" }, { foo: "baz" }],
    pluck = _(coll).pluck("foo");

  expect(pluck[0] === "bar");
  expect(pluck[1] === "baz");
});

test("keys is defined", function() {
  expect(typeof _().keys).toBe("function");
});

test("keys returns an array of keys from the object", function() {
  var keys = _({ foo: "bar", baz: "quuz" }).keys();
  expect(keys.length).toBe(2);
});

test("keys returns all keys that are own properties of the object", function() {
  var keys = _({ foo: "bar", baz: "quuz" }).keys();
  expect(keys.indexOf("foo")).not.toBe(-1);
  expect(keys.indexOf("foo")).toBe(0);
  expect(keys.indexOf("baz")).not.toBe(-1);
});

test("keys does not return inherited object properties", function() {
  var keys = _({ foo: "bar", baz: "quuz" }).keys();
  expect(keys.indexOf("toString")).toBe(-1);
});

test("values is defined", function() {
  expect(typeof _().values).toBe("function");
});

test("values returns an array of values from the object", function() {
  var values = _({ foo: "bar", baz: "quuz" }).values();
  expect(values.length).toBe(2);
});

test("values returns all values that are own properties of the object", function() {
  var values = _({ foo: "bar", baz: "quuz" }).values();
  expect(values.indexOf("bar")).not.toBe(-1);
  expect(values.indexOf("bar")).toBe(0);
  expect(values.indexOf("quuz")).not.toBe(-1);
});

test("extend is defined", function() {
  expect(typeof _.extend).toBe("function");
});

test("extend returns an extended object using new object's values", function() {
  var newObj = { bar: "baz" };
  var oldObj = { foo: "bar" };
  var extObj = _.extend(oldObj, newObj);
  expect(extObj.foo).toBe("bar");
  expect(extObj.bar).toBe("baz");
});

test("extend modifies the first object passed in rather than creating a new object", function() {
  var newObj = { bar: "baz" };
  expect(newObj).toBe(_.extend(newObj, {}));
});

test("extend works with any number of objects", function() {
  var newObj = { bar: "baz" };
  var oldObj = { foo: "bar" };
  var crazyObject = _.extend({ foo: "quuz" }, newObj, oldObj);
  expect(crazyObject.foo).toBe("bar");
});

test("pick is defined", function() {
  expect(typeof _().pick).toBe("function");
});

test("pick returns a new object with the passed in properties", function() {
  var oldObj = { foo: "bar" },
    newObj = _(oldObj).pick("foo");

  expect(newObj.foo).toBe(oldObj.foo);
  expect(newObj).not.toBe(oldObj);
});

test("pick ignores any properties passed in that do not exist on the source object", function() {
  var oldObj = { foo: "bar" },
    newObj = _(oldObj).pick("foo");

  expect(_(newObj).pick("foo", "bar").bar).toBeUndefined();
});

test("omit is defined", function() {
  expect(typeof _().omit).toBe("function");
});

test("omit returns a new object with any passed in properties omitted", function() {
  var oldObj = { foo: "bar" },
    newObj = _(oldObj).omit("foo");

  expect(newObj.foo).toBeUndefined();
});

test("omit doesn't insert properties that aren't on the original object", function() {
  var oldObj = { foo: "bar" },
    newObj = _(oldObj).omit("foo", "foo2");

  expect(newObj.hasOwnProperty('foo2')).toBe(false);
});

test("omit doesn't remove all the properties", function() {
  var oldObj = { foo: "bar", foo2: "bar2" },
    newObj = _(oldObj).omit("foo");

  expect(newObj.hasOwnProperty('foo')).toBe(false);
  expect(newObj.hasOwnProperty('foo2')).toBe(true);
});

test("has is defined", function() {
  expect(typeof _().has).toBe("function");
});

test("has returns true when property exists", function() {
  var obj = { foo: "bar" };

  expect(_(obj).has("foo")).toBeTruthy();
});

test("has returns false when property does not exist", function() {
  var obj = { foo: "bar" };

  expect(_(obj).has("bar")).toBeFalsy();
});

test("has returns true when hasOwnProperty is defined", function() {
  var obj = { foo: "bar" };
  obj.hasOwnProperty = function() { };

  expect(_(obj).has("hasOwnProperty")).toBeTruthy();
});

(["isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
  test(method + " is defined", function() {
    expect(typeof _[method]).toBe("function");
    expect(typeof _()[method]).toBe("function");
  });
});

test("isArray returns true if array, otherwise false", function() {
  expect(_.isArray([])).toBeTruthy();
  expect(_.isArray({ 0: "a", 1: "b" })).toBeFalsy();
  expect(_([]).isArray()).toBeTruthy();
});

test("isObject returns true if object or function, otherwise false", function() {
  expect(_.isObject({})).toBeTruthy();
  expect(_({}).isObject()).toBeTruthy();
  expect(_.isObject([])).toBeTruthy();
  expect(_.isObject(isNaN)).toBeTruthy();
  expect(_.isObject(1)).toBeFalsy();
});

test("isFunction returns true if function, otherwise false", function() {
  expect(_.isFunction(isNaN)).toBeTruthy();
  expect(_.isFunction({})).toBeFalsy();
});

test("isBoolean returns true if boolean (primitive or object), otherwise false", function() {
  expect(_.isBoolean(false)).toBeTruthy();
  // eslint-disable-next-line no-new-wrappers
  expect(_.isBoolean(new Boolean(false))).toBeTruthy();
  expect(_.isBoolean(1)).toBeFalsy();
});

test("isString returns true if string, otherwise false", function() {
  expect(_.isString("")).toBeTruthy();
  // eslint-disable-next-line no-new-wrappers
  expect(_.isString(new String())).toBeTruthy();
  expect(_.isString(1)).toBeFalsy();
});

test("isNumber returns true if number, (primitive or object), otherwise false", function() {
  expect(_.isNumber(1)).toBeTruthy();
  // eslint-disable-next-line no-new-wrappers
  expect(_.isNumber(new Number(5))).toBeTruthy();
  expect(_.isNumber("5")).toBeFalsy();
});