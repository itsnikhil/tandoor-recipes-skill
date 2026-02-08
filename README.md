# Tandoor Recipes Skill

OpenClaw Agent Skill for managing recipes, meal plans, and shopping lists in [Tandoor Recipe Manager](https://github.com/TandoorRecipes/recipes).

## Installation

```bash
npx clawhub@latest install tandoor-recipes
```

## Configuration

Set environment variables:

```bash
export TANDOOR_URL="https://your-tandoor-instance.com"
export TANDOOR_API_TOKEN="your-api-token"
```

## Features

- 🔍 Search and browse recipes
- 📅 Manage meal plans
- 🛒 Shopping list management
- ➕ Create new recipes

## CLI Usage

```
node ./scripts/build/tandoor.js <command> [args...]

Commands:
  search-recipes <query> [limit]           Search recipes
  get-recipe <id>                          Get recipe details
  create-recipe <name> <ingredients> <instructions> [servings]
  
  get-meal-types                           List meal types
  add-to-meal-plan <recipe_id> <meal_type> <YYYY-MM-DD> [servings]
  get-meal-plans <from_date> [to_date]     Get meal plans
  
  get-shopping-list [checked]              Get shopping list
  add-shopping-item <food> <amount> <unit> [note]
  check-shopping-item <item_id>            Check off item
  remove-shopping-item <item_id>           Remove item
  
  get-keywords [query]                     List keywords
  get-foods [query]                        List foods
  get-units [query]                        List units
```

## Development

```bash
cd scripts
npm install
npm run build
```

## License

MIT
