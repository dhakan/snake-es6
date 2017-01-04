import io from 'socket.io-client'

const url = 'http://localhost:3000';
const socket = io(url);

const messages = {
  YOU_CONNECTED: 'you-connected',
  GAME_STARTED: 'game-started',
  PLAYERS: 'players',
}



socket.on(messages.YOU_CONNECTED, (payload) => {
  console.log('YOU_CONNECTED');
});

socket.on(messages.GAME_STARTED, (payload) => {
  console.log('GAME STARTED!');
});

socket.on(messages.PLAYERS, (payload) => {
  const players = new Map(payload);
  console.log(players);
});