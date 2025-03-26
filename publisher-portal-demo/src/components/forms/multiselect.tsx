import React, { useEffect, useState } from 'react';

const Multiselect = () => {
  const predefinedValues = [
    "placementRecordScore",
    "academicScore",
    "infrastructureScore",
    "researchOpportunitiesScore",
    "industryConnectionScore",
    "costEffectivenessScore",
    "influenceFactor"
  ]
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(predefinedValues);

  useEffect(() => {
    let get_local_storage = JSON.parse(localStorage.getItem("form_data") || "{}");
    console.log("Initial local storage data:", get_local_storage);
  
    predefinedValues.forEach(e => {
      if (values.includes(e)) {
        get_local_storage[e] = 1;
      } else {
        get_local_storage[e] = 0;
      }
    });
  
    localStorage.setItem("form_data", JSON.stringify(get_local_storage));
  
    console.log("Updated local storage data:", get_local_storage);
  }, [values, predefinedValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue: string = event.target.value;
    setInputValue(newInputValue);

    if (newInputValue.trim() !== '') {
      const filteredSuggestions = predefinedValues.filter(
        (value) =>
          value.toLowerCase().includes(newInputValue.toLowerCase()) && !values.includes(value)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(predefinedValues);
    }
  };

  const handleSelectSuggestion = (value: string) => {
    if (!values.includes(value)) {
      setValues((prevValues) => [...prevValues, value]);
    }
    setInputValue('');
    setSuggestions(predefinedValues.filter((suggestion) => !values.includes(suggestion)));
    setSuggestions((prevSuggestions) => prevSuggestions.filter((v) => v !== value));

  };

  const handleDelete = (valueToDelete: string) => {
    setValues(values.filter((value) => value !== valueToDelete));
    setSuggestions((prevSuggestions) => [...prevSuggestions, valueToDelete]);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
    e.preventDefault();
    if (!values.includes(value)) {
      setValues((prevValues) => [...prevValues, value]);
    }
    setSuggestions((prevSuggestions) => prevSuggestions.filter((v) => v !== value));
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <div className="p-6 w-full flex flex-col justify-center items-center bg-[#9f9f9f87] backdrop-blur-md rounded-[20px] shadow-lg mb-6 relative m-6">
        <div className="w-full max-w-[400px] flex flex-col justify-center items-center p-6">
            <h1 className="text-[#FFFFFF] text-[24px] font-[600] text-center mb-16">
                Rank Your Top 3 Priorities for Choosing a College
            </h1>
          <div className="w-full h-auto min-h-[74px] bg-white flex flex-wrap items-center gap-2 mb-4 p-2 border border-gray-300 rounded-lg">
            {values.map((value, index) => (
              <div key={index} className="flex items-center bg-[#FFBD58] text-[#323232] px-3 py-1 rounded-full">
                <span>{value}</span>
                <button
                  onClick={() => handleDelete(value)}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a tag..."
              className="flex-1 p-2 border-none text-black outline-none bg-transparent focus:ring-0"
            />
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && inputValue && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md">
              <ul className="max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-blue-500 text-black"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* List of available tags (buttons) */}
        <div className="flex flex-col mt-4 w-full max-w-[400px] p-2 gap-4">
          <ul className="list-disc pl-5 flex flex-row flex-wrap gap-2">
            {suggestions.map((value, index) => (
              <button
                key={index}
                className="p-[3px_14px] bg-gray-200 rounded-full text-black"
                onClick={(e) => handleClick(e, value)}
              >
                {value}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Multiselect;
