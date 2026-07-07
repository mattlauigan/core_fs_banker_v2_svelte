import { page } from "$app/state";

const getPath = (): string[] => {
    return page.url.pathname.split("/").filter(Boolean);
  // const route = pathArray.at(-1);
  // return pathArray.slice(1, -1).join("/");
}

export const utilCore = {
  getPath,
}