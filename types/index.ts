export {};

declare global {
  type EventData = {
    id: number;
    name: string;
    desc?: string;
    status: string;
  };
}
