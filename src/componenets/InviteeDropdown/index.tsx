import React, { useEffect, useMemo, useState } from 'react'
import { GetUsersToInvite } from '../../services/UserService';
import { DropdownInput } from '../../common/types';
import SelectionDropdown from '../SelectionDropdown';
import { UserPlus } from 'lucide-react';
import { UserResponse } from '../../models/UserResponse';
import { EventCollaboratorRequest } from '../../models/EventCollaboratorRequest';

interface InviteeDropdownProps {
    eventCollaborators: any[];
    onChange: (value: DropdownInput[]) => void;
}

const InviteeDropdown: React.FC<InviteeDropdownProps> = ({ eventCollaborators, onChange }: InviteeDropdownProps) => {

    const [usersToInvite, setUsersToInvite] = useState<UserResponse[]>([]);

    let dropdownOptions: DropdownInput[] = [];

    const getUsersDropdownOptions = (): DropdownInput[] => {
        return usersToInvite.filter(user => !eventCollaborators
            .some((_: EventCollaboratorRequest) => _.userId === user.id)
            && !dropdownOptions.some(_ => _.value === user.id))
            .map((user): DropdownInput => {
                return {
                    label: user.email,
                    value: user.id,
                };
            });
    }

    const getDefaultUserDropdownOptions = (users: UserResponse[]): DropdownInput[] => {
        return users.filter(user => eventCollaborators.some((x: any) => x.userId === user.id)).map((user): DropdownInput => {
            return {
                label: user.email,
                value: user.id,
            };
        });
    }

    const dropdownValue = useMemo(() => getDefaultUserDropdownOptions(usersToInvite), [usersToInvite]);

    dropdownOptions = useMemo(() => getUsersDropdownOptions(), [usersToInvite, eventCollaborators]);

    useEffect(() => {
        GetUsersToInvite()
            .then(res => {
                setUsersToInvite(res);
            })
            .catch(err => console.error(err));

    }, [eventCollaborators])


    return (
        <SelectionDropdown
            isCloseMenuOnSelect={false}
            value={dropdownValue}
            isMultiSelect={true}
            options={dropdownOptions}
            placeholder={"Select invitees"}
            icon={<UserPlus />}
            onChange={onChange} />
    )
}

export default InviteeDropdown