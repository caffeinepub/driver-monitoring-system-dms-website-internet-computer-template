import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Event {
    id: bigint;
    description: string;
    timestamp: bigint;
    sessionId: bigint;
    eventType: EventType;
}
export type EventType = {
    __kind__: "laneDeparture";
    laneDeparture: {
        direction: Direction;
    };
} | {
    __kind__: "speedViolation";
    speedViolation: {
        speed: bigint;
    };
} | {
    __kind__: "hardBraking";
    hardBraking: {
        gForce: number;
    };
};
export interface Session {
    id: bigint;
    startTime: bigint;
    status: SessionStatus;
    driverId: bigint;
    endTime?: bigint;
    events: Array<Event>;
}
export interface Driver {
    id: bigint;
    principal: Principal;
    birthdate: bigint;
    name: string;
    sessions: Array<bigint>;
    address: string;
    licenseNumber: string;
}
export enum Direction {
    left = "left",
    right = "right"
}
export enum SessionStatus {
    active = "active",
    cancelled = "cancelled",
    completed = "completed"
}
export interface backendInterface {
    addEvent(sessionId: bigint, eventType: EventType, description: string): Promise<bigint>;
    completeSession(sessionId: bigint): Promise<void>;
    createSession(driverId: bigint): Promise<bigint>;
    getAllDrivers(): Promise<Array<Driver>>;
    getAllSessions(): Promise<Array<Session>>;
    getDriver(driverId: bigint): Promise<Driver>;
    getEventsForSession(sessionId: bigint): Promise<Array<Event>>;
    /**
     * / Retrieves summary for a session (does not include data for all events)
     */
    getSession(sessionId: bigint): Promise<Session>;
    getSessionsForDriver(driverId: bigint): Promise<Array<Session>>;
    getTotalEventsCount(): Promise<bigint>;
    isDriverRegistered(driverId: bigint): Promise<boolean>;
    loginDriver(driverId: bigint): Promise<Driver>;
    registerDriver(name: string, address: string, licenseNumber: string, birthdate: bigint): Promise<bigint>;
    seedDemoData(): Promise<void>;
}
