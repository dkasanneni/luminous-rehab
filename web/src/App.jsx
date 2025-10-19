import React, { useMemo, useState } from "react";
import { 
  Home, Users, Stethoscope, DollarSign, Bell, Pill, User, Settings,
  LogIn, ArrowLeft, Search, Filter, MessageCircle, MapPin, Clock, ShieldCheck,
  BadgeCheck, Plus, ChevronRight
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

/**
 * LUMINOUS REHAB – WEB-FIRST, RESPONSIVE SITE (React + Tailwind)
 * ----------------------------------------------------------------
 * • This version is desktop/web oriented with a top navigation bar,
 *   landing page (hero + features), and two app shells (Clinic & Therapist).
 * • Mobile still looks great — all components are responsive.
 * • Router paths: '/', '/clinic', '/therapist'.
 */

// ---------- Layout primitives ----------
const Page = ({ children, className = "" }) => (
  <div className={`min-h-[100dvh] bg-slate-50 text-slate-900 ${className}`}>{children}</div>
);

const Container = ({ children, wide = false, className = "" }) => (
  <div className={`mx-auto ${wide ? "max-w-[1200px]" : "max-w-7xl"} px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const TopNav = () => (
  <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
    <Container className="h-16 flex items-center gap-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">LR</div>
        <div className="font-semibold tracking-wide">Luminous Rehab</div>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
        <a href="#features" className="hover:text-slate-900">Features</a>
        <a href="#security" className="hover:text-slate-900">Security</a>
        <a href="#how" className="hover:text-slate-900">How it works</a>
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <Link to="/therapist" className="hidden sm:inline-block px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">Therapist Portal</Link>
        <Link to="/clinic" className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Clinic Portal</Link>
      </div>
    </Container>
  </header>
);

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="max-w-2xl">
    {eyebrow && <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-3">{eyebrow}</div>}
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{title}</h2>
    {subtitle && <p className="text-slate-600">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>
);

const PrimaryBtn = ({ children, className = "", ...props }) => (
  <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 ${className}`}>{children}</button>
);

const OutlineBtn = ({ children, className = "", ...props }) => (
  <button {...props} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 ${className}`}>{children}</button>
);

const Badge = ({ children, tone = "default" }) => {
  const map = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-sky-100 text-sky-700",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[tone]}`}>{children}</span>;
};

// ---------- Landing page ----------
function Landing() {
  const navigate = useNavigate();
  return (
    <Page>
      <TopNav />

      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50">
        <Container className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">Healthcare Connect Platform</div>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Streamlining rehabilitation care through smart connections</h1>
            <p className="mt-3 text-slate-600 max-w-xl">Welcome back! Choose a portal to continue, or explore the platform features below.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => navigate('/clinic')}><LogIn size={16}/> Clinic Portal</PrimaryBtn>
              <OutlineBtn onClick={() => navigate('/therapist')}><LogIn size={16}/> Therapist Portal</OutlineBtn>
            </div>
          </div>

          {/* Pretty preview card stack */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-6 bg-emerald-100/40 rounded-3xl blur-2xl"/>
              <Card className="relative p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">LR</div>
                  <div>
                    <div className="font-semibold">Luminous Rehab</div>
                    <div className="text-sm text-slate-600">Secure & HIPAA compliant</div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  <RoleCard kind="Clinic Manager" desc="Manage your facility, staff, and patient care." onClick={() => navigate('/clinic')} />
                  <RoleCard kind="Therapist" desc="Access your schedule and patient information." onClick={() => navigate('/therapist')} />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-20">
        <Container>
          <SectionTitle title="Everything you need to coordinate care" subtitle="Designed for clinics and independent therapists to find each other, manage patients, and get paid." />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature icon={Users} title="Patient management" desc="Track active cases, referrals, and status in real time."/>
            <Feature icon={Stethoscope} title="Provider network" desc="Find nearby therapists by specialty and availability."/>
            <Feature icon={DollarSign} title="Payroll & invoices" desc="Generate payroll and approve payments with one click."/>
          </div>
        </Container>
      </section>

      {/* Security */}
      <section id="security" className="py-12 md:py-20 bg-white">
        <Container className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle eyebrow="Security" title="Built for privacy and compliance" subtitle="We follow industry best practices to keep PHI safe and access-controlled."/>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3"><ShieldCheck className="text-emerald-600"/>HIPAA-ready controls</li>
              <li className="flex items-start gap-3"><ShieldCheck className="text-emerald-600"/>Role-based access & audit logs</li>
              <li className="flex items-start gap-3"><ShieldCheck className="text-emerald-600"/>Encrypted in transit and at rest</li>
            </ul>
          </div>
          <Card className="p-6">
            <div className="text-sm text-slate-600">Compliance snapshot</div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <MiniStat label="Uptime" value="99.95%"/>
              <MiniStat label="Regions" value="US"/>
              <MiniStat label="SLA" value=">= 99.9%"/>
            </div>
          </Card>
        </Container>
      </section>

      {/* CTA */}
      <section id="how" className="py-12 md:py-20">
        <Container className="text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">Ready to get started?</h3>
          <p className="text-slate-600 mt-2">Choose a portal and try the demo flows now.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/clinic" className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">Open Clinic Portal</Link>
            <Link to="/therapist" className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50">Open Therapist Portal</Link>
          </div>
        </Container>
      </section>

      <Footer />
    </Page>
  );
}

