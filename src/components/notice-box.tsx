import { Card } from "@/components/ui/card";

export type NoticeItem = {
  label?: string;
  text: string;
};

export type Notice = {
  title: string;
  effective?: string;
  items: NoticeItem[];
};

interface NoticeBoxProps {
  notice: Notice;
}

export function NoticeBox({ notice }: NoticeBoxProps) {
  return (
    <Card className="bg-amber-50 border-amber-200 p-4 mt-6 mb-6">
      <p className="font-semibold text-amber-900">📢 {notice.title}</p>
      {notice.effective && (
        <p className="text-xs text-amber-800 mt-1">※ {notice.effective}</p>
      )}
      <ul className="text-amber-900 mt-2 text-sm list-none pl-0 [&>li]:mt-4 [&>li:first-child]:mt-0">
        {notice.items.map((item, idx) => (
          <li key={idx}>
            {item.label && (
              <span className="block font-semibold mb-1">{item.label}</span>
            )}
            <span className="block text-amber-900/90">{item.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
