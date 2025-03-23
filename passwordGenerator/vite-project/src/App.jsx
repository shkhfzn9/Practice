import { useCallback, useRef, useState, useEffect } from "react";

import "./App.css";

// mmaking a password generator
function App() {
  const [count, setCount] = useState(0);
  // setting states for number/Char
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setallowChar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null); //use ref hook so that input box refers to password use inside input as ref={passRef}

  const copyToClipboard = useCallback(() => {
    passRef.current?.select(); // to show when copy clicked text inside is highlighted ... curret? used it make current optional.. beacuase if current input box is empty it will through error
    // passRef.current?.setSelectionRange(0, 3); if used only 3 alphabets will be copied
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //use call back is a caching technique to store value and take prev value that has already been calculated + new calculations if any
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOabcderfhjsiow";
    //boolean values
    if (allowNumber) {
      str += "0123456789";
    }
    if (allowChar) {
      str += "!@#%^&*";
    }
    for (let i = 0; i < length; i++) {
      // str has become large
      let char = Math.floor(Math.random() * str.length); //str.length = 36 means char range will be from 0 -36
      // sendin 1 char in pass at a time (total appending 8 times)
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, allowNumber, allowNumber]);
  //dependency is that ..the function should run after changes in dependency [length , allowNumber, allowNumber] in this case As if Changes in these are made, the passGenerator should gnerate new password

  // now to mount in screen useEffect

  useEffect(() => {
    passwordGenerator();
  }, [length, allowChar, allowNumber, passwordGenerator]);

  return (
    <>
      <div>
        <input placeholder="password" value={password} ref={passRef} readOnly />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <div>
        {/* // range input */}
        <input
          type="range"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min={6}
          max={100}
        />
        {length}
        {/* //check boxes */}
        <input
          type="checkbox"
          onChange={() => setAllowNumber((prev) => !prev)}
          defaultChecked={allowNumber}
        />{" "}
        Number
        <input
          type="checkbox"
          onChange={() => setallowChar((prev) => !prev)}
        />{" "}
        SpecialChar
      </div>
    </>
  );
}

export default App;
