import React, { useEffect, useState } from 'react';

const ChristmasDecorations = () => {
  const [snowflakes, setSnowflakes] = useState([]);
  const [showBells, setShowBells] = useState(true);

  useEffect(() => {
    // Create snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 5,
      fontSize: Math.random() * 10 + 10
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {/* Snowfall Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake absolute text-white opacity-80"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.fontSize}px`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Jingle Bells Corner Decoration */}
      {showBells && (
        <div className="fixed top-4 right-4 z-50 pointer-events-auto">
          <div className="relative bg-gradient-to-br from-red-600 to-green-600 p-4 rounded-full shadow-2xl animate-bounce-slow">
            <div className="text-4xl animate-swing">
              🔔
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-400 rounded-full animate-pulse"></div>
            <button
              onClick={() => setShowBells(false)}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-red-600 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
              title="Hide decorations"
            >
              ✕
            </button>
          </div>
          
          {/* Holly decoration */}
          <div className="absolute -top-3 -left-3 text-2xl animate-pulse">
            🎄
          </div>
        </div>
      )}

      {/* Christmas Lights Top Border */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="flex justify-around py-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'][i % 5],
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Snowman Corner */}
      <div className="fixed bottom-20 left-4 z-40 pointer-events-none animate-float">
        <div className="text-6xl">
          ⛄
        </div>
      </div>

      {/* Santa Corner */}
      <div className="fixed bottom-20 right-4 z-40 pointer-events-none animate-float" style={{ animationDelay: '1s' }}>
        <div className="text-6xl">
          🎅
        </div>
      </div>

      {/* Gift Box */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none animate-bounce-slow">
        <div className="text-4xl">
          🎁
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .snowflake {
          animation: fall linear infinite;
        }

        .animate-swing {
          animation: swing 1s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ChristmasDecorations;
