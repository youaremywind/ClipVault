import assert from "node:assert/strict";
import test from "node:test";
import { mergeHistoryList } from "./historyListMerge";

type HistoryItem = Parameters<typeof mergeHistoryList>[0][number];

const createItem = (id: string, createTime: string): HistoryItem => {
  return {
    count: 1,
    createTime,
    favorite: false,
    group: "text",
    id,
    search: id,
    type: "text",
    value: id,
  };
};

test("page=1 should replace stale list with fetched filtered list", () => {
  const currentList = [createItem("old-1", "2026-03-08 10:00:00")];
  const fetchedList = [createItem("new-1", "2026-03-09 10:00:00")];

  const merged = mergeHistoryList(currentList, fetchedList, 1);

  assert.deepEqual(
    merged.map((item) => item.id),
    ["new-1"],
  );
});

test("page>1 should merge and keep order by createTime desc", () => {
  const currentList = [createItem("old-1", "2026-03-09 10:00:00")];
  const fetchedList = [
    createItem("old-1", "2026-03-09 10:00:00"),
    createItem("old-2", "2026-03-08 10:00:00"),
  ];

  const merged = mergeHistoryList(currentList, fetchedList, 2);

  assert.deepEqual(
    merged.map((item) => item.id),
    ["old-1", "old-2"],
  );
});
