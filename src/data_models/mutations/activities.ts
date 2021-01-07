import gql from 'graphql-tag';

export const CreateActivityMutation = gql`
    mutation CraeteActivity($cardId: String!, $createdOn: String, $content: String!, $typeVal: Int) {
        createactivity(cardId: $cardId, createdOn: $createdOn, content: $content, typeVal: $typeVal) {
            activity {
                id
                content
                type
                createdOn
                user {
                    name
                    lastName
                }
            }
        }
    }`;

export const EditActivityMutation = gql`
    mutation EditActivity($activityId: String!, $content: String!) {
        editactivity(activityId: $activityId, content: $content) {
            activity {
                user {
                    name
                    lastName
                }
                type
                createdOn
                content
            }
        }
    }`;
