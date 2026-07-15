import { goto } from "$app/navigation";
import { page } from "$app/state";

const getPath = (): string => {
  return page.url.pathname;
}

const navigatePath = (path: string): void => {
  goto(path, { replaceState: true });
}
export const utilCore = {
  getPath,
  navigatePath
}