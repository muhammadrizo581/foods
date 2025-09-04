import { useState, useEffect } from "react";

const Form = ({ onClose, onAddFood, onUpdateFood, editFood }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isHalal, setIsHalal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");

  useEffect(() => {
    if (editFood) {
      setName(editFood.name);
      setDescription(editFood.description);
      setPrice(editFood.price);
      setCategory(editFood.category);
      setIsHalal(editFood.isHalal);
      setCountries(editFood.countries || []);
    }
  }, [editFood]);

  const handleAddCountry = () => {
    if (countryInput.trim() !== "") {
      setCountries((prev) => [...prev, countryInput.trim()]);
      setCountryInput("");
    }
  };

  const handleRemoveCountry = (country) => {
    setCountries((prev) => prev.filter((c) => c !== country));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const food = {
      id: editFood ? editFood.id : Date.now(),
      name,
      description,
      price,
      category,
      isHalal,
      countries,
    };
    if (editFood) {
      onUpdateFood(food);
    } else {
      onAddFood(food);
    }
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-screen bg-black/30"
      />
      <div className="fixed top-1/2 left-1/2 w-[500px] bg-white -translate-1/2 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">
          {editFood ? "Update Food" : "Create Food"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full h-10 indent-3 rounded-lg border-gray-200"
            type="text"
            placeholder="name"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full h-10 indent-3 rounded-lg border-gray-200"
            type="text"
            placeholder="description"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border w-full h-10 indent-3 rounded-lg border-gray-200"
            type="number"
            placeholder="price"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border w-full h-10 indent-3 rounded-lg border-gray-200"
            type="text"
            placeholder="category"
          />

          <div className="flex gap-2 items-center">
            <input
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              className="border flex-1 h-10 indent-3 rounded-lg border-gray-200"
              type="text"
              placeholder="country"
            />
            <button
              type="button"
              onClick={handleAddCountry}
              className="bg-slate-900 text-white px-3 rounded-lg text-xl"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {countries.map((country, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
              >
                <span>{country}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCountry(country)}
                  className="text-red-600 font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <h4 className="font-bold text-lg">Is halal?</h4>
            <input
              type="checkbox"
              checked={isHalal}
              onChange={() => setIsHalal(!isHalal)}
              className="size-[25px]"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 bg-slate-900 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
