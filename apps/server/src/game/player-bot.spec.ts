import { PlayerBot } from './player-bot';

describe('Bot', () => {
  it('should be defined', () => {
    expect(
      new PlayerBot({
        address: 'Bot',
        playReaction: () => {},
        playSituation: () => {},
        playVote: () => {},
      }),
    ).toBeDefined();
  });

  it('notifyBot with player role', () => {
    const bot = new PlayerBot({
      address: 'Bot',
      playReaction: jest.fn(),
      playSituation: jest.fn(),
      playVote: jest.fn(),
    });

    bot.setPlayerInfo({
      name: 'bot-1',
      role: 'player',
      situations: [{ id: 1, value: 'situation-1' }],
      reactions: [{ id: 1, url: 'reaction-1' }],
      playerId: 'player-1',
      points: 0,
    });

    bot.notifyBot({
      activeReactions: {},
      activeSituation: { id: 0, value: 'Test Situation' },
      countdown: 10,
      players: [],
      turn: 1,
      turnType: 'reaction',
    });
    expect(bot.playReaction).toHaveBeenCalled();

    bot.notifyBot({
      activeReactions: {},
      activeSituation: { id: 0, value: 'Test Situation' },
      countdown: 10,
      players: [],
      turn: 1,
      turnType: 'situation',
    });
    expect(bot.playSituation).toHaveBeenCalledTimes(0);

    bot.notifyBot({
      activeReactions: {},
      activeSituation: { id: 0, value: 'Test Situation' },
      countdown: 10,
      players: [],
      turn: 1,
      turnType: 'vote',
    });
    expect(bot.playVote).toHaveBeenCalledTimes(0);
  });

  it('notifyBot with lead role', async () => {
    const bot = new PlayerBot({
      address: 'Bot',
      playReaction: jest.fn(),
      playSituation: jest.fn(),
      playVote: jest.fn(),
    });

    bot.setPlayerInfo({
      name: 'bot-1',
      role: 'lead',
      situations: [{ id: 1, value: 'situation-1' }],
      reactions: [{ id: 1, url: 'reaction-1' }],
      playerId: 'player-1',
      points: 0,
    });

    bot.notifyBot({
      activeReactions: {},
      activeSituation: { id: 0, value: 'Test Situation' },
      countdown: 10,
      players: [],
      turn: 1,
      turnType: 'reaction',
    });
    expect(bot.playReaction).toHaveBeenCalledTimes(0);

    bot.notifyBot({
      activeReactions: {},
      activeSituation: { id: 0, value: 'Test Situation' },
      countdown: 10,
      players: [],
      turn: 1,
      turnType: 'situation',
    });
    await new Promise((r) => setTimeout(r, 1000));
    expect(bot.playSituation).toHaveBeenCalledTimes(1);

    bot.notifyBot({
      activeReactions: {},
      activeSituation: { id: 0, value: 'Test Situation' },
      countdown: 10,
      players: [],
      turn: 1,
      turnType: 'vote',
    });
    await new Promise((r) => setTimeout(r, 1000));
    expect(bot.playVote).toHaveBeenCalledTimes(1);
  });
});