const RoleCard = ({ kind, desc, onClick }) => (
  <button onClick={onClick} className="text-left rounded-xl ring-1 ring-slate-200 p-4 hover:ring-emerald-300 hover:shadow transition">
    <div className="font-medium">{kind}</div>
    <div className="text-sm text-slate-600 mt-1">{desc}</div>
    <div className="mt-3 text-emerald-700 inline-flex items-center gap-1">Get Started <ChevronRight size={16}/></div>
  </button>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <Card className="p-6">
    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><Icon size={20}/></div>
    <div className="mt-3 font-medium">{title}</div>
    <p className="text-sm text-slate-600 mt-1">{desc}</p>
  </Card>
);

const MiniStat = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3 text-center">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

const Footer = () => (
  <footer className="border-t border-slate-200 py-8 text-sm text-slate-600 bg-white">
    <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div>© {new Date().getFullYear()} Luminous Rehab</div>
      <div className="flex items-center gap-4">
        <a className="hover:text-slate-900" href="#">Privacy</a>
        <a className="hover:text-slate-900" href="#">Terms</a>
        <a className="hover:text-slate-900" href="#">Support</a>
      </div>
    </Container>
  </footer>
);

// ---------- Reusable blocks from mobile UI ----------
const SearchBar = ({ placeholder }) => (
  <div className="relative">
    <input placeholder={placeholder} className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-10 py-2 outline-none focus:ring-2 focus:ring-emerald-500"/>
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
    <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
  </div>
);

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
    <div className="h-full bg-emerald-600" style={{ width: `${value}%` }}/>
  </div>
);

const Avatar = ({ label }) => {
  const initials = useMemo(() => label.split(" ").map(w=>w[0]).slice(0,2).join(""), [label]);
  return <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold bg-emerald-100 text-emerald-700`}>{initials}</div>;
};

// ---------- Clinic Shell (web layout) ----------
function ClinicShell() {
  const [tab, setTab] = useState("dashboard");
  return (
    <Page>
      <TopNav />
      <Container className="py-10 grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Card className="p-4 sticky top-24">
            <div className="text-sm font-semibold mb-2">Clinic Navigation</div>
            <nav className="space-y-1 text-sm">
              {[
                { k: "dashboard", label: "Dashboard", icon: Home },
                { k: "patients", label: "Patients", icon: Users },
                { k: "therapists", label: "Therapists", icon: Stethoscope },
                { k: "payroll", label: "Payroll", icon: DollarSign },
              ].map(({k,label,icon:Icon}) => (
                <button key={k} onClick={()=>setTab(k)} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 ${tab===k? 'bg-emerald-50 text-emerald-700':'text-slate-700'}`}>
                  <Icon size={16}/> {label}
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-3 space-y-6">
          {tab === "dashboard" && <ClinicDashboard/>}
          {tab === "patients" && <ClinicPatients/>}
          {tab === "therapists" && <ClinicTherapists/>}
          {tab === "payroll" && <ClinicPayroll/>}
        </main>
      </Container>
      <Footer />
    </Page>
  );
}

function ClinicDashboard() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Clinic Dashboard" subtitle="Overview of today across patients, providers, and requests." />
      <div className="grid sm:grid-cols-3 gap-4">
        <StatBox label="Active Patients" value="28" suffix="/ 40" tone="info"/>
        <StatBox label="Therapists" value="45" suffix="available" tone="success"/>
        <StatBox label="New Requests" value="12" suffix="pending" tone="warning"/>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Find Nearby Therapists</div>
          <OutlineBtn className="h-9 px-3 text-xs"><Search size={14}/> Explore</OutlineBtn>
        </div>
        <div className="mt-4 h-56 rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-50 to-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-500">
          <div className="flex items-center gap-2 text-sm"><MapPin size={16}/> Map preview placeholder</div>
        </div>
      </Card>
    </div>
  );
}

