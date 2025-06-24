import React,{useEffect , useState} from 'react';

const Money=()=>{
    const[score,setScore]=useState(0);
    const[coins,setCoins]=useState([]);
    const[timeLeft,setTimeLeft]=useState(30);
    const[gameOver,setGameOver]=useState(false);

    useEffect(()=>{
        if(timeLeft>0){
            const timer=setTimeout(()=> setTimeLeft(timeLeft-1), 1000);
            return () => clearTimeout(timer);
        } else {
            setGameOver(true);
        }
    }, [timeLeft]);

    useEffect(()=>{
        if(gameOver) return;

        const interval =setInterval(() => {
            const id=Date.now();
            const left=Math.random()*90;
            

            setCoins((prev) => [...prev, {id, left}]);

            setTimeout(() => {
                setCoins((prev) => prev.filter(coin => coin.id !== id));
            }, 3000);
        }, 2000);

        return () => clearInterval(interval);
    }, [gameOver]);

    const handleCoinClick=(id)=>{
        setScore((prev) => prev + 1);
        setCoins((prev) => prev.filter(coin => coin.id !== id));
    };

    return (
        <div>
            <h2>Time Left:{timeLeft}s</h2>
            <h2>Score:{score}</h2>
            {gameOver && (
                <h2 className="game-over">Game Over! Final Score: {score}</h2>
            )}

            {coins.map(coin => (
                <div
                   key={coin.id}
                   className="coin"
                   style={{left: `${coin.left}%`}}
                     onClick={() => handleCoinClick(coin.id)}
                >
                    <img
                    src="coin.jpg"
                    alt="coin"
                    style={{width:"40px",height:"40px"}}
                    />
                </div>
            ))}
            </div>
    );
};
export default Money;
