import { z } from 'zod';

// ============================================
// Base Types
// ============================================

export const FoodSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
});
export type Food = z.infer<typeof FoodSchema>;

export const UnitSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
});
export type Unit = z.infer<typeof UnitSchema>;

export const KeywordSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    label: z.string().optional(),
    description: z.string().optional(),
});
export type Keyword = z.infer<typeof KeywordSchema>;

export const MealTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export type MealType = z.infer<typeof MealTypeSchema>;

// ============================================
// Recipe Types
// ============================================

export const IngredientSchema = z.object({
    id: z.number().optional(),
    food: FoodSchema.partial().optional(),
    unit: UnitSchema.partial().optional(),
    amount: z.union([z.string(), z.number()]),
    note: z.string().optional(),
});
export type Ingredient = z.infer<typeof IngredientSchema>;

export const StepSchema = z.object({
    id: z.number().optional(),
    instruction: z.string(),
    ingredients: z.array(IngredientSchema).optional(),
    order: z.number().optional(),
});
export type Step = z.infer<typeof StepSchema>;

export const RecipeSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    servings: z.number().optional(),
    rating: z.number().nullable().optional(),
    keywords: z.array(KeywordSchema).optional(),
    steps: z.array(StepSchema).optional(),
});
export type Recipe = z.infer<typeof RecipeSchema>;

export const RecipeListResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(RecipeSchema),
});
export type RecipeListResponse = z.infer<typeof RecipeListResponseSchema>;

// ============================================
// Meal Plan Types
// ============================================

export const MealPlanSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    recipe: RecipeSchema.partial().optional(),
    meal_type: MealTypeSchema.optional(),
    from_date: z.string(),
    to_date: z.string().optional(),
    servings: z.union([z.string(), z.number()]),
    note: z.string().optional(),
});
export type MealPlan = z.infer<typeof MealPlanSchema>;

export const MealPlanListResponseSchema = z.array(MealPlanSchema);
export type MealPlanListResponse = z.infer<typeof MealPlanListResponseSchema>;

// ============================================
// Shopping List Types
// ============================================

export const ShoppingListItemSchema = z.object({
    id: z.number(),
    food: FoodSchema.partial().optional(),
    unit: UnitSchema.partial().optional(),
    amount: z.union([z.string(), z.number()]),
    checked: z.boolean().optional(),
    note: z.string().optional(),
});
export type ShoppingListItem = z.infer<typeof ShoppingListItemSchema>;

export const ShoppingListResponseSchema = z.array(ShoppingListItemSchema);
export type ShoppingListResponse = z.infer<typeof ShoppingListResponseSchema>;

// ============================================
// Paginated List Response (generic)
// ============================================

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        count: z.number().optional(),
        next: z.string().nullable().optional(),
        previous: z.string().nullable().optional(),
        results: z.array(itemSchema),
    });

export const FoodListResponseSchema = PaginatedResponseSchema(FoodSchema);
export const UnitListResponseSchema = PaginatedResponseSchema(UnitSchema);
export const KeywordListResponseSchema = PaginatedResponseSchema(KeywordSchema);

// ============================================
// Request Payload Types
// ============================================

export const CreateRecipePayloadSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    servings: z.number().optional(),
    steps: z.array(z.object({
        instruction: z.string(),
        ingredients: z.array(z.object({
            food: z.object({ name: z.string() }),
            unit: z.object({ name: z.string() }),
            amount: z.string(),
        })),
    })),
});
export type CreateRecipePayload = z.infer<typeof CreateRecipePayloadSchema>;

export const CreateMealPlanPayloadSchema = z.object({
    recipe: z.object({
        id: z.number(),
        name: z.string(),
        keywords: z.array(z.unknown()),
    }),
    meal_type: z.object({
        id: z.number(),
        name: z.string(),
    }),
    from_date: z.string(),
    servings: z.string(),
    title: z.string().optional(),
    note: z.string().optional(),
});
export type CreateMealPlanPayload = z.infer<typeof CreateMealPlanPayloadSchema>;

export const AddShoppingItemPayloadSchema = z.object({
    food: z.object({ id: z.number(), name: z.string() }),
    unit: z.object({ id: z.number(), name: z.string() }),
    amount: z.string(),
    note: z.string().optional(),
});
export type AddShoppingItemPayload = z.infer<typeof AddShoppingItemPayloadSchema>;

export const UpdateShoppingItemPayloadSchema = z.object({
    checked: z.boolean().optional(),
    amount: z.string().optional(),
    unit: z.number().optional(),
    note: z.string().optional(),
});
export type UpdateShoppingItemPayload = z.infer<typeof UpdateShoppingItemPayloadSchema>;
