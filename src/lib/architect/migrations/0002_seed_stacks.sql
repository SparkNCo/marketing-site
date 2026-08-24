-- Seed the pre-built template stacks for the /architect diagnostic (SPA-409).
-- Uses ON CONFLICT so re-running keeps a single canonical row per stack name.

insert into marketing.stacks
  (name, tagline, description, languages, frameworks, hosting, best_for, sample_repo_url, speed, customizability, portability, integrated)
values
  (
    'Rapid Web MVP',
    'Ship a production web app in weeks, not quarters.',
    'Our fastest path to a live product. A TypeScript React front end with a Node.js/Next.js API, deployed on Vercel with a managed Supabase Postgres database and auth. Everything is integrated out of the box — hosting, database, authentication, file storage and edge functions — so the team spends time on product, not plumbing. Ideal for validating an idea with real users and iterating quickly.',
    array['TypeScript','JavaScript'],
    array['React','Next.js','Node.js','Tailwind CSS'],
    array['Vercel','Supabase'],
    array['Web application','Analytics','Notifications','Search','Document Generation','Chat'],
    'https://github.com/buildwithspark/template-rapid-web-mvp',
    5, 2, 2, 5
  ),
  (
    'Cross-Platform Mobile',
    'One codebase, native iOS and Android.',
    'A React Native + Expo application sharing a single TypeScript codebase across iOS and Android, backed by a Node.js API and Supabase. Expo''s managed workflow gives over-the-air updates, push notifications and fast device builds, letting a small team ship a polished mobile experience without maintaining two native codebases.',
    array['TypeScript','JavaScript'],
    array['React Native','Expo','Node.js'],
    array['Vercel','Supabase','Expo EAS'],
    array['Mobile application','Notifications','Chat','Analytics','Search'],
    'https://github.com/buildwithspark/template-cross-platform-mobile',
    4, 3, 3, 4
  ),
  (
    'AI Automation Platform',
    'LLM-powered workflows and agents on a Python core.',
    'A Python FastAPI service wired to modern LLM providers, vector search and background job processing, with a React dashboard for humans in the loop. Purpose-built for products where AI automation, document generation and retrieval are the core value. Runs on GCP with managed Postgres + pgvector so you can scale inference workloads independently of the app tier.',
    array['Python','TypeScript'],
    array['FastAPI','React','LangChain','Celery'],
    array['GCP','Supabase'],
    array['AI Automation','Document Generation','Search','Chat','Analytics','Web application'],
    'https://github.com/buildwithspark/template-ai-automation',
    3, 4, 3, 3
  ),
  (
    'Enterprise Cloud Platform',
    'Built to scale, integrate and satisfy compliance.',
    'A strongly-typed Java (Spring Boot) backend with a React front end, containerised and deployed to AWS (ECS/RDS). Designed for organisations with existing cloud commitments and demanding requirements around security, auditability and third-party integration. Maximum customizability and long-term maintainability for products expected to grow into large teams and systems.',
    array['Java','TypeScript'],
    array['Spring Boot','React'],
    array['AWS'],
    array['Web application','Analytics','Document Generation','Notifications','Search'],
    'https://github.com/buildwithspark/template-enterprise-cloud',
    2, 5, 3, 3
  ),
  (
    'Portable Containerized Stack',
    'Cloud-agnostic services that run anywhere.',
    'A Go backend packaged as Docker containers and orchestrated with Kubernetes, paired with a React front end and Postgres. No hard dependency on a single cloud provider, so the same stack runs on AWS, GCP, Azure or on-premise. The right choice when portability, vendor independence and predictable performance matter more than raw delivery speed.',
    array['Go','TypeScript'],
    array['React','Docker','Kubernetes'],
    array['AWS','GCP','Azure','On-premise'],
    array['Web application','Analytics','Search','Notifications'],
    'https://github.com/buildwithspark/template-portable-containers',
    2, 4, 5, 2
  ),
  (
    'Web3 Smart Contract App',
    'On-chain transactions with a familiar web experience.',
    'Solidity smart contracts audited and deployed to EVM-compatible chains, with a React/Node.js application layer that keeps the day-to-day UX feeling like any modern web product. Built for crypto and marketplace products that need trust-minimised, on-chain settlement without forcing users to understand the underlying chain.',
    array['Solidity','TypeScript','JavaScript'],
    array['React','Node.js','Hardhat','ethers.js'],
    array['Vercel','Alchemy'],
    array['Crypto application','Web application','Analytics','Notifications'],
    'https://github.com/buildwithspark/template-web3-contracts',
    3, 4, 4, 3
  ),
  (
    'IoT Telemetry Platform',
    'Fleet connectivity, telemetry and control at the edge.',
    'A device-facing ingestion layer built in Go/Rust speaking MQTT, streaming telemetry into a time-series database, with a React dashboard for monitoring and control. Designed for IoT devices and specialized machinery that emit high-frequency data and require reliable command-and-control. Deployed on Azure IoT with edge components for low-latency processing close to the hardware.',
    array['Rust','Go','TypeScript'],
    array['React','MQTT','TimescaleDB'],
    array['Azure','Azure IoT Hub'],
    array['IoT device','Specialized machinery','Analytics','Notifications'],
    'https://github.com/buildwithspark/template-iot-telemetry',
    3, 4, 4, 3
  )
on conflict (name) do update set
  tagline         = excluded.tagline,
  description     = excluded.description,
  languages       = excluded.languages,
  frameworks      = excluded.frameworks,
  hosting         = excluded.hosting,
  best_for        = excluded.best_for,
  sample_repo_url = excluded.sample_repo_url,
  speed           = excluded.speed,
  customizability = excluded.customizability,
  portability     = excluded.portability,
  integrated      = excluded.integrated,
  updated_at      = now();
