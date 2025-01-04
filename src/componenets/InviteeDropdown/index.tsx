import React, { useEffect, useState } from 'react'
import { GetUsersToInvite } from '../../services/UserService';
import { DropdownInput } from '../../common/types';
import SelectionDropdown from '../SelectionDropdown';
import { UserPlus } from 'lucide-react';
import { UserResponse } from '../../models/UserResponse';
import { ConfirmationStatus } from '../../enums/ConfirmationStatus';
import { EventCollaboratorRole } from '../../enums/EventCollaboratorRole';

interface InviteeDropdownProps {
    eventObj: any,
    setEventObj: (value: DropdownInput[]) => void,
}

const InviteeDropdown: React.FC<InviteeDropdownProps> = ({ eventObj, setEventObj }: InviteeDropdownProps) => {

    const [usersToInvite, setUsersToInvite] = useState<UserResponse[]>([]);
    const [dropdownValue, setDropdownValue] = useState<DropdownInput[]>([]);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownInput[]>([]);

    useEffect(() => {
        GetUsersToInvite()
            .then(res => {
                setUsersToInvite(res);
                let d = getDefaultUserDropdownOptions(res);
                setDropdownValue(d);
                setDropdownOptions(getUsersDropdownOptions(d, res, eventObj.eventCollaborators));
            })
            .catch(err => console.error(err));

    }, [])

    const getUsersDropdownOptions = (dropdownValues: DropdownInput[], users: UserResponse[], eventCollaborators: any[]): DropdownInput[] => {
        return users.filter(user => !eventCollaborators.some((x: any) => x.userId === user.id) && !dropdownValues.some(_ => _.value === user.id)).map((user): DropdownInput => {
            return {
                label: user.email,
                value: user.id,
            };
        });
    }

    const getDefaultUserDropdownOptions = (users: UserResponse[]): DropdownInput[] => {
        return users.filter(user => eventObj.eventCollaborators.some((x: any) => x.userId === user.id)).map((user): DropdownInput => {
            return {
                label: user.email,
                value: user.id,
            };
        });
    }

    return (
        <SelectionDropdown
            isCloseMenuOnSelect={false}
            value={dropdownValue}
            isMultiSelect={true}
            options={dropdownOptions}
            placeholder={"Select invitees"}
            icon={<UserPlus />}
            onChange={(value: DropdownInput[]) => {
                let eventCollaborators = [...eventObj.eventCollaborators.filter((eventCollaborator: any) => eventCollaborator.eventCollaboratorRole === EventCollaboratorRole.Organizer), ...value.map((user: DropdownInput) => {
                    return {
                        userId: user.value,
                        eventCollaboratorRole: EventCollaboratorRole.Participant,
                        confirmationStatus: ConfirmationStatus.Pending,
                    };
                })];
                setEventObj({
                    ...eventObj,
                    eventCollaborators: eventCollaborators,
                });
                setDropdownValue(value);
                setDropdownOptions(getUsersDropdownOptions(value, usersToInvite, eventCollaborators));
            }} />
    )
}

export default InviteeDropdown