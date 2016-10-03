import { Map, fromJS } from 'immutable';
import { firebaseDb } from '../../services/firebase';

const Questions = firebaseDb.ref('question');

const LOAD_QUESTIONS = 'questions/LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'questions/LOAD_QUESTIONS_SUCCESS';
const LOAD_QUESTIONS_FAIL = 'questions/LOAD_QUESTIONS_FAIL';

const initialState = Map({
  isLoading: false,
  questions: Map(),
});


export function loadQuestionsSuccess(questions) {
  return {
    type: LOAD_QUESTIONS_SUCCESS,
    payload: questions,
  };
}

export function loadQuestionsFail() {
  return {
    type: LOAD_QUESTIONS_FAIL,
  };
}

export function loadQuestions(topicId) {
  return (dispatch) => {
    dispatch({
      type: LOAD_QUESTIONS,
    });

    Questions.orderByChild('topic').equalTo(topicId).on('value', (snapshot) => {
      dispatch(loadQuestionsSuccess(snapshot.val()));
    });
  };
}


export default function QuestionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_QUESTIONS: {
      return state.set('isLoading', true);
    }
    case LOAD_QUESTIONS_SUCCESS: {
      return state
              .set('isLoading', false)
              .update('questions', q => q.merge(fromJS(action.payload)));
    }

    case LOAD_QUESTIONS_FAIL: {
      return state.set('isLoading', false);
    }

    default:
      return state;
  }
}
