import { useMemo } from 'react';
import { categories } from '../const';
import { Activity } from '../types';

type ActivityListProps = {
    activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
    const categoryName = useMemo(
        () => (category: Activity['category']) =>
            categories.map((cat) => (cat.id === category ? cat.name : '')),
        [activities]
    );

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Record of Activities
            </h2>

            {activities.map((activity) => (
                <div
                    key={activity.id}
                    className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
                >
                    <div className="space-y-2 relative">
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
                        <p className="text-2xl font-bold pt-5">
                            {activity.description}
                        </p>
                        <p className="font-black text-4xl text-cyan-500">
                            {activity.calories} {''} <span>Calories</span>
                        </p>
                    </div>
                    <div className=""></div>
                </div>
            ))}
        </>
    );
};
