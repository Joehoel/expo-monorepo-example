export function createConnectionString({
  user,
  password,
  host,
  database,
  port,
}: {
  user: string;
  password: string;
  host: string;
  database: string;
  port: number;
}) {
  return [
    'mysql://',
    user,
    ':',
    password,
    '@',
    host,
    `:${port}/`,
    database,
    // '?ssl={"rejectUnauthorized":true}',
  ].join('');
}
