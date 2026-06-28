import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChefHat, Sparkles, X } from 'lucide-react';

import instaToast from '../assets/insta_toast.png';
import instaPancakes from '../assets/insta_pancakes.png';
import aboutBreakfast from '../assets/about_breakfast.png';
import shelfDisplay from '../assets/shelf_display.png';

interface Recipe {
  id: string;
  name: string;
  category: 'breakfast' | 'dessert' | 'snack';
  image: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Chef Level';
  floffiIngredient: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export default function RecipesPage() {
  const [filter, setFilter] = useState<'all' | 'breakfast' | 'dessert' | 'snack'>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: 'jam-rolls',
      name: 'Gulkhand Jam Sweet Rolls',
      category: 'breakfast',
      image: aboutBreakfast,
      prepTime: '15 mins',
      difficulty: 'Easy',
      floffiIngredient: 'Gulkhand Jam',
      description: 'A quick, rolled breakfast toast filled with aromatic rose petal jam. Perfect for busy school mornings.',
      ingredients: [
        '4 slices of White or Whole-wheat bread',
        '2 tbsp Floffi Gulkhand Jam',
        '1 tbsp unsalted butter (softened)',
        '1 tsp finely chopped pistachios (optional)',
        'A pinch of cinnamon powder'
      ],
      instructions: [
        'Trim the crusts off the bread slices.',
        'Use a rolling pin to flatten each slice of bread completely.',
        'Spread a thin layer of softened butter on one side, followed by a generous layer of Floffi Gulkhand Jam.',
        'Sprinkle cinnamon powder and chopped pistachios over the jam.',
        'Roll the bread tightly into cylinder rolls.',
        'Slightly toast the rolls in a pan with a drop of butter until golden-brown, then slice and serve warm!'
      ]
    },
    {
      // Pancakes
      id: 'nectar-pancakes',
      name: 'Sun-Drizzled Nectar Pancakes',
      category: 'breakfast',
      image: instaPancakes,
      prepTime: '20 mins',
      difficulty: 'Medium',
      floffiIngredient: 'Rose Nectar Spread / Hibiscus Nectar',
      description: 'Stack of hot fluffy pancakes drizzled with sweet rose nectar and fresh berries. A weekend breakfast favorite.',
      ingredients: [
        '1 cup All-purpose flour',
        '1 tbsp Sugar',
        '1 tsp Baking powder',
        '1/2 tsp Baking soda',
        '1/2 tsp Salt',
        '3/4 cup Buttermilk',
        '2 tbsp melted butter',
        '1 egg',
        '3 tbsp Floffi Rose Nectar Spread',
        'Fresh strawberries and mint (for garnish)'
      ],
      instructions: [
        'Whisk the flour, sugar, baking powder, baking soda, and salt together in a bowl.',
        'In a separate bowl, beat the egg, buttermilk, and melted butter.',
        'Pour wet ingredients into the dry ingredients and stir gently until just combined (do not overmix).',
        'Heat a non-stick griddle over medium heat and grease lightly with butter.',
        'Pour 1/4 cup batter for each pancake. Cook until bubbles form on top, then flip and cook the other side.',
        'Stack the warm pancakes, garnish with fresh berries, and drizzle generously with Floffi Rose Nectar Spread!'
      ]
    },
    {
      id: 'hibiscus-milkshake',
      name: 'Tangy Hibiscus Milkshake',
      category: 'dessert',
      image: instaToast,
      prepTime: '10 mins',
      difficulty: 'Easy',
      floffiIngredient: 'Hibiscus Nectar Spread',
      description: 'Creamy, sweet, and tangy dessert drink infused with hibiscus blossoms and vanilla ice cream.',
      ingredients: [
        '2 cups chilled full-cream Milk',
        '2 scoops Vanilla Ice Cream',
        '3 tbsp Floffi Hibiscus Nectar Spread',
        '1/2 tsp Vanilla extract',
        'Whipped cream (for topping)',
        'Edible flower petals (for decoration)'
      ],
      instructions: [
        'Pour the chilled milk, vanilla ice cream, vanilla extract, and Floffi Hibiscus Nectar Spread into a blender jar.',
        'Blend on high speed for 1-2 minutes until thick and frothy.',
        'Drizzle a small amount of Hibiscus Nectar around the inside of the serving glass for decoration.',
        'Pour the milkshake into the decorated glass.',
        'Top with whipped cream, garnish with edible petals, and serve immediately with a straw!'
      ]
    },
    {
      id: 'aavaram-dosa',
      name: 'Aavaram Savory Spicy Dosa',
      category: 'snack',
      image: shelfDisplay,
      prepTime: '10 mins',
      difficulty: 'Easy',
      floffiIngredient: 'Aavaram Thokku',
      description: 'Crispy South Indian dosa spread with a spicy, herbal layer of wood-pressed Aavaram Thokku. Quick evening snack.',
      ingredients: [
        '2 cups fermented Dosa Batter',
        '2 tbsp Floffi Aavaram Thokku',
        '1 tbsp Ghee or Oil',
        '1/2 cup grated Paneer or Cheese (optional)',
        'Fresh curry leaves'
      ],
      instructions: [
        'Heat a dosa tawa (griddle) over medium-high heat and grease lightly.',
        'Pour a ladleful of dosa batter in the center and spread it in circular motions to make a thin, crispy crepe.',
        'Drizzle ghee or oil around the edges of the dosa.',
        'Once the bottom starts cooking, spread 1 to 2 tablespoons of Floffi Aavaram Thokku evenly over the top surface.',
        'Sprinkle grated paneer or cheese in the center (if using).',
        'Fold the dosa in half when crispy and golden-brown, then serve with coconut chutney!'
      ]
    }
  ];

  const filteredRecipes = filter === 'all' ? recipes : recipes.filter(r => r.category === filter);

  return (
    <div className="pt-24 bg-white">
      {/* Banner */}
      <section className="py-16 bg-cream-dark" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full mb-4 shadow-sm">
            <Sparkles size={14} style={{ color: 'var(--hibiscus-red)' }} />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-earthy-light">Recipe Corner</span>
          </div>
          <h1 className="font-heading font-extrabold text-earthy-brown mb-4">Floral Cooking Inspiration</h1>
          <p className="text-base text-earthy-light max-w-2xl mx-auto">
            Discover simple and creative recipes to incorporate edible flower spreads and chutneys into your daily household meals.
          </p>
        </div>
      </section>

      {/* Recipes Listing */}
      <section className="section">
        <div className="container">
          
          {/* Filters */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-bg-cream-dark p-2 rounded-full" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
              {[
                { id: 'all', name: 'All Recipes' },
                { id: 'breakfast', name: 'Breakfast Specials' },
                { id: 'dessert', name: 'Desserts & Drinks' },
                { id: 'snack', name: 'Quick Snacks' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-300 border-none cursor-pointer focus:outline-none ${
                    filter === tab.id
                      ? 'bg-white shadow-sm text-hibiscus-red'
                      : 'text-earthy-light hover:text-earthy-brown'
                  }`}
                  style={{
                    color: filter === tab.id ? 'var(--hibiscus-red)' : 'var(--earthy-light)'
                  }}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-pink-200/10 text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-earthy-brown shadow-sm">
                        🌸 {recipe.floffiIngredient}
                      </span>
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Meta */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-xs font-semibold text-earthy-light">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {recipe.prepTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <ChefHat size={14} />
                          {recipe.difficulty}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-xl text-earthy-brown line-clamp-1">
                        {recipe.name}
                      </h3>

                      <p className="text-sm text-earthy-light line-clamp-2 leading-relaxed">
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="btn btn-secondary w-full py-2.5 text-sm"
                      style={{ color: 'var(--hibiscus-red)', borderColor: 'var(--floral-pink)' }}
                    >
                      View Full Recipe
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Recipe Steps Detail Popup Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute right-4 top-4 p-2 bg-white/95 rounded-full text-earthy-brown hover:text-hibiscus-red transition-colors border border-pink-200/10 shadow-sm z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Recipe Cover */}
                <div className="flex flex-col md:flex-row gap-6 items-start pb-4 border-b border-earthy-brown/10">
                  <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 md:w-2/3">
                    <span className="text-xs font-bold text-hibiscus-red bg-floral-pink-light px-3 py-1 rounded-full uppercase tracking-wider">
                      🌸 {selectedRecipe.floffiIngredient}
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl text-earthy-brown leading-tight">
                      {selectedRecipe.name}
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-semibold text-earthy-light pt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {selectedRecipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat size={14} />
                        {selectedRecipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ingredients list */}
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-earthy-brown mb-3">Ingredients:</h3>
                  <ul className="space-y-2.5 text-sm text-earthy-light">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-full bg-leaf-green-light text-leaf-green flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directions / Instructions list */}
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-earthy-brown mb-3">Instructions:</h3>
                  <ol className="space-y-4 text-sm text-earthy-light">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-floral-pink text-earthy-brown flex-shrink-0 flex items-center justify-center font-heading font-bold text-xs mt-0.5" style={{ backgroundColor: 'var(--floral-pink)' }}>
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-4 bg-bg-cream-dark border-t border-earthy-brown/10 flex justify-end" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="btn btn-primary py-2 px-6 text-sm"
                >
                  Got It, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
