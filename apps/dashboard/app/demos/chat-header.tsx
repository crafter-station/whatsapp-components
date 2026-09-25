import { ChatHeader } from "@/registry/whatsapp/chat-header";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <ChatHeader name="Valeria · Agente IA" presence="online" />
      <ChatHeader name="Camila" presence="typing" />
      <ChatHeader
        name="Violeta Perfumería"
        presence="online"
        presenceLabel="en línea"
        avatarClassName="bg-[#f2e04f] text-[#3b2f00]"
        leading={
          <button
            type="button"
            aria-label="Back"
            className="text-wa-panel-muted"
          >
            ←
          </button>
        }
        actions={
          <button type="button" aria-label="Menu" className="px-1.5">
            ⋮
          </button>
        }
      />
    </div>
  );
}
