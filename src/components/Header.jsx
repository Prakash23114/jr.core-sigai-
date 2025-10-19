export default function Header({ title, onBack, onThemeToggle, theme }) {
  return (
    <header className="flex justify-between items-center p-4 bg-orange-100 dark:bg-gray-800 shadow">
      <div className="flex items-center gap-2">
        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full">
            ← Back
          </button>
        )}
        <button onClick={onThemeToggle} className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-full">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}