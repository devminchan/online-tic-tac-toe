export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'api.online-tic-tac-toe.com'
    : 'localhost:2567';
