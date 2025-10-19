import React, { useMemo, useState } from "react";
import { 
  Home, Users, Stethoscope, DollarSign, Bell, Pill, User, Settings,
  LogIn, ArrowLeft, Search, Filter, MessageCircle, MapPin, Clock, ShieldCheck,
  BadgeCheck, Plus, ChevronRight
} from "lucide-react";

/**
 * LUMINOUS REHAB – MOBILE-STYLE FRONTEND (React)
 * -------------------------------------------------
 * • Single-file React app that mimics the mobile UI flow from your mockups
 * • TailwindCSS for styling; lucide-react for icons
 * • Screens included:
 *    - Welcome (role chooser)
 *    - Sign In (Clinic / Therapist)
 *    - Clinic: Dashboard, Patients, Therapists, Payroll, Notifications, Profile, Settings
 *    - Therapist: Dashboard, Requests, Patients, Medications, Notifications, Profile, Settings
 * • This is a static prototype (no backend). Replace the in-memory data with API calls later.
 *
 * How to use (locally):
 * -------------------------------------------------
 * 1) Ensure Tailwind is configured in your project (or paste this into a StackBlitz/Vite + Tailwind starter)
 * 2) Ensure lucide-react is installed:  npm i lucide-react
 * 3) Exported default component <App/> renders the whole experience
 */

// ---------- Shared UI Primitives ----------
const Screen = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[480px] min-h-[100dvh] bg-slate-50 text-slate-900 flex flex-col ${className}`}>
    {children}
  </div>
);

const TopBar = ({ title, onBack, right }) => (
  <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
    <div className="px-4 h-14 flex items-center gap-3">
      {onBack ? (
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100"><ArrowLeft size={18}/></button>
      ) : (
        <div className="w-6"/>
      )}
      <div className="font-semibold tracking-wide">{title}</div>
      <div className="ml-auto flex items-center gap-2">{right}</div>
    </div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>
);

const SectionTitle = ({ children, right }) => (
  <div className="flex items-center justify-between px-1 mb-2">
    <div className="text-sm font-semibold text-slate-700">{children}</div>
    {right}
  </div>
);

const PrimaryBtn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 ${className}`}
  >
    {children}
  </button>
);

const OutlineBtn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ label, type = "text", placeholder = "", defaultValue = "", right }) => (
  <label className="block text-sm">
    <div className="text-slate-600 mb-1">{label}</div>
    <div className="relative">
      <input type={type} defaultValue={defaultValue} placeholder={placeholder}
             className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-emerald-500"/>
      {right && <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">{right}</div>}
    </div>
  </label>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 select-none">
    <span className="text-sm text-slate-600">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition ${checked ? "bg-emerald-600" : "bg-slate-300"}`}
    >
      <span className={`block h-5 w-5 bg-white rounded-full mt-0.5 transition ${checked ? "translate-x-6" : "translate-x-1"}`}/>
    </button>
  </label>
);

const Badge = ({ children, tone = "default" }) => {
  const map = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    info: "bg-sky-100 text-sky-700",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[tone]}`}>{children}</span>;
};

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
    <div className="h-full bg-emerald-600" style={{ width: `${value}%` }}/>
  </div>
);

// ---------- Data (replace with APIs later) ----------
const samplePatients = [
  { id: 1, name: "John Doe", mrn: "PT-2053-2587", city: "Orlando, FL", by: "Dr. Smith", last: "2 days ago", status: "Active" },
  { id: 2, name: "Jane Smith", mrn: "PT-2051-1043", city: "Tampa, FL", by: "Dr. Johnson", last: "1 week ago", status: "Active" },
  { id: 3, name: "Michael Brown", mrn: "PT-2050-3468", city: "Miami, FL", by: "Dr. Singh", last: "3 weeks ago", status: "Review" },
];

