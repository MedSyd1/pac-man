import { useEffect, useState } from "react";
import "./App.css";
import {
  BORDERS,
  UPCELLS,
  DOWNCELLS,
  RIGTHCELLS,
  LEFTCELLS,
  HR,
  VR,
  TR,
  TL,
  DR,
  DL,
  UT,
  DB,
  LL,
  RR,
} from "./utils";
import Pac from "./components/pac";
import Gold from "./components/gold";
import { COINS } from "./utils";
import { Ghost } from "./components/ghost";

const randomPosition = (array: number[], pacPosition: number) => {
  let position = array[Math.round(Math.random() * 382)];
  while (position === pacPosition || position === undefined)
    position = array[Math.round(Math.random() * 382)];
  return position;
};

const resetGame = (
  coordinates: { position: number; direction: string },
  setCoordinates: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string }>
  >,
  setCoins: React.Dispatch<React.SetStateAction<number[]>>,
  setG1: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string; color: string }>
  >,
  setG2: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string; color: string }>
  >,
  setG3: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string; color: string }>
  >,
  setG4: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string; color: string }>
  >,
  setCheck1: React.Dispatch<React.SetStateAction<boolean>>,
  setCheck2: React.Dispatch<React.SetStateAction<boolean>>,
  setCheck3: React.Dispatch<React.SetStateAction<boolean>>,
  setCheck4: React.Dispatch<React.SetStateAction<boolean>>,
  coins: number[],
  g1: { position: number; direction: string; color: string },
  g2: { position: number; direction: string; color: string },
  g3: { position: number; direction: string; color: string },
  g4: { position: number; direction: string; color: string }
) => {
  if (
    coordinates.position === g1.position ||
    coordinates.position === g2.position ||
    coordinates.position === g3.position ||
    coordinates.position === g4.position
  ) {
    setCoordinates({
      position: 756,
      direction: "",
    });
    setCoins(COINS);
    setG1({
      ...g1,
      position: randomPosition(coins, coordinates.position),
      direction: "L",
    });
    setG2({
      ...g2,
      position: randomPosition(coins, coordinates.position),
      direction: "R",
    });
    setG3({
      ...g3,
      position: randomPosition(coins, coordinates.position),
      direction: "U",
    });
    setG4({
      ...g4,
      position: randomPosition(coins, coordinates.position),
      direction: "D",
    });
    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setCheck4(false);
  }
};

const moveGhost = (
  g1: { position: number; direction: string; color: string },
  changeDirection: (direction: string, array: string[]) => string,
  setG1: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string; color: string }>
  >,
  setCheck: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let DIR = ["L", "R", "U", "D"];
  if (g1.direction === "L" && BORDERS.includes(g1.position - 1))
    setG1({ ...g1, direction: changeDirection(g1.direction, DIR) });
  if (g1.direction === "R" && BORDERS.includes(g1.position + 1))
    setG1({ ...g1, direction: changeDirection(g1.direction, DIR) });
  if (g1.direction === "D" && BORDERS.includes(g1.position + 40))
    setG1({ ...g1, direction: changeDirection(g1.direction, DIR) });
  if (g1.direction === "U" && BORDERS.includes(g1.position - 40))
    setG1({ ...g1, direction: changeDirection(g1.direction, DIR) });

  if (g1.direction === "L" && !BORDERS.includes(g1.position - 1))
    setG1({ ...g1, position: g1.position - 1 });
  if (g1.direction === "R" && !BORDERS.includes(g1.position + 1))
    setG1({ ...g1, position: g1.position + 1 });
  if (g1.direction === "U" && !BORDERS.includes(g1.position - 40))
    setG1({ ...g1, position: g1.position - 40 });
  if (g1.direction === "D" && !BORDERS.includes(g1.position + 40))
    setG1({ ...g1, position: g1.position + 40 });
  setCheck(false);

  DIR = ["L", "R", "U", "D"];
};

const createBoard = (BOARD_SIZE: any) => {
  let counter1 = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currenRow = [];
    for (let col = 0; col < BOARD_SIZE + 20; col++) {
      currenRow.push(counter1++);
    }
    board.push(currenRow);
  }
  return board;
};

