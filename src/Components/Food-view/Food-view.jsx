const FoodView = ({ foods, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {foods.length === 0 && <p>There is no food now.</p>}

      {foods.map((food) => (
        <div
          key={food.id}
          className="border p-4 rounded-xl shadow bg-white flex flex-col gap-2"
        >
          <h3 className="text-xl font-bold">{food.name}</h3>
          <p>{food.description}</p>
          <p className="font-semibold">Price: ${food.price}</p>
          <p>Category: {food.category}</p>
          <p>
            Halal:{" "}
            <span className={food.isHalal ? "text-green-600" : "text-red-600"}>
              {food.isHalal ? "Yes ✅" : "No ❌"}
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {food.countries?.map((country, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {country}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(food)}
              className="flex-1 bg-blue-600 text-white px-3 py-1 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(food.id)}
              className="flex-1 bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodView;
