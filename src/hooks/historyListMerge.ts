import { unionBy } from "es-toolkit/compat";
import type { DatabaseSchemaHistory } from "@/types/database";

const sortByCreateTimeDesc = (
  a: DatabaseSchemaHistory,
  b: DatabaseSchemaHistory,
) => {
  return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
};

export const mergeHistoryList = (
  currentList: DatabaseSchemaHistory[],
  fetchedList: DatabaseSchemaHistory[],
  page: number,
) => {
  if (page === 1) {
    const sortedList = [...fetchedList];
    sortedList.sort(sortByCreateTimeDesc);
    return sortedList;
  }

  const merged = unionBy(currentList, fetchedList, "id");
  merged.sort(sortByCreateTimeDesc);
  return merged;
};
