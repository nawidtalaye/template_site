import { toPersianDecimal, toPersianDigits } from "@/lib/format";

import {
  MockAreaChart,
  MockBar,
  MockBarChart,
  MockBody,
  MockChip,
  MockDonut,
  MockHeader,
  MockKpi,
  MockSidebar,
  MockTable,
  MockWindow,
} from "./primitives";

/* ------------------------------------------------------------------ */
/* Placeholder screens of the NovaTech Oil & Gas suite.                */
/* Built in code (not screenshots) so the owner can swap every label.  */
/* ------------------------------------------------------------------ */

const NAV = ["داشبورد", "حسابداری", "مخازن و انبار", "خرید و فروش", "ناوگان", "گزارشات", "تنظیمات"];

function Shell({
  title,
  subtitle,
  compact,
  children,
  nav = NAV,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
  children: React.ReactNode;
  nav?: string[];
}) {
  return (
    <MockWindow title={title} subtitle={subtitle}>
      <div className="flex">
        {!compact && <MockSidebar items={nav} active={0} />}
        <MockBody>{children}</MockBody>
      </div>
    </MockWindow>
  );
}

/* ۱) داشبورد مدیریتی ------------------------------------------------ */
const tankRows: { name: string; value: number; tone?: "alert" }[] = [
  { name: "مخزن ۱ · دیزل", value: 82 },
  { name: "مخزن ۲ · پترول", value: 64 },
  { name: "مخزن ۳ · گاز مایع", value: 41, tone: "alert" },
  { name: "مخزن ۴ · تیل طیاره", value: 73 },
];

