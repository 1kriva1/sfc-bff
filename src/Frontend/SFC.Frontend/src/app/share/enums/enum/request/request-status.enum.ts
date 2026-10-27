export const RequestStatusNames = [
  "Actual",
  "Accepted",
  "Declined",
  "Canceled"
] as const;

type RequestStatusName = typeof RequestStatusNames[number];

export type RequestStatusRecord = Record<RequestStatusName, number>;