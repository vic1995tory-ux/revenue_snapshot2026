import {
  getServiceCodeFromToken,
  type PurchaseServiceCode,
} from "@/lib/purchase-service";

export type AccountToolKey =
  | "rs_playground"
  | "rs_onrec"
  | "selltimer"
  | "forecaster";

export type AccountTool = {
  key: AccountToolKey;
  title: string;
  variant: string;
  description: string;
  isActive: boolean;
  isLocked: boolean;
  launchCount?: number;
  launchLimit?: number;
  accessUrl?: string;
  serviceCode?: PurchaseServiceCode | null;
};

type AccountToolSeed = Omit<
  AccountTool,
  "isActive" | "isLocked" | "launchCount" | "launchLimit" | "accessUrl"
>;

const TOOL_SEEDS: AccountToolSeed[] = [
  {
    key: "rs_playground",
    title: "Revenue Snapshot",
    variant: "Online Playground",
    description:
      "Самостоятельный запуск диагностики внутри кабинета с ограничением по попыткам и сохранением результатов.",
    serviceCode: "pg",
  },
  {
    key: "rs_onrec",
    title: "Revenue Snapshot",
    variant: "On Rec",
    description:
      "Ручная аналитика с сопровождением команды Growth Avenue и персональной result page внутри платформы.",
    serviceCode: "on_rec",
  },
  {
    key: "selltimer",
    title: "SellTimer",
    variant: "Coming Soon",
    description:
      "Календарь сезонности и точек продаж, который будет появляться прямо в кабинете как отдельный инструмент.",
    serviceCode: null,
  },
  {
    key: "forecaster",
    title: "Forecaster",
    variant: "Coming Soon",
    description:
      "Инструмент сценарного прогноза экономики, который покажет защитные решения и целевую траекторию роста.",
    serviceCode: null,
  },
];

export function buildDefaultAccountTools({
  token,
  isDemoAccount,
  launchCount,
  launchLimit,
}: {
  token: string;
  isDemoAccount: boolean;
  launchCount: number;
  launchLimit: number;
}): AccountTool[] {
  const purchasedCode = getServiceCodeFromToken(token);

  return TOOL_SEEDS.map((seed) => {
    const isSnapshotPlayground = seed.key === "rs_playground";
    const isSnapshotOnRec = seed.key === "rs_onrec";

    const isActive =
      (isDemoAccount && (isSnapshotPlayground || isSnapshotOnRec)) ||
      (seed.serviceCode !== null && purchasedCode === seed.serviceCode);

    const accessUrl = isSnapshotPlayground
      ? `/snapshot-action/${encodeURIComponent(token)}`
      : isSnapshotOnRec
        ? `/results/${encodeURIComponent(
            purchasedCode === "on_rec"
              ? token
              : isDemoAccount
                ? "on_rec_demo"
                : `on_rec_${token}`
          )}`
        : undefined;

    return {
      ...seed,
      isActive,
      isLocked: !isActive,
      launchCount: isSnapshotPlayground ? launchCount : undefined,
      launchLimit: isSnapshotPlayground ? launchLimit : undefined,
      accessUrl,
    };
  });
}

export function getToolByKey(
  tools: AccountTool[],
  key: AccountToolKey
): AccountTool | undefined {
  return tools.find((tool) => tool.key === key);
}