export function DashboardMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="داشبورد مدیریتی" subtitle="نواتیک · نفت و گاز" compact={compact}>
      <MockHeader title="وضعیت امروز" actions={["امروز", "این ماه", "سالانه"]} />
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <MockKpi label="موجودی مخازن" value={toPersianDigits(12480000, true)} unit="لیتر" note="۴ دیپو فعال" />
        <MockKpi label="فروش امروز" value={toPersianDigits(86400, true)} unit="لیتر" tone="accent" note="۱۸ فاکتور" />
        <MockKpi label="مطالبات جاری" value={toPersianDigits(42300000, true)} unit="افغانی" tone="alert" note="۱۲ مشتری" />
        <MockKpi label="افت دوره" value="۰/۴۲" unit="درصد" tone="positive" note="کمتر از حد مجاز" />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200/80 p-3 lg:col-span-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700">روند فروش ۱۴ روز گذشته</span>
            <span className="num text-[10px] text-slate-400">به لیتر</span>
          </div>
          <MockAreaChart id="dash" data={[42, 51, 47, 63, 58, 71, 66, 74, 69, 82, 77, 88, 84, 94]} height={92} />
          <div className="flex justify-between text-[9px] text-slate-400">
            <span>۱۴۰۵/۰۵/۲۵</span>
            <span>۱۴۰۵/۰۶/۰۸</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 p-3 lg:col-span-2">
          <div className="mb-2 text-[11px] font-bold text-slate-700">سطح مخازن</div>
          <div className="flex flex-col gap-2">
            {tankRows.map((tank) => (
              <div key={tank.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{tank.name}</span>
                  <span className="num font-bold text-slate-700">{toPersianDigits(tank.value)}٪</span>
                </div>
                <MockBar value={tank.value} tone={tank.tone ?? "accent"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <MockTable
        className="mt-3"
        head={["پارت بار", "مسیر", "تناژ", "وضعیت"]}
        rows={[
          ["۴۱۲", "اسلام‌قلعه → دیپو مرکزی", `${toPersianDigits(48600, true)} لیتر`, <MockChip key="a" tone="ok">تخلیه شده</MockChip>],
          ["۴۱۳", "تورغوندی → دیپو شمال", `${toPersianDigits(52400, true)} لیتر`, <MockChip key="b" tone="accent">در مسیر</MockChip>],
          ["۴۱۱", "دیپو مرکزی → جایگاه‌ها", `${toPersianDigits(18800, true)} لیتر`, <MockChip key="c" tone="muted">در حال توزیع</MockChip>],
        ]}
      />
    </Shell>
  );
}

/* ۲) حسابداری ------------------------------------------------------- */
export function LedgerMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="دفتر کل و اسناد مالی" subtitle="دوره ۱۴۰۵" compact={compact}>
      <MockHeader title="اسناد حسابداری" actions={["سند جدید", "چاپ", "خروجی"]} />
      <div className="mb-3 grid grid-cols-3 gap-2">
        <MockKpi label="جمع بدهکار" value={toPersianDigits(128450000, true)} unit="افغانی" />
        <MockKpi label="جمع بستانکار" value={toPersianDigits(128450000, true)} unit="افغانی" />
        <MockKpi label="نرخ تسعیر" value={toPersianDecimal(71.4, 1)} unit="افغانی / دالر" tone="accent" />
      </div>
      <MockTable
        head={["تاریخ", "شرح سند", "بدهکار", "بستانکار", "ارز"]}
        rows={[
          ["۱۴۰۵/۰۶/۰۸", "خرید محموله دیزل · پارت ۴۱۲", toPersianDigits(486000, true), "—", <MockChip key="u1" tone="accent">USD</MockChip>],
          ["۱۴۰۵/۰۶/۰۸", "کرایه حمل و ترانزیت", toPersianDigits(38400, true), "—", <MockChip key="u2" tone="muted">AFN</MockChip>],
          ["۱۴۰۵/۰۶/۰۷", "فروش اعتباری · جایگاه شمال", "—", toPersianDigits(12400000, true), <MockChip key="u3" tone="muted">AFN</MockChip>],
          ["۱۴۰۵/۰۶/۰۷", "حق‌الزحمه گمرک اسلام‌قلعه", toPersianDigits(92000, true), "—", <MockChip key="u4" tone="accent">USD</MockChip>],
          ["۱۴۰۵/۰۶/۰۶", "دریافت از مشتری · حواله بانکی", "—", toPersianDigits(8600000, true), <MockChip key="u5" tone="muted">AFN</MockChip>],
        ]}
        foot={["جمع کل", "", toPersianDigits(616400, true), toPersianDigits(21000000, true), ""]}
      />
      <p className="mt-2 text-[10px] leading-5 text-slate-400">
        اسناد به صورت خودکار از عملیات، فروش و خزانه‌داری صادر می‌شوند و نیازی به ورود دستی ندارند.
      </p>
    </Shell>
  );
}

/* ۳) مخازن و انبار -------------------------------------------------- */
export function TanksMock({ compact }: { compact?: boolean }) {
  const tanks = [
    { name: "مخزن ۱", product: "دیزل", volume: 840000, capacity: 1000000, temp: 24, fill: 84 },
    { name: "مخزن ۲", product: "پترول", volume: 512000, capacity: 800000, temp: 26, fill: 64 },
    { name: "مخزن ۳", product: "گاز مایع", volume: 164000, capacity: 400000, temp: 21, fill: 41 },
    { name: "مخزن ۴", product: "تیل طیاره", volume: 438000, capacity: 600000, temp: 23, fill: 73 },
  ];
  return (
    <Shell title="مخازن و انبار" subtitle="دیپو مرکزی" compact={compact}>
      <MockHeader title="وضعیت لحظه‌ای مخازن" actions={["انبارگردانی", "گزارش مغایرت"]} />
      <div className="flex flex-col gap-2.5">
        {tanks.map((tank) => (
          <div key={tank.name} className="rounded-xl border border-slate-200/80 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-black text-slate-800">{tank.name}</span>
                <MockChip tone="accent">{tank.product}</MockChip>
              </div>
              <span className="num text-[11px] font-bold text-slate-700">
                {toPersianDigits(tank.volume, true)} / {toPersianDigits(tank.capacity, true)} لیتر
              </span>
            </div>
            <div className="mt-2">
              <MockBar value={tank.fill} tone={tank.fill < 50 ? "alert" : "accent"} />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-400">
              <span>دما: {toPersianDigits(tank.temp)} درجه</span>
              <span>آخرین اندازه‌گیری: امروز، ۰۹:۲۰</span>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ۴) فروش و خرید ---------------------------------------------------- */
export function InvoicesMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="فاکتورها و صورت‌حساب" subtitle="فروش نقدی و اعتباری" compact={compact}>
      <MockHeader title="فاکتورهای امروز" actions={["فاکتور جدید", "صورت‌حساب"]} />
      <div className="mb-3 grid grid-cols-3 gap-2">
        <MockKpi label="فروش نقدی" value={toPersianDigits(18400000, true)} unit="افغانی" />
        <MockKpi label="فروش اعتباری" value={toPersianDigits(23900000, true)} unit="افغانی" tone="accent" />
        <MockKpi label="نزدیک سقف اعتبار" value={toPersianDigits(3)} unit="مشتری" tone="alert" />
      </div>
      <MockTable
        head={["شماره", "مشتری", "مبلغ", "نوع", "وضعیت"]}
        rows={[
          ["۱۴۰۵-۱۲۸۴", "جایگاه شمال", toPersianDigits(12400000, true), "اعتباری", <MockChip key="i1" tone="ok">تسویه شده</MockChip>],
          ["۱۴۰۵-۱۲۸۵", "شرکت ترانزیت آریا", toPersianDigits(8600000, true), "اعتباری", <MockChip key="i2" tone="alert">نزدیک سقف</MockChip>],
          ["۱۴۰۵-۱۲۸۶", "مشتری نقدی · هرات", toPersianDigits(2450000, true), "نقدی", <MockChip key="i3" tone="ok">تسویه شده</MockChip>],
          ["۱۴۰۵-۱۲۸۷", "جایگاه غرب", toPersianDigits(5100000, true), "اعتباری", <MockChip key="i4" tone="muted">در انتظار</MockChip>],
        ]}
      />
    </Shell>
  );
}

/* ۵) خرید و واردات --------------------------------------------------- */
export function PurchasesMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="خرید و واردات" subtitle="قراردادها و پارت بار" compact={compact}>
      <MockHeader title="پارت‌های فعال" actions={["قرارداد جدید", "تسهیم هزینه"]} />
      <MockTable
        head={["پارت", "تأمین‌کننده", "تناژ", "وضعیت"]}
        rows={[
          ["۴۱۲", "تأمین‌کننده خارجی · الف", `${toPersianDigits(48600, true)} لیتر`, <MockChip key="p1" tone="ok">تخلیه شده</MockChip>],
          ["۴۱۳", "تأمین‌کننده خارجی · ب", `${toPersianDigits(52400, true)} لیتر`, <MockChip key="p2" tone="accent">در مسیر</MockChip>],
          ["۴۱۴", "تأمین‌کننده داخلی", `${toPersianDigits(24000, true)} لیتر`, <MockChip key="p3" tone="muted">در گمرک</MockChip>],
        ]}
      />
      <div className="mt-3 rounded-xl border border-slate-200/80 p-3">
        <div className="mb-2 text-[11px] font-bold text-slate-700">تسهیم هزینه · پارت ۴۱۲</div>
        {[
          { label: "قیمت خرید", value: 742 },
          { label: "کرایه و ترانزیت", value: 58 },
          { label: "گمرک و عوارض", value: 31 },
          { label: "افت و تبخیر", value: 12 },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between border-b border-slate-100 py-1.5 text-[11px] last:border-0">
            <span className="text-slate-500">{row.label}</span>
            <span className="num font-bold text-slate-700">۰/{toPersianDigits(row.value)} دالر</span>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between rounded-lg bg-primary/10 px-2.5 py-2 text-[11px] font-black text-primary-ink">
          <span>بهای تمام‌شده هر لیتر</span>
          <span className="num">۰/۸۴۳ دالر</span>
        </div>
      </div>
    </Shell>
  );
}

/* ۶) عملیات و ناوگان -------------------------------------------------- */
export function WaybillsMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="بارنامه‌ها و ناوگان" subtitle="دیسپچ دیپو" compact={compact}>
      <MockHeader title="بارنامه‌های امروز" actions={["بارنامه جدید", "تخصیص تانکر"]} />
      <div className="mb-3 grid grid-cols-3 gap-2">
        <MockKpi label="تانکر فعال" value={toPersianDigits(28)} unit="دستگاه" />
        <MockKpi label="در مسیر" value={toPersianDigits(11)} unit="بارنامه" tone="accent" />
        <MockKpi label="کسری غیرمجاز" value={toPersianDigits(1)} unit="مورد" tone="alert" />
      </div>
      <MockTable
        head={["بارنامه", "تانکر", "راننده", "مبدأ", "مقصد", "کسری"]}
        rows={[
          ["۸۴۲۱", "هرات الف ۱۲۳", "ع. احمدی", "اسلام‌قلعه", "دیپو مرکزی", <span key="w1" className="num text-emerald-600">۴۰ لیتر</span>],
          ["۸۴۲۲", "هرات ب ۴۴۱", "م. رضایی", "دیپو مرکزی", "جایگاه شمال", <span key="w2" className="num text-emerald-600">۲۵ لیتر</span>],
          ["۸۴۲۳", "هرات ج ۹۰۸", "ح. نوری", "تورغوندی", "دیپو شمال", <span key="w3" className="num text-amber-600">۳۱۰ لیتر</span>],
        ]}
      />
    </Shell>
  );
}

/* ۷) هزینه‌ها --------------------------------------------------------- */
export function ExpensesMock({ compact }: { compact?: boolean }) {
  const rows = [
    { label: "کرایه حمل", value: 62, amount: 18400000 },
    { label: "گمرک و عوارض", value: 48, amount: 12200000 },
    { label: "حقوق و دستمزد", value: 39, amount: 9800000 },
    { label: "سوخت و نگهداری ناوگان", value: 31, amount: 7400000 },
    { label: "تعمیرات دیپو", value: 18, amount: 4100000 },
    { label: "اداری", value: 12, amount: 2600000 },
  ];
  return (
    <Shell title="هزینه‌ها و مراکز هزینه" subtitle="دوره جاری" compact={compact}>
      <MockHeader title="توزیع هزینه‌ها" actions={["ثبت هزینه", "بودجه"]} />
      <div className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="w-32 shrink-0 text-[11px] text-slate-600">{row.label}</span>
            <span className="flex-1">
              <MockBar value={row.value} tone={row.value > 55 ? "alert" : "accent"} />
            </span>
            <span className="num w-24 shrink-0 text-left text-[11px] font-bold text-slate-700">
              {toPersianDigits(row.amount, true)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200/80 p-3">
          <div className="mb-1 text-[11px] font-bold text-slate-700">مقایسه با بودجه</div>
          <MockBarChart
            data={[
              { label: "اردیبهشت", value: 38 },
              { label: "خرداد", value: 44 },
              { label: "تیر", value: 41 },
              { label: "مرداد", value: 52 },
              { label: "شهریور", value: 47 },
            ]}
            height={92}
          />
        </div>
        <div className="rounded-xl border border-slate-200/80 p-3">
          <div className="mb-2 text-[11px] font-bold text-slate-700">سهم هر مرکز هزینه</div>
          <MockDonut
            center={toPersianDigits(545)}
            centerLabel="میلیون افغانی"
            segments={[
              { label: "حمل و ترانزیت", value: 34, color: "#54dcc6" },
              { label: "گمرک و عوارض", value: 22, color: "#0f766e" },
              { label: "پرسنل", value: 18, color: "#94a3b8" },
              { label: "سایر", value: 26, color: "#e2e8f0" },
            ]}
          />
        </div>
      </div>
    </Shell>
  );
}

/* ۸) گزارشات --------------------------------------------------------- */
export function ReportMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="گزارشات" subtitle="مالی و عملیاتی" compact={compact}>
      <MockHeader title="گزارش عملکرد ماهانه" actions={["اکسل", "PDF", "ارسال"]} />
      <div className="mb-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <MockKpi label="فروش کل" value={toPersianDigits(2480000, true)} unit="لیتر" />
        <MockKpi label="درآمد" value={toPersianDigits(486000000, true)} unit="افغانی" tone="accent" />
        <MockKpi label="بهای تمام‌شده" value={toPersianDigits(392000000, true)} unit="افغانی" />
        <MockKpi label="حاشیه سود" value="۱۹/۳" unit="درصد" tone="positive" />
      </div>
      <div className="rounded-xl border border-slate-200/80 p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-700">فروش ماهانه به لیتر</span>
          <span className="text-[10px] text-slate-400">سال ۱۴۰۵</span>
        </div>
        <MockBarChart
          data={[
            { label: "فروردین", value: 320 },
            { label: "اردیبهشت", value: 368 },
            { label: "خرداد", value: 352 },
            { label: "تیر", value: 401 },
            { label: "مرداد", value: 438 },
            { label: "شهریور", value: 476 },
          ]}
          height={116}
        />
      </div>
      <MockTable
        className="mt-3"
        head={["فرآورده", "فروش", "درآمد", "سود"]}
        rows={[
          ["دیزل", `${toPersianDigits(1420000, true)} لیتر`, toPersianDigits(281000000, true), "۲۱/۴٪"],
          ["پترول", `${toPersianDigits(780000, true)} لیتر`, toPersianDigits(149000000, true), "۱۷/۸٪"],
          ["گاز مایع", `${toPersianDigits(280000, true)} لیتر`, toPersianDigits(56000000, true), "۱۵/۲٪"],
        ]}
      />
    </Shell>
  );
}

