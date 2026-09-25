import { ChatInput } from "@/registry/whatsapp/chat-input";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <ChatInput placeholder="Escribe un mensaje" />
      <ChatInput defaultValue="Ya con texto: el micrófono pasa a ser enviar." />
      <ChatInput placeholder="Deshabilitado" disabled />
    </div>
  );
}
