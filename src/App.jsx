import { useState, useCallback, useEffect, useRef } from "react";
import { HiClipboardCopy } from "react-icons/hi";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+-=[]{}|:<>.,/?~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    document.execCommand("copy");
  }, [passwordRef]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Password Generator
        </h1>
        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            className="w-full p-4 pr-12 border rounded outline-none focus:border-blue-500"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="absolute top-0 right-0 h-full px-4 bg-blue-600 text-white rounded-r outline-none hover:bg-blue-700"
          >
            <HiClipboardCopy className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="text-gray-700">Password Length:</label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer w-40"
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="text-gray-700">{length}</span>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <span className="ml-2">Include Numbers</span>
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <span className="ml-2">Include Special Characters</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;