/* ۹) تحلیل داده ------------------------------------------------------- */
export function AnalyticsMock({ compact }: { compact?: boolean }) {
  return (
    <Shell title="تحلیل داده" subtitle="هوش تجاری" compact={compact}>
      <MockHeader title="روند حاشیه سود" actions={["ماهانه", "فصلی", "سالانه"]} />
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200/80 p-3 lg:col-span-3">
          <MockAreaChart id="analytics" data={[18, 21, 19, 24, 22, 27, 25, 29, 31, 28, 33, 36]} height={104} />
          <div className="flex justify-between text-[9px] text-slate-400">
            <span>مهر ۱۴۰۴</span>
            <span>شهریور ۱۴۰۵</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 p-3 lg:col-span-2">
          <div className="mb-2 text-[11px] font-bold text-slate-700">سهم فروش هر فرآورده</div>
          <MockDonut
            center={toPersianDigits(2480)}
            centerLabel="هزار لیتر"
            segments={[
              { label: "دیزل", value: 57, color: "#54dcc6" },
              { label: "پترول", value: 31, color: "#0f766e" },
              { label: "گاز مایع", value: 12, color: "#cbd5e1" },
            ]}
          />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <MockKpi label="بهترین مسیر" value="اسلام‌قلعه" note="کمترین افت" tone="positive" />
        <MockKpi label="میانگین کسری مسیر" value="۰/۳۸" unit="درصد" />
        <MockKpi label="زمان تسویه متوسط" value={toPersianDigits(6)} unit="روز" tone="accent" />
      </div>
    </Shell>
  );
}

/* Registry used by the product showcase tabs and the module selector. */
export const mockViews = {
  dashboard: DashboardMock,
  ledger: LedgerMock,
  tanks: TanksMock,
  invoices: InvoicesMock,
  purchases: PurchasesMock,
  waybills: WaybillsMock,
  expenses: ExpensesMock,
  report: ReportMock,
  analytics: AnalyticsMock,
} as const;

export type MockKey = keyof typeof mockViews;
