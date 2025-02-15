import { Duration } from "./Duration";

export interface OverlapResponse {
    title: string;
    overlap: boolean;
    overlapEvents: OverlapEvent[];
}

interface OverlapEvent {
    title: string;
    duration: Duration;
    date: string;
}