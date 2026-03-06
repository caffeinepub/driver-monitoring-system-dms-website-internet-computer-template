import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";

actor {
  /// Type definitions
  type SessionStatus = {
    #active;
    #completed;
    #cancelled;
  };

  module SessionStatus {
    public func compare(a : SessionStatus, b : SessionStatus) : Order.Order {
      switch (a, b) {
        case (#active, #active) { #equal };
        case (#active, _) { #less };
        case (#completed, #active) { #greater };
        case (#completed, #completed) { #equal };
        case (#completed, _) { #less };
        case (#cancelled, #cancelled) { #equal };
        case (_) { #greater };
      };
    };
  };

  type Direction = {
    #left;
    #right;
  };

  module Direction {
    public func compare(a : Direction, b : Direction) : Order.Order {
      switch (a, b) {
        case (#left, #left) { #equal };
        case (#left, #right) { #less };
        case (#right, #left) { #greater };
        case (#right, #right) { #equal };
      };
    };
  };

  type EventType = {
    #speedViolation : { speed : Nat };
    #hardBraking : { gForce : Float };
    #laneDeparture : { direction : Direction };
  };

  type Event = {
    id : Nat;
    timestamp : Int;
    sessionId : Nat;
    eventType : EventType;
    description : Text;
  };

  type Session = {
    id : Nat;
    driverId : Nat;
    startTime : Int;
    endTime : ?Int;
    status : SessionStatus;
    events : [Event];
  };

  module Session {
    public func compareByStartTime(a : Session, b : Session) : Order.Order {
      Int.compare(a.startTime, b.startTime);
    };
  };

  type Driver = {
    id : Nat;
    name : Text;
    address : Text;
    licenseNumber : Text;
    birthdate : Int; // TODO: DOB would need to be stored securely in a real system
    principal : Principal;
    sessions : [Nat]; // List of session IDs
  };

  // Persistent state
  let drivers = Map.empty<Nat, Driver>();
  let sessions = Map.empty<Nat, Session>();
  let events = Map.empty<Nat, Event>();
  var nextDriverId = 1;
  var nextSessionId = 1;
  var nextEventId = 1;

  // Driver management
  public shared ({ caller }) func registerDriver(name : Text, address : Text, licenseNumber : Text, birthdate : Int) : async Nat {
    let driverId = nextDriverId;
    nextDriverId += 1;

    let driver : Driver = {
      id = driverId;
      name;
      address;
      licenseNumber;
      birthdate;
      principal = caller;
      sessions = [];
    };
    drivers.add(driverId, driver);
    driverId;
  };

  public query ({ caller }) func isDriverRegistered(driverId : Nat) : async Bool {
    drivers.containsKey(driverId);
  };

  public query ({ caller }) func loginDriver(driverId : Nat) : async Driver {
    switch (drivers.get(driverId)) {
      case (null) { Runtime.trap("No valid driver found") };
      case (?drivers) { drivers };
    };
  };

  public query ({ caller }) func getDriver(driverId : Nat) : async Driver {
    switch (drivers.get(driverId)) {
      case (null) { Runtime.trap("Driver does not exist") };
      case (?driver) { driver };
    };
  };

  public query ({ caller }) func getAllDrivers() : async [Driver] {
    drivers.values().toArray();
  };

  // Session management
  public shared ({ caller }) func createSession(driverId : Nat) : async Nat {
    switch (drivers.get(driverId)) {
      case (null) { Runtime.trap("Driver does not exist") };
      case (?_) {
        let sessionId = nextSessionId;
        nextSessionId += 1;

        let session : Session = {
          id = sessionId;
          driverId;
          startTime = Time.now();
          endTime = null;
          status = #active;
          events = [];
        };
        sessions.add(sessionId, session);
        sessionId;
      };
    };
  };

  public shared ({ caller }) func completeSession(sessionId : Nat) : async () {
    switch (sessions.get(sessionId)) {
      case (null) { Runtime.trap("Session does not exist. ") };
      case (?session) {
        if (session.status != #active) {
          Runtime.trap("Only active sessions can be completed.");
        };
        let updatedSession : Session = {
          id = session.id;
          driverId = session.driverId;
          startTime = session.startTime;
          endTime = ?Time.now();
          status = #completed;
          events = session.events;
        };
        sessions.add(sessionId, updatedSession);
      };
    };
  };

  /// Retrieves summary for a session (does not include data for all events)
  // TODO: This could be more elaborate in the future
  public query ({ caller }) func getSession(sessionId : Nat) : async Session {
    switch (sessions.get(sessionId)) {
      case (null) { Runtime.trap("Session does not exist") };
      case (?session) { session };
    };
  };

  public query ({ caller }) func getAllSessions() : async [Session] {
    sessions.values().toArray();
  };

  public query ({ caller }) func getSessionsForDriver(driverId : Nat) : async [Session] {
    sessions.values().toArray().filter(func(session) { session.driverId == driverId }).sort(Session.compareByStartTime);
  };

  public shared ({ caller }) func addEvent(sessionId : Nat, eventType : EventType, description : Text) : async Nat {
    switch (sessions.get(sessionId)) {
      case (null) { Runtime.trap("Session does not exist ") };
      case (?_) {
        let eventId = nextEventId;
        nextEventId += 1;

        let event : Event = {
          id = eventId;
          timestamp = Time.now();
          sessionId;
          eventType;
          description;
        };
        events.add(eventId, event);
        eventId;
      };
    };
  };

  public query ({ caller }) func getEventsForSession(sessionId : Nat) : async [Event] {
    events.values().toArray().filter(func(event) { event.sessionId == sessionId });
  };

  // Utility Queries (for statistics, counts, etc.)
  public query ({ caller }) func getTotalEventsCount() : async Nat {
    events.size();
  };

  // Demo Data Injector
  public shared ({ caller }) func seedDemoData() : async () {
    let demoDriverId = await registerDriver(
      "Bella Lap",
      "Broadway 3, Greyland",
      "WVB L1C3NS",
      568036800
    );

    let demoSessionId = await createSession(demoDriverId);
    ignore await addEvent(demoSessionId, #speedViolation({ speed = 85 }), "Exceeded speed limit");
    ignore await addEvent(demoSessionId, #hardBraking({ gForce = 2.5 }), "Hard braking detected");
    ignore await addEvent(demoSessionId, #laneDeparture({ direction = #right }), "Departed lane to the right");
  };
};

