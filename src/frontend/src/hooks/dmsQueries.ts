import type { Driver, Event, Session } from "@/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// Query keys
const QUERY_KEYS = {
  sessions: ["sessions"],
  session: (id: bigint) => ["session", id.toString()],
  drivers: ["drivers"],
  driver: (id: bigint) => ["driver", id.toString()],
  events: (sessionId: bigint) => ["events", sessionId.toString()],
  totalEvents: ["totalEvents"],
};

// Sessions
export function useGetAllSessions() {
  const { actor, isFetching } = useActor();

  return useQuery<Session[]>({
    queryKey: QUERY_KEYS.sessions,
    queryFn: async () => {
      if (!actor) return [];
      const sessions = await actor.getAllSessions();
      // Sort by start time descending (newest first)
      return sessions.sort((a, b) => Number(b.startTime - a.startTime));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSession(sessionId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Session>({
    queryKey: QUERY_KEYS.session(sessionId),
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getSession(sessionId);
    },
    enabled: !!actor && !isFetching,
  });
}

// Drivers
export function useGetAllDrivers() {
  const { actor, isFetching } = useActor();

  return useQuery<Driver[]>({
    queryKey: QUERY_KEYS.drivers,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDrivers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDriver(driverId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Driver>({
    queryKey: QUERY_KEYS.driver(driverId),
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getDriver(driverId);
    },
    enabled: !!actor && !isFetching,
  });
}

// Events
export function useGetEventsForSession(sessionId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Event[]>({
    queryKey: QUERY_KEYS.events(sessionId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEventsForSession(sessionId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTotalEventsCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: QUERY_KEYS.totalEvents,
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalEventsCount();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutations
export function useSeedDemoData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.seedDemoData();
    },
    onSuccess: () => {
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sessions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.drivers });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.totalEvents });
    },
  });
}

export function useCreateSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (driverId: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.createSession(driverId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sessions });
    },
  });
}

export function useCompleteSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.completeSession(sessionId);
    },
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sessions });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.session(sessionId),
      });
    },
  });
}

export function useAddEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sessionId,
      eventType,
      description,
    }: {
      sessionId: bigint;
      eventType: any;
      description: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addEvent(sessionId, eventType, description);
    },
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sessions });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.session(sessionId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.events(sessionId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.totalEvents });
    },
  });
}
