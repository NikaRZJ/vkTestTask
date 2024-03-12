import { useEffect, useState } from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Group } from "./models/interfaces";
import { fetchGroups } from "./groupsAPI";
import { GroupList } from "./components/GroupList";
import { Filters } from "./components/Filters";

function App() {
  const [groupList, setGroupList] = useState<undefined | Group[]>(undefined);
  const [viewGroupList, setViewGroupList] = useState<undefined | Group[]>(
    groupList,
  );

  const [filters, setFilters] = useState<{
    privacy: string;
    color: string;
    friends: string;
  }>({ privacy: "все", color: "любой", friends: "неважно" });

  useEffect(() => {
    fetchGroups().then((res) => setGroupList(res.data));
  }, []);

  useEffect(() => {
    if (groupList) {
      let newGroupList = [...groupList];
      if (filters.privacy === "закрытая")
        newGroupList = newGroupList.filter((item) => item.closed);
      else if (filters.privacy === "открытая")
        newGroupList = newGroupList.filter((item) => !item.closed);
      if (filters?.color !== "любой")
        newGroupList = newGroupList.filter(
          (item) => filters.color === item.avatar_color,
        );
      if (filters.friends === "нет")
        newGroupList = newGroupList.filter((item) => !item.friends);
      else if (filters.friends === "есть")
        newGroupList = newGroupList.filter((item) => item.friends);
      setViewGroupList(newGroupList);
    }
  }, [groupList, filters]);

  return (
    <div style={{ padding: "0 40px" }}>
      <Panel id="list">
        <PanelHeader>VK Test</PanelHeader>
        <Filters
          groupList={groupList}
          filters={filters}
          setFilters={setFilters}
        />
        <GroupList groupList={viewGroupList} />
      </Panel>
    </div>
  );
}

export default App;
