import { Dispatch, useMemo } from 'react';
import { categories } from '../const';
import { Activity } from '../types';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from '../reducers/activity-reducer';

type ActivityListProps = {
    activities: Activity[];
    dispatch: Dispatch<ActivityActions>;
};

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
    const categoryName = useMemo(
        () => (category: Activity['category']) =>
            categories.map((cat) => (cat.id === category ? cat.name : '')),
        [activities]
    );

    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-600 text-center">
                Record of Activities
            </h2>

            {activities.map((activity) => (
                <div
                    key={activity.id}
                    className="px-5 py-10 bg-white mt-5 flex justify-between shadow items-center"
                >
                    <div className="md:space-y-2 relative flex md:block flex-col justify-center">
                        <p
                            className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                                ${
                                    activity.category === 1
                                        ? 'bg-lime-500'
                                        : 'bg-orange-500'
                                }
                            `}
                        >
                            {categoryName(activity.category)}
                        </p>
                        <p className="text-lg md:text-2xl font-bold pt-3 md:pt-5">
                            {activity.description}
                        </p>
                        <p className="font-black text-lg md:text-4xl text-cyan-500 -mt-1">
                            {activity.calories} {''} <span>Calories</span>
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'set-activeId',
                                    payload: { id: activity.id },
                                })
                            }
                        >
                            <PencilSquareIcon
                                className={`h-6 md:h-8 w-6 md:w-8 text-gray-400 hover:text-lime-500`}
                            />
                        </button>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'delete-activity',
                                    payload: { id: activity.id },
                                })
                            }
                        >
                            <TrashIcon
                                className={`h-6 md:h-8 w-6 md:w-8 text-gray-400 hover:text-red-400`}
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};