function ClinicPatients() {
  const samplePatients = [
    { id: 1, name: "John Doe", mrn: "PT-2053-2587", city: "Orlando, FL", by: "Dr. Smith", last: "2 days ago", status: "Active" },
    { id: 2, name: "Jane Smith", mrn: "PT-2051-1043", city: "Tampa, FL", by: "Dr. Johnson", last: "1 week ago", status: "Active" },
    { id: 3, name: "Michael Brown", mrn: "PT-2050-3468", city: "Miami, FL", by: "Dr. Singh", last: "3 weeks ago", status: "Review" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">Current Patients</div>
        <Badge tone="success">6 active</Badge>
        <div className="ml-auto flex items-center gap-2">
          <OutlineBtn className="h-9 px-3 text-xs"><Plus size={14}/> Add Patient</OutlineBtn>
          <OutlineBtn className="h-9 px-3 text-xs"><Filter size={14}/> Filter</OutlineBtn>
        </div>
      </div>
      <SearchBar placeholder="Search patients..."/>
      <div className="grid gap-3">
        {samplePatients.map(p => <PatientRow key={p.id} p={p}/>) }
      </div>
    </div>
  );
}

function ClinicTherapists() {
  const sampleTherapists = [
    { id: 1, name: "Dr. Sarah Miller", license: "PT-12345-FL", specialty: "Physical Therapy", city: "Orlando, FL", patients: 12, status: "Active" },
    { id: 2, name: "Dr. John Anderson", license: "OT-89021-FL", specialty: "Occupational Therapy", city: "Jacksonville, FL", patients: 6, status: "Active" },
    { id: 3, name: "Dr. Emily Davis", license: "PT-67451-FL", specialty: "Physical Therapy", city: "Tampa, FL", patients: 0, status: "Inactive" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">Current Therapists</div>
        <Badge tone="success">4 active</Badge>
        <div className="ml-auto flex items-center gap-2">
          <OutlineBtn className="h-9 px-3 text-xs"><Plus size={14}/> Invite</OutlineBtn>
          <OutlineBtn className="h-9 px-3 text-xs"><Filter size={14}/> Filter</OutlineBtn>
        </div>
      </div>
      <SearchBar placeholder="Search therapists..."/>
      <div className="grid gap-3">
        {sampleTherapists.map(t => <TherapistRow key={t.id} t={t} />)}
      </div>
    </div>
  );
}

function ClinicPayroll() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
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

      <Card className="p-6">
        <div className="text-sm font-semibold mb-3">Notifications</div>
        <div className="space-y-3">
          <NotifCard tone="info" title="New patient assignment" meta="2 hours ago"/>
          <NotifCard tone="success" title="Therapist availability updated" meta="5 hours ago"/>
          <NotifCard tone="warning" title="Pending payment approval needed" meta="1 day ago"/>
        </div>
      </Card>
    </div>
  );
}

const NotifCard = ({ tone = "info", title, meta }) => (
  <div className={`rounded-xl p-4 flex items-start gap-3 ${tone==='info'? 'bg-sky-50':'bg-amber-50'}`}>
    <Bell className={tone==='info'? 'text-sky-600':'text-amber-600'}/>
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-slate-500">{meta}</div>
    </div>
  </div>
);

const PatientRow = ({ p }) => (
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
        <OutlineBtn className="h-8 px-3 text-xs">View Details</OutlineBtn>
      </div>
    </div>
  </Card>
);

const TherapistRow = ({ t }) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <Avatar label={t.name} />
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

const StatBox = ({ label, value, suffix, tone = "default" }) => {
  const toneMap = {
    default: "bg-slate-100 text-slate-700",
    info: "bg-sky-50 text-sky-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
  };
  return (
    <Card className={`p-4 ${toneMap[tone]}`}>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-semibold leading-tight">{value}</div>
      {suffix && <div className="text-[11px] opacity-70">{suffix}</div>}
    </Card>
  );
};

