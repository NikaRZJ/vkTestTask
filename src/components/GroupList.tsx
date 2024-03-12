import { Group, User } from "../models/interfaces";
import {
  Avatar,
  Header,
  Link,
  SimpleCell,
  Group as VKGroup,
} from "@vkontakte/vkui";
import { FriendsModal } from "./FriendsModal";
import { useState } from "react";

interface GroupListProps {
  groupList: Group[] | undefined;
}

export function GroupList({ groupList }: GroupListProps) {
  const [friends, setFriends] = useState<User[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  return (
    <>
      <VKGroup header={<Header mode="secondary">Список групп</Header>}>
        {groupList &&
          groupList.map(
            ({ id, avatar_color, closed, members_count, friends, name }) => (
              <SimpleCell
                before={
                  <Avatar
                    size={100}
                    gradientColor={"custom"}
                    style={{ backgroundColor: avatar_color }}
                  />
                }
                key={id}
                subtitle={
                  <>
                    <div>{closed ? "закрытая" : "открытая"}</div>
                    <div>кол-во подписчиков: {members_count}</div>
                    {friends && (
                      <Link
                        href="#"
                        onClick={() => {
                          setFriends(friends);
                          setActiveModal("friends");
                        }}
                      >
                        кол-во друзей подписано: {friends.length}
                      </Link>
                    )}
                  </>
                }
              >
                {name}
              </SimpleCell>
            ),
          )}
      </VKGroup>
      <FriendsModal
        users={friends}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
    </>
  );
}
