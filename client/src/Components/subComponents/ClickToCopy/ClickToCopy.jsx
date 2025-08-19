import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipIcon } from "../../../icons/icons";

export default function ClickToCopy({ modalDependency, text }) {
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  //   if copy done then reset the isCopied state after 2 second
  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  //   if modal is closed then reset the copied state
  useEffect(() => {
    if (!modalDependency) {
      setIsCopied(false);
    }
  }, [modalDependency]);

  const handleCopy = async () => {
    const valueToCopy = inputRef.current?.value;
    if (valueToCopy) {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        setIsCopied(true);
      } catch {
        setIsCopied(false);
        toast.error("Failed to copy");
      }
    } else {
      toast.error("Nothing to copy");
    }
  };
  return (
    <div className="flex shadow-sm">
      <input
        ref={inputRef}
        value={text}
        readOnly
        className="py-1 indent-2 rounded-s-lg focus:outline-none w-full bg-tertiary text-secondary"
        type="text"
      />
      <button
        className="relative py-1 rounded-e-lg bg-tertiary hover:bg-primary flex justify-center items-center w-10 h-10 transition-all group"
        onClick={handleCopy}
      >
        <ClipIcon className="text-primary" />
        <span className="absolute bottom-[130%] left-1/2 -translate-x-1/2 w-32 rounded-lg bg-tertiary text-primary text-sm text-center px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {isCopied ? "Copied!" : "Click to copy"}
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#21262D]" />
        </span>
      </button>
    </div>
  );
}
