import { useState, useEffect } from "react";
import laptop from "../assets/laptop.svg";

const Laptop = () => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Close menu on Escape
      if (event.key === "Escape") {
        setShowMenu(false);
        return;
      }

      // Only handle keyboard shortcuts when menu is closed or specifically for menu
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "m":
          case "M":
            event.preventDefault();
            setShowMenu((prev) => !prev);
            break;
          case "r":
          case "R":
            event.preventDefault();
            resetTransform();
            break;
          case "0":
            event.preventDefault();
            resetTransform();
            break;
          case "=":
          case "+":
            event.preventDefault();
            handleScale(scale + 0.25);
            break;
          case "-":
            event.preventDefault();
            handleScale(Math.max(0.1, scale - 0.25));
            break;
          case "]":
            event.preventDefault();
            handleRotate(rotation + 15);
            break;
          case "[":
            event.preventDefault();
            handleRotate(rotation - 15);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [scale, rotation]);

  const handleRotate = (degrees) => {
    setRotation(degrees);
  };

  const rotateBy = (degrees) => {
    setRotation((prev) => prev + degrees);
  };

  const handleScale = (newScale) => {
    setScale(Math.max(0.1, newScale)); // Prevent scaling below 0.1
  };

  const scaleBy = (factor) => {
    setScale((prev) => Math.max(0.1, prev * factor));
  };

  const resetTransform = () => {
    setRotation(0);
    setScale(1);
  };

  const predefinedRotations = [
    { label: "Portrait ↑", degrees: 0 },
    { label: "Portrait ↓", degrees: 180 },
    { label: "Landscape →", degrees: 90 },
    { label: "Landscape ←", degrees: -90 },
    { label: "Diagonal ↗", degrees: 45 },
    { label: "Diagonal ↙", degrees: -135 },
  ];

  const predefinedScales = [
    { label: "Fit Screen", scale: 0.8 },
    { label: "Original", scale: 1 },
    { label: "Zoom 2x", scale: 2 },
    { label: "Zoom 3x", scale: 3 },
    { label: "Thumbnail", scale: 0.3 },
  ];

  return (
    <div className="bg-slate-900 w-full h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Menu Toggle Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg z-10"
        title="Toggle Menu (Ctrl+M)"
      >
        ☰ Menu
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-xl p-4 z-20 min-w-64">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 mb-2">Rotation</h3>
            <div className="grid grid-cols-2 gap-2">
              {predefinedRotations.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleRotate(item.degrees)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => rotateBy(-15)}
                className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded flex-1"
              >
                -15°
              </button>
              <button
                onClick={() => rotateBy(15)}
                className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded flex-1"
              >
                +15°
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-800 mb-2">Scale</h3>
            <div className="grid grid-cols-2 gap-2">
              {predefinedScales.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScale(item.scale)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => scaleBy(0.8)}
                className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded flex-1"
              >
                Zoom Out
              </button>
              <button
                onClick={() => scaleBy(1.25)}
                className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded flex-1"
              >
                Zoom In
              </button>
            </div>
          </div>

          <button
            onClick={resetTransform}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset All (Ctrl+R)
          </button>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <h4 className="font-bold text-gray-800 mb-2 text-sm">
              Keyboard Shortcuts:
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Ctrl+M - Toggle Menu</div>
              <div>Ctrl+R - Reset</div>
              <div>Ctrl+0 - Reset</div>
              <div>Ctrl++ - Zoom In</div>
              <div>Ctrl+- - Zoom Out</div>
              <div>Ctrl+] - Rotate Right</div>
              <div>Ctrl+[ - Rotate Left</div>
              <div>ESC - Close Menu</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Controls (Visible when menu is closed) */}
      {!showMenu && (
        <div className="mb-8 flex gap-4 flex-wrap justify-center">
          <div className="flex gap-2">
            <button
              onClick={() => rotateBy(-90)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Rotate -90°
            </button>
            <button
              onClick={() => rotateBy(-45)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Rotate -45°
            </button>
            <button
              onClick={resetTransform}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
            <button
              onClick={() => rotateBy(45)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Rotate 45°
            </button>
            <button
              onClick={() => rotateBy(90)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Rotate 90°
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scaleBy(0.5)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Scale 0.5x
            </button>
            <button
              onClick={() => scaleBy(0.8)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Scale 0.8x
            </button>
            <button
              onClick={() => scaleBy(1.25)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Scale 1.25x
            </button>
            <button
              onClick={() => scaleBy(1.5)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Scale 1.5x
            </button>
          </div>
        </div>
      )}

      {/* Laptop Image with Transform */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={laptop}
          className="transition-all duration-300 ease-in-out"
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transformOrigin: "center",
          }}
          alt="Laptop"
        />
      </div>

      {/* Current State Display */}
      <div className="mt-4 text-white text-center">
        <p className="text-lg">
          Rotation: {rotation}° | Scale: {scale}x
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Press Ctrl+M for menu • ESC to close
        </p>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
};

export default Laptop;
