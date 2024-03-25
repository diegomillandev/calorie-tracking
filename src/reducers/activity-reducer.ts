import { Activity } from '../types/index';

export type ActivityActions =
    | {
          type: 'save-activity';
          payload: { newActivity: Activity };
      }
    | {
          type: 'set-activeId';
          payload: { id: Activity['id'] };
      }
    | {
          type: 'delete-activity';
          payload: { id: Activity['id'] };
      }
    | {
          type: 'reset-activities';
      };

export type ActivityState = {
    activities: Activity[];
    activeId: Activity['id'];
};

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities');
    if (activities) {
        return JSON.parse(activities);
    }
    return [];
};

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: '',
};

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type === 'save-activity') {
        let updateActivities: Activity[] = [];

        if (state.activeId) {
            const filterState = state.activities.filter(
                (activity) => activity.id !== state.activeId
            );
            updateActivities = [...filterState, action.payload.newActivity];
        } else {
            updateActivities = [
                ...state.activities,
                action.payload.newActivity,
            ];
        }
        return {
            ...state,
            activeId: '',
            activities: updateActivities,
        };
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id,
        };
    }
    if (action.type === 'delete-activity') {
        const updateStateActivities: Activity[] = state.activities.filter(
            (activity) => activity.id !== action.payload.id
        );
        return {
            ...state,
            activeId: '',
            activities: updateStateActivities,
        };
    }

    if (action.type === 'reset-activities') {
        return {
            ...state,
            activeId: '',
            activities: [],
        };
    }

    return state;
};
