export const createResponse = (
  result = null,
  code = 0,
  time = "2022-03-08 00:00:00"
) => ({
  code,
  result,
  time,
});
