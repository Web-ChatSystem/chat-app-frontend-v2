import { useParams } from "react-router-dom";
import { Message } from "@/components/messages";
import { JSX } from "react";

export default function MessagePage(): JSX.Element {
  const { id } = useParams();

  if (!id) {
    return <>No id</>;
  }

  return <Message conversationID={id} />;
}
