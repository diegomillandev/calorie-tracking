import { useReducer } from 'react';
import { Form } from './components';
import { initialState, activityReducer } from './reducers/activity-reducer';

export const App = () => {
    const [state, dispatch] = useReducer(activityReducer, initialState);
    return (
        <>
            <header className="bg-cyan-500 py-3">
                <div className="max-w-4xl mx-auto flex justify-between px-2">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Calories Tracking
                    </h1>
                </div>
            </header>

            <section className="bg-cyan-400 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form dispatch={dispatch} />
                </div>
            </section>
        </>
    );
};
