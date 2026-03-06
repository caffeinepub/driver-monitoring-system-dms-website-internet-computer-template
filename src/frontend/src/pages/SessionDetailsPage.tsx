import { SessionStatus } from "@/backend";
import EventTypeBadge from "@/components/dms/EventTypeBadge";
import QueryState from "@/components/dms/QueryState";
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
import { useGetSession } from "@/hooks/dmsQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Activity, ArrowLeft, Calendar, Clock, User } from "lucide-react";

export default function SessionDetailsPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams({ from: "/session/$sessionId" });
  const { data: session, isLoading, error } = useGetSession(BigInt(sessionId));

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  const formatTime = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleTimeString();
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

  const getEventTypeLabel = (eventType: any): string => {
    if ("speedViolation" in eventType) {
      return `Speed Violation (${eventType.speedViolation.speed} mph)`;
    }
    if ("hardBraking" in eventType) {
      return `Hard Braking (${eventType.hardBraking.gForce.toFixed(1)}g)`;
    }
    if ("laneDeparture" in eventType) {
      return `Lane Departure (${eventType.laneDeparture.direction})`;
    }
    return "Unknown Event";
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/dashboard" })}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <QueryState isLoading={isLoading} error={error}>
        {session && (
          <>
            {/* Session Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Session #{session.id.toString()}
              </h1>
              <p className="text-muted-foreground mt-1">
                Detailed view of monitoring session and detected events
              </p>
            </div>

            {/* Session Metadata */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Driver</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Driver {session.driverId.toString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Driver ID
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Start Time
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {formatTime(session.startTime)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(session.startTime)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Duration
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDuration(session.startTime, session.endTime)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {session.endTime ? "Completed" : "Active"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {session.events.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Safety events detected
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Session Status */}
            <Card>
              <CardHeader>
                <CardTitle>Session Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      session.status === SessionStatus.active
                        ? "bg-primary/10 text-primary"
                        : session.status === SessionStatus.completed
                          ? "bg-muted text-muted-foreground"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {session.status.toUpperCase()}
                  </span>
                  {session.endTime && (
                    <span className="text-sm text-muted-foreground">
                      Ended at {formatTime(session.endTime)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Events Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Events Timeline</CardTitle>
                <CardDescription>
                  {session.events.length > 0
                    ? `${session.events.length} event${session.events.length !== 1 ? "s" : ""} detected during this session`
                    : "No events detected during this session"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {session.events.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event ID</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {session.events
                          .sort((a, b) => Number(a.timestamp - b.timestamp))
                          .map((event) => (
                            <TableRow key={event.id.toString()}>
                              <TableCell className="font-medium">
                                #{event.id.toString()}
                              </TableCell>
                              <TableCell className="text-sm">
                                {formatTime(event.timestamp)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <EventTypeBadge
                                    type={
                                      "speedViolation" in event.eventType
                                        ? "speedViolation"
                                        : "hardBraking" in event.eventType
                                          ? "hardBraking"
                                          : "laneDeparture"
                                    }
                                  />
                                  <span className="text-sm">
                                    {getEventTypeLabel(event.eventType)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {event.description}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No events recorded for this session</p>
                    <p className="text-sm mt-2">
                      This indicates safe driving behavior
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </QueryState>
    </div>
  );
}
