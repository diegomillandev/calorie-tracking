export type Categories = {
    id: number;
    name: string;
};

export type Activity = {
    id: string;
    category: number;
    description: string;
    calories: number;
};
