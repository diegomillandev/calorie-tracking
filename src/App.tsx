import { useEffect, useReducer } from 'react';
import { ActivityList, Form, TotalCalories } from './components';
import { initialState, activityReducer } from './reducers/activity-reducer';

export const App = () => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities));
    }, [state.activities]);

    return (
        <>
            <header className="bg-cyan-500 py-3">
                <div className="max-w-4xl mx-auto flex justify-between px-2">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Calories Tracking
                    </h1>

                    <button
                        onClick={() => {
                            dispatch({
                                type: 'reset-activities',
                            });
                        }}
                        className="bg-gray-400 hover:bg-red-700 rounded px-4 py1 text-white font-semibold uppercase text-sm"
                    >
                        Reset App
                    </button>
                </div>
            </header>

            <section className="bg-cyan-400 pt-5 md:pt-20 pb-10 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form dispatch={dispatch} state={state} />
                </div>
            </section>

            <section className="bg-cyan-400 px-5 pt-0 pb-10">
                <TotalCalories state={state} />
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                {state.activities.length > 0 ? (
                    <ActivityList
                        activities={state.activities}
                        dispatch={dispatch}
                    />
                ) : (
                    <>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-600 text-center">
                            Record of Activities
                        </h2>
                        <p className="text-center text-xl font-bold text-slate-400 mt-5">
                            No activities recorded
                        </p>
                    </>
                )}
            </section>
        </>
    );
};
