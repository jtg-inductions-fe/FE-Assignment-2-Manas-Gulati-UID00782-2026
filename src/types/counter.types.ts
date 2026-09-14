export interface CounterProps {
    count: number;
    increaseHandler: () => void;
    decreaseHandler: () => void;
    disableIncrease: boolean;
}
