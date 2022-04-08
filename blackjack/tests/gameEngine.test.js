const { test, expect, afterEach } = require('@jest/globals');
const { GameEngine } = require('./gameEngine');

test('Make sure there is a game engine function', () => {
  expect(GameEngine).not.toBeUndefined();
});

describe('Play', () => {
  test('Play method is defined in GameEngine', () => {
    expect(typeof GameEngine().play).toBe("function");
    expect(typeof GameEngine.play).toBe("function");
  });
});

// eslint-disable-next-line
describe('Display Rules', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation();

  beforeEach(() => {
    logSpy.mockClear();
  });

  afterEach(() => {
    GameEngine.startingHandAmount = 2;
    GameEngine.winningValue = 21;
  });

  test('Be able to display the rules', () => {
    expect(typeof GameEngine().displayRules).toBe("function");
    expect(typeof GameEngine.displayRules).toBe("function");
  });

  test('console.log the Rules', () => {
    GameEngine.displayRules();

    expect(logSpy).toHaveBeenCalledWith(`------- Rules For BlackJack -------`);
    expect(logSpy).toHaveBeenCalledWith(`The player and dealer are given 2 cards`);
    expect(logSpy).toHaveBeenCalledWith(`You can choose to draw more cards or not.`);
    expect(logSpy).toHaveBeenCalledWith(`Then the dealer will draw or stay`);
    expect(logSpy).toHaveBeenCalledWith(`The higest total but not over 21 wins.`);
    expect(console.log).toBeCalledTimes(5);
  });

  test('Reflect updated winning value', () => {
    GameEngine.winningValue = 51;
    GameEngine.displayRules();

    expect(logSpy).toHaveBeenCalledWith(`The higest total but not over 51 wins.`);
    expect(console.log).toBeCalledTimes(5);
  });

  test('Reflect updated hand amount', () => {
    GameEngine.startingHandAmount = 3;
    GameEngine.displayRules();

    expect(logSpy).toHaveBeenCalledWith(`The player and dealer are given 3 cards`);
    expect(logSpy).toHaveBeenCalledWith(`The higest total but not over 21 wins.`);
    expect(console.log).toBeCalledTimes(5);
  });
});


