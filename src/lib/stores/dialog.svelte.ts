import { BoxState } from "$lib/ts/enum";

export class DialogController {
  #isOpen = $state(false);
  #message = $state("");
  #boxState = $state(BoxState.OK);
  #onSubmit: () => void = $state(() => {});

  get isOpen() {
    return this.#isOpen;
  }

  set isOpen(value: boolean) {
    this.#isOpen = value;
  }

  get message() {
    return this.#message;
  }

  set message(value: string) {
    this.#message = value;
  }

  get boxState() {
    return this.#boxState;
  }

  set boxState(value: BoxState) {
    this.#boxState = value;
  }

  get onSubmit() {
    return this.#onSubmit;
  }

  set onSubmit(value: () => void) {
    this.#onSubmit = value;
  }
}

export function useDialog() {
  return new DialogController();
}
