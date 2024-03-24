import { useState, ChangeEvent, FormEvent, Dispatch } from 'react';
import { categories } from '../const';
import { Activity } from '../types';
import { ActivityActions } from '../reducers/activity-reducer';

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
};

export const Form = ({ dispatch }: FormProps) => {
    const [activity, setActivity] = useState<Activity>({
        category: 0,
        description: '',
        calories: 0,
    });

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
        const isSetNumberField: boolean = ['category', 'calories'].includes(
            e.target.id
        );
        setActivity({
            ...activity,
            [e.target.id]: isSetNumberField ? +e.target.value : e.target.value,
        });
    };

    const isValidActivty = () => {
        const { category, description, calories } = activity;
        return category > 0 && description.trim() !== '' && calories > 0;
    };

    const changeTextInput = () => {
        const name = categories.find(
            (category) => category.id === activity.category
        )?.name;
        return `Add ${name ? name : 'Activity'}`;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white shadow p-10 rounded-lg"
        >
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="category" className="text-gray-700 font-bold">
                    Category:
                </label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-transparent"
                    value={activity.category}
                    onChange={handleChange}
                >
                    <option value={0} disabled>
                        Select Category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-1">
                <label
                    htmlFor="description"
                    className="text-gray-700 font-bold"
                >
                    Activity:
                </label>
                <input
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-transparent"
                    placeholder="Enter activity"
                    id="description"
                    value={activity.description}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="calories" className="text-gray-700 font-bold">
                    Calories:
                </label>
                <input
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-transparent"
                    placeholder="Enter calories"
                    id="calories"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value={changeTextInput()}
                className=" bg-gray-800 text-white p-2 rounded-lg w-full cursor-pointer hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={!isValidActivty()}
            />
        </form>
    );
};
