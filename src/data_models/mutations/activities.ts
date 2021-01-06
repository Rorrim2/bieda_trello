import gql from 'graphql-tag';

export const CreateActivityMutation = gql`
    mutation CraeteActivity($userId: String!, $cardId: String!, $createdOn: String, $content: String!, $typeVal: Int) {
        createactivity(userId: $userId, cardId: $cardId, createdOn: $createdOn, content: $content, typeVal: $typeVal) {
            activity {
                id
                content
                type
                createdOn
            }
        }
    }`;

export const EditActivityMutation = gql`
    mutation EditActivity($activityId: String!, $userId: String!, $cardId: String!, $content: String!) {
        editactivity(activityId: $activityId, userId: $userId, cardId: $cardId, content: $content) {
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