import { ActivityState } from '../reducers/activity-reducer';
import { categories } from '../const';
type TotalCaloriesProps = {
    state: ActivityState;
};

export const TotalCalories = ({ state }: TotalCaloriesProps) => {
    const caloriesConsumed = state.activities
        .filter((activity) => activity.category === categories[0].id)
        .reduce((acc, curr) => acc + curr.calories, 0);
    const caloriesBurned = state.activities
        .filter((activity) => activity.category === categories[1].id)
        .reduce((acc, curr) => acc + curr.calories, 0);
    const caloriesRemaining = caloriesConsumed - caloriesBurned;
    return (
        <div className="mx-auto max-w-4xl bg-white p-4 flex justify-around rounded-lg">
            <div className="flex justify-center items-center flex-col">
                <p className="text-2xl font-bold text-cyan-500">
                    {caloriesConsumed}
                </p>
                <h2 className="text-normal md:text-lg font-bold text-slate-600">
                    Consumed
                </h2>
            </div>
            <div className="flex justify-center items-center flex-col">
                <p className="text-2xl font-bold text-cyan-500">
                    {caloriesBurned}
                </p>
                <h2 className="text-normal md:text-xl font-bold text-slate-600">
                    Burned
                </h2>
            </div>
            <div className="flex justify-center items-center flex-col">
                <p className="text-2xl font-bold text-cyan-500">
                    {caloriesRemaining}
                </p>
                <h2 className="text-normal md:text-xl font-bold text-slate-600">
                    Remaining
                </h2>
            </div>
        </div>
    );
};