const sampleTherapists = [
  { id: 1, name: "Dr. Sarah Miller", license: "PT-12345-FL", specialty: "Physical Therapy", city: "Orlando, FL", patients: 12, status: "Active" },
  { id: 2, name: "Dr. John Anderson", license: "OT-89021-FL", specialty: "Occupational Therapy", city: "Jacksonville, FL", patients: 6, status: "Active" },
  { id: 3, name: "Dr. Emily Davis", license: "PT-67451-FL", specialty: "Physical Therapy", city: "Tampa, FL", patients: 0, status: "Inactive" },
];

const sampleRequests = [
  { id: 1, patient: "John Doe", city: "Orlando, FL", distance: "2.3 mi", type: "PT", clinic: "Sunrise Rehabilitation Center" },
  { id: 2, patient: "Jane Smith", city: "Tampa, FL", distance: "5.7 mi", type: "PT", clinic: "Milton Care Center" },
];

const sampleMeds = [
  { name: "Lisinopril", dose: "10 mg", form: "Tablet" },
  { name: "Metformin", dose: "20 mg", form: "Capsule" },
  { name: "Atorvastatin", dose: "40 mg", form: "Tablet" },
];

// ---------- Navigation ----------
const BottomNavClinic = ({ tab, setTab }) => (
  <div className="sticky bottom-0 bg-white border-t border-slate-200">
    <div className="grid grid-cols-4">
      {[
        { k: "dashboard", label: "Dashboard", icon: Home },
        { k: "patients", label: "Patients", icon: Users },
        { k: "therapists", label: "Therapists", icon: Stethoscope },
        { k: "payroll", label: "Payroll", icon: DollarSign },
      ].map(({ k, label, icon: Icon }) => (
        <button key={k} onClick={() => setTab(k)} className={`py-3 flex flex-col items-center gap-1 ${tab===k?"text-emerald-700":"text-slate-500"}`}>
          <Icon size={20}/> <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

const BottomNavTherapist = ({ tab, setTab }) => (
  <div className="sticky bottom-0 bg-white border-t border-slate-200">
    <div className="grid grid-cols-5">
      {[
        { k: "dashboard", label: "Dashboard", icon: Home },
        { k: "requests", label: "Requests", icon: Bell },
        { k: "patients", label: "Patients", icon: Users },
        { k: "medications", label: "Medications", icon: Pill },
        { k: "profile", label: "Profile", icon: User },
      ].map(({ k, label, icon: Icon }) => (
        <button key={k} onClick={() => setTab(k)} className={`py-3 flex flex-col items-center gap-1 ${tab===k?"text-emerald-700":"text-slate-500"}`}>
          <Icon size={20}/> <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

// ---------- Welcome & Auth ----------
const WelcomeScreen = ({ onClinic, onTherapist }) => (
  <Screen>
    <TopBar title="Healthcare Connect Platform" />
    <div className="px-4 pt-2 pb-24 space-y-4">
      <Card className="p-4 flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">LR</div>
        <div>
          <div className="font-semibold">Luminous Rehab</div>
          <p className="text-sm text-slate-600">Streamlining rehabilitation care through smart connections.</p>
        </div>
      </Card>

      <div className="text-sm text-slate-600">Welcome back! Select your role to continue</div>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center"><Users size={20}/></div>
          <div className="flex-1">
            <div className="font-medium">Clinic Manager</div>
            <div className="text-xs text-slate-600">Manage your facility, staff, and patient care.</div>
          </div>
          <ChevronRight className="text-slate-400"/>
        </div>
        <div className="mt-3">
          <PrimaryBtn onClick={onClinic}><LogIn size={16}/> Get Started</PrimaryBtn>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><Stethoscope size={20}/></div>
          <div className="flex-1">
            <div className="font-medium">Therapist</div>
            <div className="text-xs text-slate-600">Access your schedule and patient information.</div>
          </div>
          <ChevronRight className="text-slate-400"/>
        </div>
        <div className="mt-3">
          <OutlineBtn onClick={onTherapist}><LogIn size={16}/> Get Started</OutlineBtn>
        </div>
      </Card>

      <Card className="p-4 flex items-start gap-3">
        <ShieldCheck className="text-emerald-600"/>
        <div className="text-sm">
          <div className="font-semibold">Secure & HIPAA Compliant</div>
          <div className="text-slate-600">Your patient data is protected with industry-leading security.</div>
        </div>
      </Card>
    </div>
  </Screen>
);

const SignInForm = ({ role, onBack, onSignedIn, allowCreate }) => (
  <Screen>
    <TopBar title={`${role} Portal`} onBack={onBack} />
    <div className="px-4 pt-4 pb-24 space-y-4">
      <Card className="p-4 space-y-3">
        <div className="text-sm text-slate-600">Welcome back! Sign in to continue</div>
        <Input label="Email Address" placeholder={`${role==='Clinic'? 'clinic' : 'therapist'}@example.com`} right={<MailDot/>}/>
        <Input label="Password" type="password" placeholder="••••••••"/>
        <div className="flex items-center justify-between">
          <RememberMe />
          <button className="text-sm text-emerald-700 hover:underline">Forgot password?</button>
        </div>
        <PrimaryBtn className="w-full" onClick={onSignedIn}>Sign In</PrimaryBtn>
        {allowCreate && (
          <div className="text-xs text-center text-slate-600">
            New to Luminous Rehab? <button className="text-emerald-700 hover:underline">Create an account</button>
          </div>
        )}
      </Card>
    </div>
  </Screen>
);

const RememberMe = () => {
  const [on, setOn] = useState(true);
  return <Toggle label="Remember me" checked={on} onChange={setOn} />;
};

const MailDot = () => (
  <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
    <span className="text-[10px] text-slate-500">@</span>
  </div>
);

// ---------- Clinic Screens ----------
function ClinicDashboard() {
  return (
    <div className="p-4 space-y-4">
      <SectionTitle>Dashboard</SectionTitle>
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Active Patients" value="28" suffix="/ 40" tone="info"/>
        <StatBox label="Therapists" value="45" suffix="available" tone="success"/>
        <StatBox label="New Requests" value="12" suffix="pending" tone="warning"/>
      </div>

      <Card className="p-4">
        <SectionTitle right={<OutlineBtn className="h-8 px-3 text-xs"><Search size={14}/> Explore</OutlineBtn>}>
          Find Nearby Therapists
        </SectionTitle>
        <div className="h-36 rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-50 to-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-500">
          <div className="flex items-center gap-2 text-sm"><MapPin size={16}/> Map preview placeholder</div>
        </div>
      </Card>

      <div>
        <SectionTitle right={<OutlineBtn className="h-8 px-3 text-xs"><Plus size={14}/> Add Patient</OutlineBtn>}>
          Quick Actions
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 flex flex-col items-center justify-center gap-2">
            <Plus/> <div className="text-sm">Add Patient</div>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center gap-2">
            <Stethoscope/> <div className="text-sm">Find Therapist</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ClinicPatients() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">Current Patients</div>
        <Badge tone="success">6 active</Badge>
        <div className="ml-auto flex items-center gap-2">
          <OutlineBtn className="h-9 px-3 text-xs"><Plus size={14}/> Add Patient</OutlineBtn>
          <OutlineBtn className="h-9 px-3 text-xs"><Filter size={14}/> Filter</OutlineBtn>
        </div>
      </div>
      <SearchBar placeholder="Search patients..."/>
      <div className="space-y-3">
        {samplePatients.map(p => <PatientRow key={p.id} p={p}/>) }
      </div>
    </div>
  );
}

function ClinicTherapists() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">Current Therapists</div>
        <Badge tone="success">4 active</Badge>
        <div className="ml-auto flex items-center gap-2">
          <OutlineBtn className="h-9 px-3 text-xs"><Plus size={14}/> Invite</OutlineBtn>
          <OutlineBtn className="h-9 px-3 text-xs"><Filter size={14}/> Filter</OutlineBtn>
        </div>
      </div>
      <SearchBar placeholder="Search therapists..."/>
      <div className="space-y-3">
        {sampleTherapists.map(t => <TherapistRow key={t.id} t={t} />)}
      </div>
    </div>
  );
}

function ClinicPayroll() {
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4">
        <div className="text-xs text-slate-500">Payroll — October 2025</div>
        <div className="mt-2 text-3xl font-semibold tracking-tight">$42,500</div>
        <div className="text-xs text-slate-500">Processed on October 28</div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <MiniStat label="Paid" value="12"/>
          <MiniStat label="Growth" value="+8%"/>
          <MiniStat label="Requests" value="17"/>
        </div>
        <PrimaryBtn className="mt-4">Process</PrimaryBtn>
      </Card>

      <Card className="p-4">
        <SectionTitle>Notifications</SectionTitle>
        <div className="space-y-3">
          <NotifCard tone="info" title="New patient assignment" meta="2 hours ago"/>
          <NotifCard tone="success" title="Therapist availability updated" meta="5 hours ago"/>
          <NotifCard tone="warning" title="Pending payment approval needed" meta="1 day ago"/>
        </div>
      </Card>
    </div>
  );
}

// ---------- Therapist Screens ----------
function TherapistDashboard() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="New Requests" value="8" tone="warning"/>
        <StatBox label="My Patients" value="10" tone="info"/>
        <StatBox label="Today" value="8 appts" tone="success"/>
      </div>

      <Card className="p-4 space-y-3">
        <SectionTitle>Today's Schedule</SectionTitle>
        <ProgressBar value={70}/>
        <div className="text-xs text-slate-500">8/12 appointments</div>
      </Card>

      <Card className="p-4 space-y-3">
        <SectionTitle right={<button className="text-xs text-emerald-700">Edit</button>}>This Week's Availability</SectionTitle>
        {[
          { d: "Monday", v: 85 }, { d: "Tuesday", v: 45 }, { d: "Wednesday", v: 62 }, { d: "Thursday", v: 91 }, { d: "Friday", v: 30 },
        ].map(({d,v}) => (
          <div key={d} className="space-y-1">
            <div className="text-xs text-slate-600">{d}</div>
            <ProgressBar value={v}/>
          </div>
        ))}
      </Card>
    </div>
  );
}

function TherapistRequests() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">Patient Requests</div>
        <Badge tone="warning">3 new assignments</Badge>
        <div className="ml-auto flex items-center gap-2">
          <OutlineBtn className="h-9 px-3 text-xs"><Filter size={14}/> Filter</OutlineBtn>
        </div>
      </div>
      <SearchBar placeholder="Search requests..."/>
      <div className="space-y-3">
        {sampleRequests.map(r => <RequestRow key={r.id} r={r} />)}
      </div>
    </div>
  );
}

function TherapistPatients() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">My Patients</div>
        <Badge tone="success">4 active</Badge>
        <div className="ml-auto flex items-center gap-2">
          <OutlineBtn className="h-9 px-3 text-xs"><Filter size={14}/> Filter</OutlineBtn>
        </div>
      </div>
      <SearchBar placeholder="Search patients..."/>
      <div className="space-y-3">
        {samplePatients.map(p => <PatientRow key={p.id} p={p} actions={<OutlineBtn className="h-9 px-3 text-xs">View Details</OutlineBtn>} />) }
      </div>
    </div>
  );
}

