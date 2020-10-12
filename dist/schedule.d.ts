export declare const schedule: (interval: any, duration: any, device: any) => void;
export declare class Schedule {
    device: any;
    duration: number;
    interval: number;
    isActive: boolean;
    offTimer: any;
    onPoll: any;
    pollCallback: any;
    pollTimer: any;
    timeUntil: number;
    timeLeft: number;
    constructor({ device, duration, interval, onPoll, pollCallback }: {
        device: any;
        duration: any;
        interval: any;
        onPoll: any;
        pollCallback: any;
    });
    poll(): void;
    reset(): void;
}
