export const SOCKET_EVENTS = {
  // su kien client gui
  CLIENT: {
    JOIN_ROOM: "join_room",
    SEND_CONNECTION_OFFER: "send_connection_offer",
    ANSWER: "answer",
    SEND_CANDIDATE: "send_candidate",
    DECLINE: "decline_call",
    HANGUP: "hangup",
  },
  // su kien server gui
  SERVER: {
    TOO_MANY_PEOPLE: "too_many_people",
    ANOTHER_PERSON_READY: "another_person_ready",
    SEND_CONNECTION_OFFER: "send_connection_offer",
    ANSWER: "answer",
    SEND_CANDIDATE: "send_candidate",
    FIRST_PERSON_JOIN: "first_person_join",
    ANOTHER_PERSON_DECLINE: "call_declined",
    CALL_ENDED: "call_ended",
  },
};