function TherapistMedications() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Medications</div>
        <PrimaryBtn className="h-9 px-3 text-xs"><Plus size={14}/> Add Medication</PrimaryBtn>
      </div>

      <Card className="divide-y divide-slate-200">
        {sampleMeds.map((m,i) => (
          <div key={i} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-slate-500">{m.dose} • {m.form}</div>
            </div>
            <OutlineBtn className="h-8 px-3 text-xs">Edit</OutlineBtn>
          </div>
        ))}
      </Card>
    </div>
  );
}

function TherapistProfile() {
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 flex items-start gap-3">
        <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">SJ</div>
        <div className="flex-1">
          <div className="font-semibold text-lg">Dr. Sarah Johnson</div>
          <div className="flex gap-2 mt-1">
            <Badge tone="success">Physical Therapy</Badge>
            <Badge tone="info" ><BadgeCheck size={12} className="inline mr-1"/> Verified</Badge>
          </div>
        </div>
        <OutlineBtn className="h-9 px-3 text-xs">Edit Profile</OutlineBtn>
      </Card>

      <Card className="p-4 space-y-3">
        <InfoRow label="Email Address" value="sarah.johnson@gmail.com"/>
        <InfoRow label="Phone Number" value="(555) 987-6543"/>
        <InfoRow label="License Number" value="PT-12345-FL"/>
        <InfoRow label="Specialty" value="Physical Therapy"/>
      </Card>
    </div>
  );
}

