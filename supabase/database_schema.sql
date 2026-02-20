-- Enable PostGIS extension for geo-location
create extension if not exists postgis;

-- Create Complaints Table
create table public.complaints (
  id uuid default gen_random_uuid() primary key,
  citizen_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text not null,
  category text not null, -- Road, Garbage, Drainage, Lighting, Sanitation
  department text,
  status text default 'open', -- open, in-progress, resolved, escalated
  priority text default 'medium',
  location geography(point) not null,
  sla_deadline timestamptz not null,
  rating smallint check (rating >= 1 and rating <= 5),
  feedback text,
  escalation_level int default 0,
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- Row Level Security (RLS)
alter table public.complaints enable row level security;

-- Policies for Citizens
create policy "Citizens can view their own complaints"
  on complaints for select
  using (auth.uid() = citizen_id);

create policy "Citizens can insert complaints"
  on complaints for insert
  with check (auth.uid() = citizen_id);

-- Policies for Admins/Officers (Example: all can read, status updates restricted)
create policy "Admins can view all"
  on complaints for select
  using (true); -- Refine based on roles later

create policy "Admins can update complaints"
  on complaints for update
  using (true); -- Refine based on roles later
