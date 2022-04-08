const valid = require('../valid');
const readline = require('readline-sync');
const { test, expect } = require('@jest/globals');

const spy = jest.spyOn(readline, 'question');

afterEach(() => {
  spy.mockClear();
});

describe('valid number', () => {
  test('check valid num', () => {
    spy.mockImplementation(() => '10');

    valid.num("What score would you like to play till?");
    expect(spy).toBeCalledTimes(1);
  });

  test('check invalid num', () => {
    spy.mockReturnValueOnce('Nat')
      .mockReturnValueOnce('10');

    valid.num("What score would you like to play till?");
    expect(spy).toBeCalledTimes(2);
  });
});

// eslint-disable-next-line
describe('valid name', () => {
  test('check valid name', () => {
    spy.mockImplementation(() => 'Nat');

    let name = valid.setName();
    expect(spy).toBeCalledTimes(1);
    expect(name).toBe('Nat');
  });

  test('check valid invalid name', () => {
    spy.mockReturnValueOnce('Nat T')
      .mockReturnValueOnce('Nat');

    let name = valid.setName();
    expect(spy).toBeCalledTimes(2);
    expect(name).toBe('Nat');
  });

  test('check valid invalid name', () => {
    spy.mockReturnValueOnce('Nat T')
      .mockReturnValueOnce('N@T')
      .mockReturnValueOnce('Nat');

    let name = valid.setName();
    expect(spy).toBeCalledTimes(3);
    expect(name).toBe('Nat');
  });
});
