import type { RequestEvent } from '@sveltejs/kit';

export type ActionHandler = (
  event: RequestEvent
) => Promise<unknown>;

export type Actions = {
  [key: string]: ActionHandler;
};

