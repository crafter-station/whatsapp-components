import { ChatAvatar } from "@/registry/whatsapp/chat-avatar";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <ChatAvatar name="Valeria" />
      <ChatAvatar name="Camila" size={56} />
      <ChatAvatar
        name="Violeta"
        size={56}
        className="bg-[#f2e04f] text-[#3b2f00]"
      />
      <ChatAvatar name="Perfume Violeta" src="/perfume.svg" size={56} />
    </div>
  );
}
