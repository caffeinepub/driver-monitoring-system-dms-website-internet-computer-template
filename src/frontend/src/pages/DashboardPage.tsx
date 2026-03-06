import { SessionStatus } from "@/backend";
import EventTypeBadge from "@/components/dms/EventTypeBadge";
import QueryState from "@/components/dms/QueryState";
import SeedDemoDataButton from "@/components/dms/SeedDemoDataButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllSessions, useGetTotalEventsCount } from "@/hooks/dmsQueries";
import { useNavigate } from "@tanstack/react-router";
import { Activity, AlertTriangle, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    data: sessions,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useGetAllSessions();
  const { data: totalEvents, isLoading: eventsLoading } =
    useGetTotalEventsCount();

  const isLoading = sessionsLoading || eventsLoading;
  const error = sessionsError;

  // Calculate metrics
  const activeSessions =
    sessions?.filter((s) => s.status === SessionStatus.active).length || 0;
  const _completedSessions =
    sessions?.filter((s) => s.status === SessionStatus.completed).length || 0;
  const latestSession =
    sessions && sessions.length > 0
      ? sessions.reduce((latest, current) =>
          current.startTime > latest.startTime ? current : latest,
        )
      : null;

  // Count events by type
  const eventCounts =
    sessions?.reduce(
      (acc, session) => {
        for (const event of session.events) {
          if ("speedViolation" in event.eventType) {
            acc.speedViolation = (acc.speedViolation || 0) + 1;
          } else if ("hardBraking" in event.eventType) {
            acc.hardBraking = (acc.hardBraking || 0) + 1;
          } else if ("laneDeparture" in event.eventType) {
            acc.laneDeparture = (acc.laneDeparture || 0) + 1;
          }
        }
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  const formatDuration = (start: bigint, end?: bigint) => {
    if (!end) return "In progress";
    const durationMs = Number(end - start) / 1000000;
    const minutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor driver sessions and safety events
          </p>
        </div>
        <SeedDemoDataButton />
      </div>

      <QueryState isLoading={isLoading} error={error}>
        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalEvents?.toString() || "0"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sessions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSessions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Speed Violations
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventCounts.speedViolation || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total recorded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Session
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestSession ? `#${latestSession.id}` : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {latestSession
                  ? formatDate(latestSession.startTime)
                  : "No sessions yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Event Type Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Event Summary</CardTitle>
            <CardDescription>
              Breakdown of detected safety events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <EventTypeBadge type="speedViolation" />
                <div>
                  <p className="text-2xl font-bold">
                    {eventCounts.speedViolation || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Speed Violations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EventTypeBadge type="hardBraking" />
                <div>
                  <p className="text-2xl font-bold">
                    {eventCounts.hardBraking || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Hard Braking</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EventTypeBadge type="laneDeparture" />
                <div>
                  <p className="text-2xl font-bold">
                    {eventCounts.laneDeparture || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lane Departures
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>
              {sessions && sessions.length > 0
                ? `Showing ${sessions.length} session${sessions.length !== 1 ? "s" : ""}`
                : "No sessions found. Load demo data to get started."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sessions && sessions.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session ID</TableHead>
                      <TableHead>Driver ID</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id.toString()}>
                        <TableCell className="font-medium">
                          #{session.id.toString()}
                        </TableCell>
                        <TableCell>
                          Driver {session.driverId.toString()}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(session.startTime)}
                        </TableCell>
                        <TableCell>
                          {formatDuration(session.startTime, session.endTime)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              session.status === SessionStatus.active
                                ? "bg-primary/10 text-primary"
                                : session.status === SessionStatus.completed
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {session.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {session.events.length}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate({
                                to: "/session/$sessionId",
                                params: { sessionId: session.id.toString() },
                              })
                            }
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No sessions available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </QueryState>
    </div>
  );
}
