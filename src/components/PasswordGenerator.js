import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeAlphabets, setIncludeAlphabets] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [lastPasswords, setLastPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("lastPasswords");
    if (storedPasswords) {
      setLastPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastPasswords", JSON.stringify(lastPasswords));
  }, [lastPasswords]);

  const generatePassword = () => {
    const numbers = "0123456789";
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()-=_+[]{}|;:,.<>?";

    let characters = "";
    let generatedPassword = "";

    if (includeNumbers) {
      characters += numbers;
    }
    if (includeAlphabets) {
      characters += alphabets;
    }
    if (includeSpecialChars) {
      characters += specialChars;
    }

    if (characters.length === 0) {
      setPassword("Please select at least one option");
      return;
    }

    for (let i = 0; i < 10; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(generatedPassword);
    setLastPasswords([...lastPasswords, generatedPassword].slice(-5));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "includeNumbers":
        setIncludeNumbers(checked);
        break;
      case "includeAlphabets":
        setIncludeAlphabets(checked);
        break;
      case "includeSpecialChars":
        setIncludeSpecialChars(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="includeNumbers"
            checked={includeNumbers}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700">Include Numbers</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="includeAlphabets"
            checked={includeAlphabets}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700">Include Alphabets</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="includeSpecialChars"
            checked={includeSpecialChars}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700">
            Include Special Characters
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        <div className="mt-4">
          <b>Generated Password: </b>
          <input type="text" className="mt-4" value={password} readOnly />
          {password && (
            <button onClick={handleCopyToClipboard} className=" ml-4 bg-gray-100">
              <FaCopy />
            </button>
          )}
        </div>
        <div className="mt-1">
          <b>Last 5 Generated Passwords:</b>
          <ul>
            {lastPasswords.map((pass, index) => (
              <li key={index}>{pass}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
