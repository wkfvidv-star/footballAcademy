
export interface Meal {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    nutrients: {
        protein: string;
        carbs: string;
        fat: string;
        calories: number;
    };
    tags: ('Pre-Training' | 'Post-Training' | 'Recovery' | 'Energy')[];
}

export const MEAL_PLANS: Meal[] = [
    {
        id: 'M01',
        name: 'Banana & Oat Pancakes',
        description: 'Easy to digest energy booster. Perfect 2 hours before training.',
        nutrients: { protein: '12g', carbs: '45g', fat: '6g', calories: 350 },
        tags: ['Pre-Training', 'Energy']
    },
    {
        id: 'M02',
        name: 'Chicken & Rice Bowl',
        description: 'Lean protein and carbs for muscle recovery after heavy sessions.',
        nutrients: { protein: '35g', carbs: '50g', fat: '10g', calories: 480 },
        tags: ['Post-Training', 'Recovery']
    },
    {
        id: 'M03',
        name: 'Greek Yogurt & Berries',
        description: 'Light snack rich in calcium and antioxidants.',
        nutrients: { protein: '15g', carbs: '20g', fat: '0g', calories: 150 },
        tags: ['Recovery', 'Energy']
    },
    {
        id: 'M04',
        name: 'Pasta with Tomato Sauce',
        description: 'Classic carb-loading meal for match days.',
        nutrients: { protein: '10g', carbs: '70g', fat: '8g', calories: 400 },
        tags: ['Energy', 'Pre-Training']
    },
];