// ---------- Therapist Shell (web layout) ----------
function TherapistShell() {
  const [tab, setTab] = useState("dashboard");
  return (
    <Page>
      <TopNav />
      <Container className="py-10 grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <Card className="p-4 sticky top-24">
            <div className="text-sm font-semibold mb-2">Therapist Navigation</div>
            <nav className="space-y-1 text-sm">
              {[
                { k: "dashboard", label: "Dashboard", icon: Home },
                { k: "requests", label: "Requests", icon: Bell },
                { k: "patients", label: "Patients", icon: Users },
                { k: "medications", label: "Medications", icon: Pill },
                { k: "profile", label: "Profile", icon: User },
              ].map(({k,label,icon:Icon}) => (
                <button key={k} onClick={()=>setTab(k)} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 ${tab===k? 'bg-emerald-50 text-emerald-700':'text-slate-700'}`}>
                  <Icon size={16}/> {label}
                </button>
              ))}
            </nav>
          </Card>
        </aside>
        <main className="lg:col-span-3 space-y-6">
          {tab === "dashboard" && <TherapistDashboard/>}
          {tab === "requests" && <TherapistRequests/>}
          {tab === "patients" && <TherapistPatients/>}
          {tab === "medications" && <TherapistMedications/>}
          {tab === "profile" && <TherapistProfile/>}
        </main>
      </Container>
      <Footer />
    </Page>
  );
}

function TherapistDashboard(){
  return (
    <div className="space-y-6">
      <SectionTitle title="Therapist Dashboard" subtitle="Today’s schedule and weekly availability."/>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatBox label="New Requests" value="8" tone="warning"/>
        <StatBox label="My Patients" value="10" tone="info"/>
        <StatBox label="Today" value="8 appts" tone="success"/>
      </div>
      <Card className="p-6 space-y-3">
        <div className="text-sm font-semibold">Today's Schedule</div>
        <ProgressBar value={70}/>
        <div className="text-xs text-slate-500">8/12 appointments</div>
      </Card>
      <Card className="p-6 space-y-3">
        <div className="flex items-center justify-between"><div className="text-sm font-semibold">This Week's Availability</div><button className="text-xs text-emerald-700">Edit</button></div>
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

function TherapistRequests(){
  const sampleRequests = [
    { id: 1, patient: "John Doe", city: "Orlando, FL", distance: "2.3 mi", type: "PT", clinic: "Sunrise Rehabilitation Center" },
    { id: 2, patient: "Jane Smith", city: "Tampa, FL", distance: "5.7 mi", type: "PT", clinic: "Milton Care Center" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">Patient Requests</div>
        <Badge tone="warning">3 new assignments</Badge>
      </div>
      <SearchBar placeholder="Search requests..."/>
      <div className="grid gap-3">
        {sampleRequests.map(r => <RequestRow key={r.id} r={r} />)}
      </div>
    </div>
  );
}

const RequestRow = ({ r }) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <Avatar label={r.patient} />
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

function TherapistPatients(){
  const samplePatients = [
    { id: 1, name: "Peter Smith", mrn: "PT-2059-2847", city: "Orlando, FL", last: "Today, 2:00 PM", status: "Active" },
    { id: 2, name: "Jane Doe", mrn: "PT-2056-1043", city: "Tampa, FL", last: "Tomorrow, 10:30 AM", status: "Active" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-sm text-slate-600">My Patients</div>
        <Badge tone="success">4 active</Badge>
      </div>
      <SearchBar placeholder="Search patients..."/>
      <div className="grid gap-3">
        {samplePatients.map(p => <PatientRow key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function TherapistMedications(){
  const sampleMeds = [
    { name: "Lisinopril", dose: "10 mg", form: "Tablet" },
    { name: "Metformin", dose: "20 mg", form: "Capsule" },
    { name: "Atorvastatin", dose: "40 mg", form: "Tablet" },
  ];
  return (
    <div className="space-y-4">
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

function TherapistProfile(){
  return (
    <div className="space-y-4">
      <Card className="p-6 flex items-start gap-3">
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
      <Card className="p-6 space-y-3">
        <InfoRow label="Email Address" value="sarah.johnson@gmail.com"/>
        <InfoRow label="Phone Number" value="(555) 987-6543"/>
        <InfoRow label="License Number" value="PT-12345-FL"/>
        <InfoRow label="Specialty" value="Physical Therapy"/>
      </Card>
    </div>
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <div className="text-sm text-slate-600">{label}</div>
    <div className="text-sm font-medium">{value}</div>
  </div>
);

// ---------- App (Router) ----------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/clinic" element={<ClinicShell/>} />
        <Route path="/therapist" element={<TherapistShell/>} />
        <Route path="*" element={<Landing/>} />
      </Routes>
    </BrowserRouter>
  );
}
