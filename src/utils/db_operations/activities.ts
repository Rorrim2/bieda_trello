import {
  ActivityModel,
  ActivityModelType,
  BoardPreview,
  ErrorCallback,
  MutationCallback,
  QueryCallback
} from "@/data_models/types";
import {apolloClient} from "@/vue-apollo";
import {ActivityByBoardQuery, ActivityByCardQuery, ActivityByUserQuery} from "@/data_models/queries";
import {CreateActivityMutation, EditActivityMutation} from "@/data_models/mutations/activities";


export function fetchActivitiesByUser(user_id: string,
                                      onResult:QueryCallback<Array<ActivityModel>>,
                                      onError: ErrorCallback) {
  apolloClient.query({
    query:ActivityByUserQuery,
    variables:{
      userId: user_id
    }
  }).then(value => {
    onResult(value.data.activitysByUser);
  }).catch(reason => {
    onError(reason);
  })
}

export function fetchActivitiesByCard(card_id: string,
                                      onResult:QueryCallback<Array<ActivityModel>>,
                                      onError: ErrorCallback) {
  apolloClient.query({
    query:ActivityByCardQuery,
    variables:{
      cardId: card_id
    }
  }).then(value => {
    onResult(value.data.activitysByCard);
  }).catch(reason => {
    onError(reason);
  })
}


export function fetchActivityByBoardQuery(board_id: string,
                                      onResult:QueryCallback<Array<ActivityModel>>,
                                      onError: ErrorCallback) {
  apolloClient.query({
    query:ActivityByBoardQuery,
    variables:{
      boardId: board_id
    }
  }).then(value => {
    onResult(value.data.activitysByBoard);
  }).catch(reason => {
    onError(reason);
  })
}

export function createComment(data:{card_id: string, created_on: string, content: string},
                               onResult: MutationCallback<{activity: ActivityModel}>,
                               onError: ErrorCallback){
  apolloClient.mutate({
    mutation:CreateActivityMutation,
    variables:{
      cardId: data.card_id,
      created_on: data.created_on,
      content: data.content,
      typeVal: ActivityModelType.COMMENT_VAL
    }
  }).then(value => {
    onResult(value.data.createnewboard);
  }).catch(reason => {
    onError(reason);
  })
}

export function createHistoryActivity(data:{card_id: string, created_on: string, content: string},
                               onResult: MutationCallback<{activity: ActivityModel}>,
                               onError: ErrorCallback){
  apolloClient.mutate({
    mutation:CreateActivityMutation,
    variables:{
      cardId: data.card_id,
      created_on: data.created_on,
      content: data.content,
      typeVal: ActivityModelType.ACTIVITY_LOG_VAL
    }
  }).then(value => {
    onResult(value.data.createnewboard);
  }).catch(reason => {
    onError(reason);
  })
}

export function editComment(data:{activity_id: string, content: string},
                              onResult: MutationCallback<{activity: ActivityModel}>,
                              onError: ErrorCallback){
  apolloClient.mutate({
    mutation: EditActivityMutation,
    variables:{
      activityId: data.activity_id,
      content: data.content,
    }
  }).then(value => {
    onResult(value.data.editactivity);
  }).catch(reason => {
    onError(reason);
  })
}
