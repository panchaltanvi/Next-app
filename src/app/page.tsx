"use client";
import { useRouter, usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const nameRegex = /^[A-Za-z]+$/;
    const minLength = 2;
    const maxLength = 20;

    const hasRepeatingChars = (str: string) => {
      for (let i = 0; i < str.length - 2; i++) {
        if (str[i] === str[i + 1] && str[i + 1] === str[i + 2]) {
          return true;
        }
      }
      return false;
    };

    const isProperName = (str: string) => {
      return str.charAt(0) === str.charAt(0).toUpperCase() && str.slice(1) === str.slice(1).toLowerCase();
    };

    if (value === "") {
      setError("Please enter your name.");
      setIsDisabled(true);
    } else if (!nameRegex.test(value)) {
      setError("Name should only contain letters.");
      setIsDisabled(true);
    } else if (value.length < minLength || value.length > maxLength) {
      setError(`Name should be between ${minLength} and ${maxLength} characters.`);
      setIsDisabled(true);
    } else if (hasRepeatingChars(value)) {
      setError("Name should not contain repeating characters.");
      setIsDisabled(true);
    } else if (!isProperName(value)) {
      setError("Please enter a proper name with the first letter capitalized.");
      setIsDisabled(true);
    } else {
      setError("");
      setIsDisabled(false);
    }
  }, [value]);

  useEffect(() => {
    if (pathname === "/prediction") {
      router.push("page.tsx");
    }
  }, [pathname, router]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isDisabled) {
      router.push(`/prediction/${value}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Enter Your FullName
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter letters only"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            disabled={isDisabled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
