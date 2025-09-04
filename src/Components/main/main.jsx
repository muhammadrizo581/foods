import { useState } from "react";
import Form from "../Form/Form";
import FoodView from "../Food-view/Food-view";

const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [foods, setFoods] = useState([]);
  const [editFood, setEditFood] = useState(null);

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => {
    setIsVisible(false);
    setEditFood(null);
  };

  const handleAddFood = (food) => {
    setFoods((prev) => [...prev, food]);
  };

  const handleDeleteFood = (id) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const handleEditFood = (food) => {
    setEditFood(food);
    setIsVisible(true);
  };

  const handleUpdateFood = (updatedFood) => {
    setFoods((prev) =>
      prev.map((f) => (f.id === updatedFood.id ? updatedFood : f))
    );
  };

  return (
    <div className="container mx-auto">
      <div className="bg-slate-200 p-6 rounded-2xl my-6 flex justify-between items-center">
        <h2 className="text-xl font-bold uppercase">Food store</h2>
        <button
          onClick={handleOpen}
          className="bg-slate-900 text-white size-8 rounded-lg text-xl"
        >
          +
        </button>
      </div>

      {isVisible && (
        <Form
          onClose={handleClose}
          onAddFood={handleAddFood}
          onUpdateFood={handleUpdateFood}
          editFood={editFood}
        />
      )}

      <FoodView
        foods={foods}
        onDelete={handleDeleteFood}
        onEdit={handleEditFood}
      />
    </div>
  );
};

export default Main;
