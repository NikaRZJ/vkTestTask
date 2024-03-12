import { CustomSelectOption, Div, FormItem, Select } from "@vkontakte/vkui";
import { Group } from "../models/interfaces";
import { Dispatch, SetStateAction, useCallback } from "react";

interface FiltersProps {
  groupList: Group[] | undefined;
  filters: { privacy: string, color: string, friends: string };
  setFilters: Dispatch<SetStateAction<{ privacy: string; color: string; friends: string; }>>;
} 

export function Filters({ groupList, filters, setFilters }: FiltersProps) {
  const getAvatarColors = useCallback(() => {
    if (groupList) {
      const colors: string[] = [];
      groupList.forEach(
        (item) => item.avatar_color && colors.push(item.avatar_color),
      );
      return ["любой", ...new Set(colors)];
    }
    return [];
  }, [groupList]);

  return (
    <Div style={{ display: "flex" }}>
      <FormItem top="Приватность группы">
        <Select
          options={["все", "закрытая", "открытая"].map((item, index) => ({
            label: item,
            value: item,
            key: index,
          }))}
          renderOption={({ ...restProps }) => (
            <CustomSelectOption {...restProps} />
          )}
          value={filters.privacy}
          onChange={(e) => setFilters({...filters, privacy: e.target.value})}
        />
      </FormItem>
      <FormItem top="Цвет аватарки">
        <Select
          options={getAvatarColors().map((item, index) => ({
            key: index,
            label: item,
            value: item,
          }))}
          renderOption={({ ...restProps }) => (
            <CustomSelectOption {...restProps} />
          )}
          value={filters.color}
          onChange={(e) => setFilters({...filters, color: e.target.value})}
        />
      </FormItem>
      <FormItem top="Наличие друзей в группе">
        <Select
          options={["неважно", "нет", "есть"].map((item, index) => ({
            key: index,
            label: item,
            value: item,
          }))}
          renderOption={({ ...restProps }) => (
            <CustomSelectOption {...restProps} />
          )}
          value={filters.friends}
          onChange={(e) => setFilters({...filters, friends: e.target.value})}
        />
      </FormItem>
    </Div>
  );
}
