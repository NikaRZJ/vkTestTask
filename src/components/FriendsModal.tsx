import {
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderBack,
  SimpleCell,
} from "@vkontakte/vkui";
import { Dispatch, SetStateAction } from "react";
import { User } from "../models/interfaces";

interface FriendsModalProps {
  users: User[];
  activeModal: string | null;
  setActiveModal: Dispatch<SetStateAction<string | null>>;
}

export function FriendsModal({
  users,
  activeModal,
  setActiveModal,
}: FriendsModalProps) {
  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        id="friends"
        onClose={() => setActiveModal(null)}
        header={
          <ModalPageHeader
            before={
              <PanelHeaderBack
                label="Назад"
                onClick={() => setActiveModal(null)}
              />
            }
          >
            Друзья
          </ModalPageHeader>
        }
        settlingHeight={80}
      >
        <Group>
          {users.map((user, index) => {
            return (
              <SimpleCell key={Date.now() * index}>
                {user.first_name} {user.last_name}
              </SimpleCell>
            );
          })}
        </Group>
      </ModalPage>
    </ModalRoot>
  );
}
