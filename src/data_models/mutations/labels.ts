import gql from 'graphql-tag';

export const CreateLabelMutation = gql`
    mutation CreateLabel($boardId: String!, $color: String!, $name: String!) {
        createlabel(boardId: $boardId, color: $color, name: $name) {
            label {
                id
                name
                color
            }
        }
    }`;

export const EditLabelMutation = gql`
    mutation EditLabel($labelId: String!, $color: String, $name: String) {
        editlabel(labelId: $labelId, color: $color, name: $name) {
            label {
                name
                color
            }
        }
    }`;

export const DeleteLabelMutation = gql`
    mutation DeleteLabel($labelId: String!) {
        deletelabel(labelId: $labelId) {
            success
        }
    }`;