// ---------- Reusable bits ----------
const StatBox = ({ label, value, suffix, tone = "default" }) => {
  const toneMap = {
    default: "bg-slate-100 text-slate-700",
    info: "bg-sky-50 text-sky-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
  };
  return (
    <Card className={`p-3 ${toneMap[tone]}`}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold leading-tight">{value}</div>
      {suffix && <div className="text-[11px] opacity-70">{suffix}</div>}
    </Card>
  );
};

const MiniStat = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3 text-center">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

const SearchBar = ({ placeholder }) => (
  <div className="relative">
    <input placeholder={placeholder} className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-10 py-2 outline-none focus:ring-2 focus:ring-emerald-500"/>
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
    <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
  </div>
);

const PatientRow = ({ p, actions }) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <Avatar label={p.name} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{p.name}</div>
          <Badge tone={p.status === 'Active' ? 'success' : 'warning'}>{p.status}</Badge>
        </div>
        <div className="text-xs text-slate-500">{p.mrn}</div>
        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
          <MapPin size={12}/> {p.city} <span className="opacity-50">•</span> <Clock size={12}/> {p.last}
        </div>
        <div className="text-xs text-slate-500 mt-1">Referring: {p.by}</div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <OutlineBtn className="h-8 px-3 text-xs"><MessageCircle size={14}/> Message</OutlineBtn>
        {actions || <OutlineBtn className="h-8 px-3 text-xs">View Details</OutlineBtn>}
      </div>
    </div>
  </Card>
);

