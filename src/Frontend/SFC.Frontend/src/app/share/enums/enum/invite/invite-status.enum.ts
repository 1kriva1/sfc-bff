export const InviteStatusNames = [
  "Actual",
  "Accepted",
  "Canceled",
  "Refused"
] as const;

type InviteStatusName = typeof InviteStatusNames[number];

export type InviteStatusRecord = Record<InviteStatusName, number>;