const movePac = (
  coordinates: { position: number; direction: string },
  setCoordinates: React.Dispatch<
    React.SetStateAction<{ position: number; direction: string }>
  >
) => {
  if (coordinates.position === 400)
    setCoordinates({ position: 361, direction: "R" });
  if (coordinates.position === 361)
    setCoordinates({ position: 400, direction: "L" });

  if (
    coordinates.direction === "L" &&
    !BORDERS.includes(coordinates.position - 1)
  )
    setCoordinates({ ...coordinates, position: coordinates.position - 1 });
  if (
    coordinates.direction === "U" &&
    !BORDERS.includes(coordinates.position - 40)
  )
    setCoordinates({ ...coordinates, position: coordinates.position - 40 });
  if (
    coordinates.direction === "D" &&
    !BORDERS.includes(coordinates.position + 40)
  )
    setCoordinates({ ...coordinates, position: coordinates.position + 40 });
  if (
    coordinates.direction === "R" &&
    !BORDERS.includes(coordinates.position + 1)
  )
    setCoordinates({ ...coordinates, position: coordinates.position + 1 });
};

const App = () => {
  const [coordinates, setCoordinates] = useState({
    position: 756,
    direction: "",
  });
  const [board, setBoard] = useState(createBoard(20));
  const [coins, setCoins] = useState(COINS);

  const [g1, setG1] = useState({
    position: randomPosition(coins, coordinates.position),
    direction: "L",
    color: "red",
  });
  const [g2, setG2] = useState({
    position: randomPosition(coins, coordinates.position),
    direction: "R",
    color: "green",
  });
  const [g3, setG3] = useState({
    position: randomPosition(coins, coordinates.position),
    direction: "U",
    color: "yellow",
  });
  const [g4, setG4] = useState({
    position: randomPosition(coins, coordinates.position),
    direction: "D",
    color: "blue",
  });

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  useEffect(() => {
    let inter = setInterval(async () => {
      resetGame(
        coordinates,
        setCoordinates,
        setCoins,
        setG1,
        setG2,
        setG3,
        setG4,
        setCheck1,
        setCheck2,
        setCheck3,
        setCheck4,
        coins,
        g1,
        g2,
        g3,
        g4
      );
    }, 1);
    return () => clearInterval(inter);
  }, [g1, g2, g3, g4]);

  useEffect(() => {
    if (coins.includes(coordinates.position))
      setCoins([...coins.filter((e) => e !== coordinates.position)]);
    resetGame(
      coordinates,
      setCoordinates,
      setCoins,
      setG1,
      setG2,
      setG3,

      setG4,
      setCheck1,
      setCheck2,
      setCheck3,
      setCheck4,
      coins,
      g1,
      g2,
      g3,
      g4
    );
  }, [coordinates]);

  useEffect(() => {
    let inter = setInterval(() => {
      movePac(coordinates, setCoordinates);
      resetGame(
        coordinates,
        setCoordinates,
        setCoins,
        setG1,
        setG2,
        setG3,
        setG4,
        setCheck1,
        setCheck2,
        setCheck3,
        setCheck4,
        coins,
        g1,
        g2,
        g3,
        g4
      );
    }, 100);
    return () => clearInterval(inter);
  }, [coordinates]);

  useEffect(() => {
    const handleKeyPressed = (e: any) => {
      if (e.keyCode === 40 && !BORDERS.includes(coordinates.position + 40)) {
        setCoordinates({ ...coordinates, direction: "D" });
      } else if (
        e.keyCode === 39 &&
        !BORDERS.includes(coordinates.position + 1)
      ) {
        setCoordinates({ ...coordinates, direction: "R" });
      } else if (
        e.keyCode === 37 &&
        !BORDERS.includes(coordinates.position - 1)
      ) {
        setCoordinates({ ...coordinates, direction: "L" });
      } else if (
        e.keyCode === 38 &&
        !BORDERS.includes(coordinates.position - 40)
      ) {
        setCoordinates({ ...coordinates, direction: "U" });
      }
    };
    window.addEventListener("keydown", handleKeyPressed);
    return () => removeEventListener("keydown", handleKeyPressed);
  }, [coordinates]);

  const changeDirection = (direction: string, array: string[]) => {
    let DIR = array;
    DIR = DIR.filter((d) => d !== direction);
    return DIR[Math.round(Math.random() * (DIR.length - 1))];
  };

  const checkPaths = (currentPosition: number) => {
    let nbPaths = 0;
    if (!BORDERS.includes(currentPosition - 1)) nbPaths++;
    if (!BORDERS.includes(currentPosition + 1)) nbPaths++;
    if (!BORDERS.includes(currentPosition - 40)) nbPaths++;
    if (!BORDERS.includes(currentPosition + 40)) nbPaths++;
    return nbPaths;
  };

  useEffect(() => {
    let inter = setInterval(() => {
      let DIR = ["L", "R", "U", "D"];

      if (checkPaths(g1.position) >= 3 && check1 === false) {
        setG1({ ...g1, direction: changeDirection(g1.direction, DIR) });
        setCheck1(true);
      }
      if (checkPaths(g2.position) >= 3 && check2 === false) {
        setG2({ ...g2, direction: changeDirection(g2.direction, DIR) });
        setCheck2(true);
      }

      if (checkPaths(g3.position) >= 3 && check3 === false) {
        setG3({ ...g3, direction: changeDirection(g3.direction, DIR) });
        setCheck3(true);
      }
      if (checkPaths(g4.position) >= 3 && check4 === false) {
        setG4({ ...g4, direction: changeDirection(g4.direction, DIR) });
        setCheck4(true);
      }
    }, 10);
    return () => clearInterval(inter);
  }, [g1]);

  useEffect(() => {
    let inter = setInterval(() => {
      moveGhost(g1, changeDirection, setG1, setCheck1);
      moveGhost(g2, changeDirection, setG2, setCheck2);
      moveGhost(g3, changeDirection, setG3, setCheck3);
      moveGhost(g4, changeDirection, setG4, setCheck4);
      resetGame(
        coordinates,
        setCoordinates,
        setCoins,
        setG1,
        setG2,
        setG3,
        setG4,
        setCheck1,
        setCheck2,
        setCheck3,
        setCheck4,
        coins,
        g1,
        g2,
        g3,
        g4
      );
    }, 100);
    return () => clearInterval(inter);
  }, [g1 || g2 || g3 || g4]);

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={"row"}>
          {row.map((cell) => (
            <div
              key={cell}
              className={[
                `${BORDERS.includes(cell) ? "border " : "cell "}`,
                `${UPCELLS.includes(cell) ? " U" : ""}`,
                `${DOWNCELLS.includes(cell) && " D"}`,
                `${RIGTHCELLS.includes(cell) && " R"}`,
                `${LEFTCELLS.includes(cell) && " L"}`,
                `${HR.includes(cell) && " HR"}`,
                `${VR.includes(cell) && " VR"}`,
                `${TR.includes(cell) && " TR"}`,
                `${TL.includes(cell) && " TL"}`,
                `${DR.includes(cell) && " DR"}`,
                `${DL.includes(cell) && " DL"}`,
                `${UT.includes(cell) && " UT"}`,
                `${DB.includes(cell) && " DB"}`,
                `${LL.includes(cell) && " LL"}`,
                `${RR.includes(cell) && " RR"}`,
              ].join(" ")}
            >
              {cell === g1.position ||
              cell === g2.position ||
              cell === g3.position ||
              cell === g4.position ? (
                <Ghost
                  color={
                    (cell === g1.position && g1.color) ||
                    (cell === g2.position && g2.color) ||
                    (cell === g3.position && g3.color) ||
                    (cell === g4.position && g4.color) ||
                    ""
                  }
                ></Ghost>
              ) : (
                ""
              )}

              {![g1.position, g2.position, g3.position, g4.position].includes(
                cell
              ) &&
                (cell === coordinates.position ? (
                  <Pac direction={coordinates.direction}></Pac>
                ) : (
                  coins.includes(cell) && <Gold></Gold>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