const TherapistRow = ({ t }) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <Avatar label={t.name} tone="emerald" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{t.name}</div>
          <Badge tone={t.status === 'Active' ? 'success' : 'default'}>{t.status}</Badge>
        </div>
        <div className="text-xs text-slate-500">{t.license} • {t.specialty}</div>
        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
          <MapPin size={12}/> {t.city} <span className="opacity-50">•</span> {t.patients} patients
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <OutlineBtn className="h-8 px-3 text-xs"><MessageCircle size={14}/> Message</OutlineBtn>
        <OutlineBtn className="h-8 px-3 text-xs">View Profile</OutlineBtn>
      </div>
    </div>
  </Card>
);

const RequestRow = ({ r }) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <Avatar label={r.patient} tone="sky" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{r.patient}</div>
          <Badge tone="info">{r.type}</Badge>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
          <MapPin size={12}/> {r.city} <span className="opacity-50">•</span> {r.distance}
        </div>
        <div className="text-xs text-slate-500 mt-1">Requesting Clinic: {r.clinic}</div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <OutlineBtn className="h-8 px-3 text-xs">Decline</OutlineBtn>
        <PrimaryBtn className="h-8 px-3 text-xs">Accept Request</PrimaryBtn>
      </div>
    </div>
  </Card>
);

const NotifCard = ({ tone = "info", title, meta }) => (
  <div className={`rounded-xl p-4 flex items-start gap-3 ${tone==='info'? 'bg-sky-50':'bg-amber-50'}`}>
    <Bell className={tone==='info'? 'text-sky-600':'text-amber-600'}/>
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-slate-500">{meta}</div>
    </div>
  </div>
);

