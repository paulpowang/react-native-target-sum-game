import {StyleSheet, Text, View} from 'react-native';
import React, {ReactElement, FC, useState, useCallback, useEffect} from 'react';
import RandomNumber from './RandomNumber';

type Props = {
  randomNumberCount: number;
};

const Game: FC<Props> = ({randomNumberCount}): ReactElement => {
  const generateRandomNumbers = useCallback(
    () =>
      Array.from({length: randomNumberCount}).map(
        () => 1 + Math.floor(10 * Math.random()),
      ),
    [randomNumberCount],
  );
  const [randomNumbers, setRandomNumbers] = useState(() =>
    generateRandomNumbers(),
  );
  const [targetSum, setTargetSum] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);

  type FormatedNumberArrType = {
    isPressed: boolean;
    number: number;
  };
  const shuffle = (numArr: FormatedNumberArrType[], count: number = 5) => {
    let size = numArr?.length || 0;
    let randomIndex1, randomIndex2, temp;
    for (let i = 0; i < count; i++) {
      randomIndex1 = Math.floor(size * Math.random());
      randomIndex2 = Math.floor(size * Math.random());
      if (
        randomIndex1 === randomIndex2 ||
        numArr[randomIndex1] === numArr[randomIndex2]
      ) {
        continue;
      }

      temp = numArr[randomIndex1];
      numArr[randomIndex1] = numArr[randomIndex2];
      numArr[randomIndex2] = temp;
      return numArr;
    }
  };

  const [formatedNumbers, setFormatedNumbers] = useState<
    FormatedNumberArrType[]
  >(
    randomNumbers.map(number => ({
      isPressed: false,
      number: number,
    })),
  );
  useEffect(() => {
    setTargetSum(
      randomNumbers
        .slice(0, randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0),
    );

    setFormatedNumbers(prev => {
      if (!prev) {
        return [];
      }
      return shuffle(prev);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomNumbers]);
  const [currentSum, setCurrentSum] = useState(0);

  useEffect(() => {
    setCurrentSum(
      formatedNumbers.reduce(
        (acc, curr) => acc + (curr.isPressed ? curr.number : 0),
        0,
      ),
    );
  }, [formatedNumbers]);

  useEffect(() => {
    if (currentSum === targetSum && currentSum !== 0) {
      setIsWon(true);
      reset();
      setScore(pre => pre + 1);
    } else {
      setIsWon(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSum]);

  function reset() {
    const newRandomNumbers = generateRandomNumbers();
    setRandomNumbers(newRandomNumbers);
    setIsWon(false);
    setCurrentSum(0);
    setFormatedNumbers(
      newRandomNumbers.map(number => ({
        isPressed: false,
        number: number,
      })),
    );
  }

  console.log(formatedNumbers);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.target}>{targetSum}</Text>
      <Text
        style={[
          styles.target,
          styles.currentSum,
          isWon && styles.targetMatched,
        ]}>
        {currentSum}
      </Text>
      <Text>{randomNumberCount}</Text>
      <View style={styles.randomNumberContainer}>
        {formatedNumbers.map((randomNumber, index) => (
          <RandomNumber
            key={index}
            randomNumber={randomNumber.number}
            onPress={() =>
              setFormatedNumbers(prev => {
                prev[index].isPressed = !prev[index].isPressed;
                return [...prev];
              })
            }
            isSelected={randomNumber.isPressed}
          />
        ))}
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 30,
  },
  score: {
    fontSize: 20,
    backgroundColor: '#aaa',
    marginHorizontal: 100,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
  currentSum: {marginTop: 10, backgroundColor: 'red'},
  targetMatched: {backgroundColor: 'green'},
  randomNumberContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  randomNumberText: {
    fontSize: 35,
    backgroundColor: 'green',
    textAlign: 'center',
    width: 100,
    marginHorizontal: 50,
    marginVertical: 25,
  },
});
