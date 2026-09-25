import { SystemMessage } from "@/registry/whatsapp/system-message";

export default function Demo() {
  return (
    <div className="flex flex-col gap-1">
      <SystemMessage tone="encryption">
        Messages are end-to-end encrypted.
      </SystemMessage>
      <SystemMessage tone="success">Pago confirmado</SystemMessage>
      <SystemMessage>Cambiaste el asunto del grupo</SystemMessage>
      <SystemMessage
        icon={null}
        className="[&>span]:bg-wa-accent [&>span]:font-semibold [&>span]:text-wa-accent-text"
      >
        Venta cerrada
      </SystemMessage>
    </div>
  );
}