const Avatar = ({ label, tone = "slate" }) => {
  const bg = {
    slate: "bg-slate-100 text-slate-700",
    sky: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
  }[tone];
  const initials = useMemo(() => label.split(" ").map(w=>w[0]).slice(0,2).join(""), [label]);
  return <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${bg}`}>{initials}</div>;
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <div className="text-sm text-slate-600">{label}</div>
    <div className="text-sm font-medium">{value}</div>
  </div>
);

// ---------- Settings (shared style) ----------
const SettingsList = () => (
  <div className="p-4 space-y-3">
    <Card className="divide-y divide-slate-200">
      {[
        { label: "Account Settings" },
        { label: "Notification Preferences" },
        { label: "Privacy & Security" },
        { label: "Help & Support" },
      ].map((i, idx) => (
        <div key={idx} className="p-4 flex items-center justify-between">
          <div className="text-sm font-medium">{i.label}</div>
          <ChevronRight className="text-slate-400"/>
        </div>
      ))}
    </Card>
    <button className="w-full py-3 rounded-xl border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100">Logout</button>
  </div>
);

// ---------- Root Shells ----------
function ClinicShell({ onBack }) {
  const [tab, setTab] = useState("dashboard");
  return (
    <Screen>
      <TopBar title="LUMINOUS REHAB" right={<div className="flex items-center gap-3 text-slate-500"><Search size={18}/><Bell size={18}/><Settings size={18}/></div>} />
      <div className="flex-1 overflow-y-auto">
        {tab === "dashboard" && <ClinicDashboard/>}
        {tab === "patients" && <ClinicPatients/>}
        {tab === "therapists" && <ClinicTherapists/>}
        {tab === "payroll" && <ClinicPayroll/>}
      </div>
      <BottomNavClinic tab={tab} setTab={setTab}/>
    </Screen>
  );
}

function TherapistShell() {
  const [tab, setTab] = useState("dashboard");
  return (
    <Screen>
      <TopBar title="LUMINOUS REHAB" right={<div className="flex items-center gap-3 text-slate-500"><Search size={18}/><Bell size={18}/><Settings size={18}/></div>} />
      <div className="flex-1 overflow-y-auto">
        {tab === "dashboard" && <TherapistDashboard/>}
        {tab === "requests" && <TherapistRequests/>}
        {tab === "patients" && <TherapistPatients/>}
        {tab === "medications" && <TherapistMedications/>}
        {tab === "profile" && <TherapistProfile/>}
      </div>
      <BottomNavTherapist tab={tab} setTab={setTab}/>
    </Screen>
  );
}

// ---------- Root App ----------
export default function App() {
  const [route, setRoute] = useState("welcome");

  return (
    <div className="min-h-screen bg-slate-100">
      {route === "welcome" && (
        <WelcomeScreen onClinic={() => setRoute("clinic-signin")} onTherapist={() => setRoute("therapist-signin")} />
      )}

      {route === "clinic-signin" && (
        <SignInForm role="Clinic" allowCreate onBack={() => setRoute("welcome")} onSignedIn={() => setRoute("clinic")} />
      )}

      {route === "therapist-signin" && (
        <SignInForm role="Therapist" allowCreate onBack={() => setRoute("welcome")} onSignedIn={() => setRoute("therapist")} />
      )}

      {route === "clinic" && <ClinicShell onBack={() => setRoute("welcome")} />}
      {route === "therapist" && <TherapistShell />}

      {/* Mobile chrome safe area spacer */}
      <div className="h-8"/>
    </div>
  );
}
